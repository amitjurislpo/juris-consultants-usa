import { describe, expect, it } from "vitest";
import {
  buildOrderWhere,
  buildQuery,
  parseOrderFilters,
  splitFailedFirst,
} from "./orders-filters";

describe("parseOrderFilters", () => {
  it("keeps valid values and drops invalid ones", () => {
    expect(
      parseOrderFilters({
        status: "PAID",
        kind: "NOPE",
        paid: "unpaid",
        from: "2026-02-30x",
        to: "2026-11-24",
      }),
    ).toEqual({
      status: "PAID",
      kind: "",
      paid: "unpaid",
      stale: "",
      from: "",
      to: "2026-11-24",
    });
  });
  it("takes the first value of repeated params", () => {
    expect(parseOrderFilters({ status: ["COMPLETED", "PAID"] }).status).toBe(
      "COMPLETED",
    );
  });
});

describe("buildOrderWhere", () => {
  const none = parseOrderFilters({});
  it("is empty without filters", () => {
    expect(buildOrderWhere(none, "")).toEqual({});
  });
  it("filters by paid state and date range (to is inclusive)", () => {
    const where = buildOrderWhere(
      parseOrderFilters({ paid: "paid", from: "2026-11-01", to: "2026-11-30" }),
      "",
    );
    expect(where.paidAt).toEqual({ not: null });
    expect(where.createdAt).toEqual({
      gte: new Date("2026-11-01T00:00:00.000Z"),
      lt: new Date("2026-12-01T00:00:00.000Z"),
    });
  });
  it("searches reference, customer and company", () => {
    const where = buildOrderWhere(none, "#AB12");
    expect(where.OR).toHaveLength(4);
    expect(where.OR?.[0]).toEqual({ id: { endsWith: "ab12" } });
  });
});

describe("buildQuery", () => {
  it("skips empty values and page 1", () => {
    expect(buildQuery({ status: "PAID", q: "" }, 1)).toBe("?status=PAID");
    expect(buildQuery({ q: "" }, 1)).toBe("");
    expect(buildQuery({ q: "a b" }, 3)).toBe("?q=a+b&page=3");
  });
});

describe("splitFailedFirst", () => {
  it("shows failed rows first, then fills with the rest", () => {
    expect(splitFailedFirst(10, 0, 25)).toEqual({
      failed: { skip: 0, take: 10 },
      other: { skip: 0, take: 15 },
    });
  });
  it("continues into the rest on later pages", () => {
    expect(splitFailedFirst(10, 25, 25)).toEqual({
      failed: { skip: 10, take: 0 },
      other: { skip: 15, take: 25 },
    });
  });
  it("pages inside a long failed list", () => {
    expect(splitFailedFirst(60, 25, 25)).toEqual({
      failed: { skip: 25, take: 25 },
      other: { skip: 0, take: 0 },
    });
  });
});
