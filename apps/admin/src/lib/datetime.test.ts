import { describe, expect, it } from "vitest";
import {
  formatDateTime,
  isSupportedTimeZone,
  startOfDayInZone,
  zoneAbbreviation,
} from "./datetime";

const instant = new Date("2026-11-24T14:13:21Z");
const summer = new Date("2026-07-01T12:00:00Z");

describe("formatDateTime", () => {
  it("shows IST with seconds", () => {
    expect(formatDateTime(instant, "Asia/Kolkata")).toBe(
      "24 Nov 2026, 19:43:21 IST",
    );
  });
  it("shows UTC", () => {
    expect(formatDateTime(instant, "UTC")).toBe("24 Nov 2026, 14:13:21 UTC");
  });
  it("follows US daylight saving", () => {
    expect(formatDateTime(instant, "America/New_York")).toBe(
      "24 Nov 2026, 09:13:21 EST",
    );
    expect(formatDateTime(summer, "America/New_York")).toContain("EDT");
    expect(formatDateTime(instant, "America/Chicago")).toContain("CST");
    expect(formatDateTime(instant, "America/Los_Angeles")).toContain("PST");
  });
  it("is empty for no date", () => {
    expect(formatDateTime(null, "UTC")).toBe("");
  });
});

describe("zones", () => {
  it("accepts only the offered zones", () => {
    expect(isSupportedTimeZone("Asia/Kolkata")).toBe(true);
    expect(isSupportedTimeZone("Mars/Base")).toBe(false);
    expect(isSupportedTimeZone(undefined)).toBe(false);
  });
  it("names the abbreviation", () => {
    expect(zoneAbbreviation("Asia/Kolkata", instant)).toBe("IST");
  });
});

describe("startOfDayInZone", () => {
  it("starts an IST day 5h30 before UTC midnight", () => {
    expect(startOfDayInZone("2026-11-24", "Asia/Kolkata")?.toISOString()).toBe(
      "2026-11-23T18:30:00.000Z",
    );
  });
  it("starts a New York day at 05:00 UTC in winter", () => {
    expect(
      startOfDayInZone("2026-11-24", "America/New_York")?.toISOString(),
    ).toBe("2026-11-24T05:00:00.000Z");
  });
  it("rejects bad dates", () => {
    expect(startOfDayInZone("24-11-2026", "UTC")).toBeNull();
  });
});
