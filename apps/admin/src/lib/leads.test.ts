import { describe, expect, it } from "vitest";
import {
  buildQuery,
  noteSchema,
  parseContactInfo,
  parseLeadFilters,
} from "./leads";

describe("parseContactInfo", () => {
  it("reads known fields and ignores bad types", () => {
    const info = parseContactInfo({ email: "a@b.com", plan: 5, add: ["x", 2] });
    expect(info.email).toBe("a@b.com");
    expect(info.plan).toBe("");
    expect(info.add).toEqual([]);
  });
  it("handles null and arrays", () => {
    expect(parseContactInfo(null).email).toBe("");
    expect(parseContactInfo([]).name).toBe("");
  });
});

describe("parseLeadFilters", () => {
  it("accepts a known flow only", () => {
    expect(parseLeadFilters({ flow: "START" }).flow).toBe("START");
    expect(parseLeadFilters({ flow: "bad" }).flow).toBeNull();
  });
  it("trims and caps source", () => {
    expect(
      parseLeadFilters({ source: ` ${"a".repeat(80)}` }).source,
    ).toHaveLength(40);
  });
});

describe("noteSchema", () => {
  it("rejects empty notes", () => {
    expect(noteSchema.safeParse({ id: "x", body: "   " }).success).toBe(false);
    expect(noteSchema.safeParse({ id: "x", body: " hi " }).data?.body).toBe(
      "hi",
    );
  });
});

describe("buildQuery", () => {
  it("drops empty and first-page values", () => {
    expect(buildQuery({ q: "a", flow: "", page: 1 })).toBe("?q=a");
    expect(buildQuery({ page: 3 })).toBe("?page=3");
    expect(buildQuery({})).toBe("");
  });
});
