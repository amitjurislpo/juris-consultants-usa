import { describe, expect, it } from "vitest";
import {
  activeServices,
  badgeCounts,
  cumulativeSpend,
  openTasks,
  pickMainOrder,
  progressPercent,
  spendByService,
  statusBuckets,
  stepDates,
  totalPaid,
  type DOrder,
  type DPayment,
} from "./dashboard";

const d = (iso: string) => new Date(iso);

function order(over: Partial<DOrder> = {}): DOrder {
  return {
    id: "o1",
    kind: "FORMATION",
    status: "PAID",
    totalUsd: 100,
    createdAt: d("2026-11-02T10:00:00Z"),
    paidAt: d("2026-11-02T10:05:00Z"),
    companyName: "Sample LLC",
    items: [],
    ...over,
  };
}

const pay = (
  amountUsd: number,
  at: string,
  status: DPayment["status"] = "SUCCEEDED",
): DPayment => ({
  orderId: "o1",
  amountUsd,
  status,
  createdAt: d(at),
});

describe("progressPercent", () => {
  it("is 0 for drafts and walks the formation path", () => {
    expect(progressPercent({ kind: "FORMATION", status: "DRAFT" })).toBe(0);
    expect(progressPercent({ kind: "FORMATION", status: "PAID" })).toBe(0);
    expect(
      progressPercent({ kind: "FORMATION", status: "FILING_SUBMITTED" }),
    ).toBe(50);
    expect(progressPercent({ kind: "FORMATION", status: "COMPLETED" })).toBe(
      100,
    );
  });
  it("uses the shorter consultation path", () => {
    expect(progressPercent({ kind: "CONSULTATION", status: "BOOKED" })).toBe(
      50,
    );
    expect(progressPercent({ kind: "GLOBAL", status: "COMPLETED" })).toBe(100);
  });
});

describe("totalPaid", () => {
  it("counts only successful payments", () => {
    expect(
      totalPaid([
        pay(49, "2026-10-18T00:00:00Z"),
        pay(99, "2026-11-02T00:00:00Z", "FAILED"),
        pay(10.5, "2026-11-03T00:00:00Z", "REFUNDED"),
      ]),
    ).toBe(49);
  });
});

describe("pickMainOrder", () => {
  it("prefers the newest unfinished formation and ignores drafts", () => {
    const draft = order({
      id: "d",
      status: "DRAFT",
      createdAt: d("2026-11-09T00:00:00Z"),
    });
    const svc = order({
      id: "s",
      kind: "SERVICES",
      status: "PAID",
      createdAt: d("2026-11-08T00:00:00Z"),
    });
    const form = order({
      id: "f",
      status: "FILING_SUBMITTED",
      createdAt: d("2026-11-01T00:00:00Z"),
    });
    expect(pickMainOrder([draft, svc, form])?.id).toBe("f");
  });
  it("falls back to a completed order, then null", () => {
    expect(pickMainOrder([order({ id: "c", status: "COMPLETED" })])?.id).toBe(
      "c",
    );
    expect(pickMainOrder([])).toBeNull();
    expect(pickMainOrder([order({ status: "DRAFT" })])).toBeNull();
  });
});

describe("activeServices", () => {
  it("counts unfinished paid orders and completed ones that renew", () => {
    const renewing = order({
      id: "r",
      status: "COMPLETED",
      items: [
        { name: "Registered agent", priceUsd: 99, qty: 1, billing: "YEARLY" },
      ],
    });
    const done = order({ id: "x", status: "COMPLETED" });
    const draft = order({ id: "d", status: "DRAFT" });
    expect(activeServices([renewing, done, draft, order({ id: "p" })])).toBe(2);
  });
});

describe("openTasks", () => {
  const base = {
    ref: (id: string) => `#${id}`,
    docLabel: (t: string) => t,
    requiredDocTypes: [] as string[],
  };
  it("lists unpaid drafts and details pending, oldest first", () => {
    const tasks = openTasks({
      ...base,
      kyc: [],
      orders: [
        order({
          id: "a",
          status: "DETAILS_PENDING",
          createdAt: d("2026-11-03T00:00:00Z"),
          paidAt: d("2026-11-03T00:00:00Z"),
        }),
        order({
          id: "b",
          status: "DRAFT",
          createdAt: d("2026-11-01T00:00:00Z"),
          paidAt: null,
        }),
      ],
    });
    expect(tasks.map((t) => t.kind)).toEqual(["pay", "details"]);
    expect(tasks[0]?.href).toBe("/account/orders/b");
  });
  it("reports a rejected document with its reason, and missing documents on paid orders", () => {
    const tasks = openTasks({
      ...base,
      requiredDocTypes: ["PASSPORT", "ADDRESS_PROOF"],
      orders: [order({ status: "READY_FOR_REVIEW" })],
      kyc: [
        {
          orderId: "o1",
          docType: "PASSPORT",
          status: "REJECTED",
          rejectReason: "Blurry",
          createdAt: d("2026-11-04T00:00:00Z"),
        },
      ],
    });
    expect(tasks.find((t) => t.kind === "kyc-rejected")?.text).toContain(
      "Blurry",
    );
    expect(tasks.filter((t) => t.kind === "kyc-missing")).toHaveLength(1);
  });
  it("a newer approved upload clears the rejection; nothing open when all done", () => {
    const tasks = openTasks({
      ...base,
      requiredDocTypes: ["PASSPORT"],
      orders: [order({ status: "READY_FOR_REVIEW" })],
      kyc: [
        {
          orderId: "o1",
          docType: "PASSPORT",
          status: "REJECTED",
          rejectReason: null,
          createdAt: d("2026-11-04T00:00:00Z"),
        },
        {
          orderId: "o1",
          docType: "PASSPORT",
          status: "APPROVED",
          rejectReason: null,
          createdAt: d("2026-11-05T00:00:00Z"),
        },
      ],
    });
    expect(tasks).toEqual([]);
  });
  it("asks for no documents before any order is paid", () => {
    const tasks = openTasks({
      ...base,
      requiredDocTypes: ["PASSPORT"],
      kyc: [],
      orders: [order({ status: "DRAFT", paidAt: null })],
    });
    expect(tasks.map((t) => t.kind)).toEqual(["pay"]);
  });
});

