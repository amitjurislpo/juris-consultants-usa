import { describe, expect, it } from "vitest";
import {
  activitySkip,
  activityWhere,
  parseActivityFilters,
} from "./activity-filters";

describe("parseActivityFilters", () => {
  it("parses valid values and ignores bad dates and pages", () => {
    const filters = parseActivityFilters({
      actor: " amit ",
      from: "2026-11-01",
      to: "nope",
      page: "abc",
    });
    expect(filters.actor).toBe("amit");
    expect(filters.from?.toISOString()).toBe("2026-11-01T00:00:00.000Z");
    expect(filters.to).toBeNull();
    expect(filters.page).toBe(1);
  });
  it("treats the end date as the whole day", () => {
    expect(parseActivityFilters({ to: "2026-11-02" }).to?.toISOString()).toBe(
      "2026-11-02T23:59:59.999Z",
    );
  });
});

describe("activityWhere", () => {
  it("is empty without filters", () => {
    expect(activityWhere(parseActivityFilters({}))).toEqual({});
  });
  it("builds filters", () => {
    const where = activityWhere(
      parseActivityFilters({ action: "SETTINGS", from: "2026-11-01" }),
    );
    expect(where).toMatchObject({
      action: { contains: "SETTINGS" },
      at: { gte: new Date("2026-11-01T00:00:00Z") },
    });
  });
});

describe("activitySkip", () => {
  it("skips earlier pages", () => {
    expect(activitySkip(1)).toBe(0);
    expect(activitySkip(3)).toBe(50);
  });
});
