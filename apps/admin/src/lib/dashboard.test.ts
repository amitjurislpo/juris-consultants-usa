import { describe, expect, it } from "vitest";
import {
  STAFF_HIDDEN_WIDGETS,
  agoShort,
  canSeeWidget,
  changeLabel,
  ordersByService,
  ordersByState,
  oldestLabel,
  parseRange,
  percentChange,
  periodFor,
  pipeline,
  revenueBuckets,
  staleCounts,
  statusCounts,
} from "./dashboard";

const NOW = new Date("2026-11-25T12:00:00Z");
const DAY = 86_400_000;

describe("parseRange / periodFor", () => {
  it("accepts 7, 30 and 90 and falls back to 30", () => {
    expect(parseRange("7")).toBe(7);
    expect(parseRange(["90", "7"])).toBe(90);
    expect(parseRange("15")).toBe(30);
    expect(parseRange(undefined)).toBe(30);
  });
  it("previous period is the same length right before", () => {
    const p = periodFor(NOW, 30);
    expect(p.end.getTime() - p.start.getTime()).toBe(30 * DAY);
    expect(p.start.getTime() - p.prevStart.getTime()).toBe(30 * DAY);
  });
});

describe("percentChange", () => {
  it("rounds and handles no previous value", () => {
    expect(percentChange(112, 100)).toBe(12);
    expect(percentChange(50, 100)).toBe(-50);
    expect(percentChange(10, 0)).toBeNull();
    expect(changeLabel(12, 30)).toBe("+12% vs previous 30 days");
    expect(changeLabel(-5, 7)).toBe("-5% vs previous 7 days");
    expect(changeLabel(null, 30)).toBe("Last 30 days");
  });
});

describe("revenueBuckets", () => {
  it("sums payments into weekly buckets, oldest first", () => {
    const p = periodFor(NOW, 30);
    const at = (daysAgo: number) => new Date(NOW.getTime() - daysAgo * DAY);
    const buckets = revenueBuckets(
      [
        { at: at(29), amount: 100 },
        { at: at(28), amount: 50 },
        { at: at(1), amount: 300 },
        { at: at(40), amount: 999 }, // outside the period
      ],
      p,
    );
    expect(buckets).toHaveLength(5);
    expect(buckets[0]).toEqual({ label: "W1", value: 150 });
    expect(buckets[4]?.value).toBe(300);
  });
  it("uses one bucket per day for 7 days", () => {
    const buckets = revenueBuckets([], periodFor(NOW, 7));
    expect(buckets).toHaveLength(7);
    expect(buckets.every((b) => b.value === 0)).toBe(true);
  });
});

describe("statusCounts / pipeline", () => {
  const statuses = [
    "DRAFT",
    "DRAFT",
    "PAID",
    "DETAILS_PENDING",
    "READY_FOR_REVIEW",
    "FILING_SUBMITTED",
    "COMPLETED",
    "BOOKED",
  ];
  it("counts the seven shown statuses only", () => {
    const c = statusCounts(statuses);
    expect(c.PAID).toBe(1);
    expect(c.COMPLETED).toBe(1);
    expect(Object.values(c).reduce((a, b) => a + b, 0)).toBe(5);
  });
  it("builds the funnel with percentages of the first step", () => {
    const steps = pipeline(statuses);
    expect(steps.map((s) => s.count)).toEqual([8, 6, 3, 2, 1]);
    expect(steps[0]?.percent).toBe(100);
    expect(steps[1]?.percent).toBe(75);
    expect(pipeline([])[0]?.percent).toBe(0);
  });
});

describe("staleCounts", () => {
  it("counts details over 3 days and state filings over 7 days", () => {
    const ago = (d: number) => ({
      updatedAt: new Date(NOW.getTime() - d * DAY),
    });
    expect(
      staleCounts({
        now: NOW,
        detailsPending: [ago(1), ago(4), ago(10)],
        filingSubmitted: [ago(6), ago(8)],
      }),
    ).toEqual({ detailsOverdue: 2, stateOverdue: 1 });
  });
});

describe("ordersByState / ordersByService", () => {
  it("ranks states and skips orders without a company", () => {
    expect(
      ordersByState([
        { state: "WYOMING" },
        { state: "TEXAS" },
        { state: "WYOMING" },
        { state: null },
      ]),
    ).toEqual([
      { state: "WYOMING", count: 2 },
      { state: "TEXAS", count: 1 },
    ]);
  });
  it("counts each service once per order", () => {
    const rows = [
      {
        items: [
          { slug: "starter-llc", name: "Starter (LLC)" },
          { slug: "starter-llc", name: "Wyoming state filing fee" },
          { slug: "ein", name: "EIN" },
        ],
      },
      { items: [{ slug: "ein", name: "EIN" }] },
    ];
    expect(ordersByService(rows)).toEqual([
      { label: "EIN", count: 2 },
      { label: "LLC", count: 1 },
    ]);
  });
});

describe("labels", () => {
  it("formats ages", () => {
    expect(agoShort(new Date(NOW.getTime() - 5 * 3_600_000), NOW)).toBe("5h");
    expect(agoShort(new Date(NOW.getTime() - 2 * DAY), NOW)).toBe("2d");
    expect(oldestLabel(null, NOW)).toBe("Nothing waiting");
    expect(oldestLabel(new Date(NOW.getTime() - 6 * 3_600_000), NOW)).toBe(
      "Oldest: 6 hours",
    );
  });
});

describe("role visibility", () => {
  it("hides revenue widgets from staff only", () => {
    for (const w of STAFF_HIDDEN_WIDGETS) {
      expect(canSeeWidget("STAFF", w)).toBe(false);
      expect(canSeeWidget("SUPER_ADMIN", w)).toBe(true);
    }
  });
});