describe("statusBuckets", () => {
  it("splits orders into done, in progress and needs action", () => {
    const orders = [
      order({ id: "1", status: "COMPLETED" }),
      order({ id: "2", status: "FILING_SUBMITTED" }),
      order({ id: "3", status: "DRAFT", paidAt: null }),
      order({ id: "4", status: "DETAILS_PENDING" }),
    ];
    const tasks = openTasks({
      orders,
      kyc: [],
      requiredDocTypes: [],
      ref: (i) => i,
      docLabel: (t) => t,
    });
    expect(statusBuckets(orders, tasks)).toEqual({
      done: 1,
      inProgress: 1,
      needsAction: 2,
    });
  });
});

describe("cumulativeSpend", () => {
  const label = (x: Date) => x.toISOString().slice(5, 10);
  it("groups by day and keeps a running total", () => {
    const r = cumulativeSpend(
      [
        pay(49, "2026-10-18T09:00:00Z"),
        pay(349, "2026-11-02T09:00:00Z"),
        pay(99, "2026-11-02T15:00:00Z"),
        pay(5, "2026-11-03T00:00:00Z", "FAILED"),
      ],
      "UTC",
      label,
    );
    expect(r.values).toEqual([49, 497]);
    expect(r.labels).toEqual(["10-18", "11-02"]);
  });
  it("adds a zero start when there is one payment, and is empty with none", () => {
    expect(
      cumulativeSpend([pay(49, "2026-10-18T09:00:00Z")], "UTC", label).values,
    ).toEqual([0, 49]);
    expect(cumulativeSpend([], "UTC", label).values).toEqual([]);
  });
  it("uses the customer's time zone for the day boundary", () => {
    const r = cumulativeSpend(
      [pay(10, "2026-11-02T20:00:00Z"), pay(20, "2026-11-02T23:00:00Z")],
      "Asia/Kolkata",
      label,
    );
    expect(r.values).toEqual([0, 30]); // both are 3 Nov in India
  });
});

describe("spendByService", () => {
  it("adds price at purchase x quantity per service, skipping drafts", () => {
    const rows = spendByService([
      order({
        items: [
          { name: "Starter (LLC)", priceUsd: 249, qty: 1, billing: "ONE_TIME" },
          {
            name: "Wyoming state filing fee",
            priceUsd: 100,
            qty: 1,
            billing: "ONE_TIME",
          },
        ],
      }),
      order({
        id: "o2",
        items: [
          {
            name: "EIN (US tax ID)",
            priceUsd: 80,
            qty: 2,
            billing: "ONE_TIME",
          },
        ],
      }),
      order({
        id: "o3",
        status: "DRAFT",
        items: [
          { name: "Starter (LLC)", priceUsd: 999, qty: 1, billing: "ONE_TIME" },
        ],
      }),
    ]);
    expect(rows).toEqual([
      { label: "LLC", value: 249 },
      { label: "EIN", value: 160 },
      { label: "State fee", value: 100 },
    ]);
  });
});

describe("stepDates", () => {
  it("uses paidAt for Paid and the status history for the rest", () => {
    const o = order({ status: "FILING_SUBMITTED" });
    const dates = stepDates(o, [
      { orderId: "o1", to: "DETAILS_PENDING", at: d("2026-11-03T00:00:00Z") },
      {
        orderId: "other",
        to: "READY_FOR_REVIEW",
        at: d("2026-11-04T00:00:00Z"),
      },
    ]);
    expect(dates[0]).toEqual(o.paidAt);
    expect(dates[1]).toEqual(d("2026-11-03T00:00:00Z"));
    expect(dates[2]).toBeNull();
  });
});

describe("badgeCounts", () => {
  it("counts orders needing the customer and ready documents", () => {
    expect(
      badgeCounts(
        [
          { status: "DRAFT" },
          { status: "DETAILS_PENDING" },
          { status: "PAID" },
        ],
        4,
      ),
    ).toEqual({ orders: 2, documents: 4 });
  });
});
