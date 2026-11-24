import { describe, expect, it } from "vitest";
import { PAGE_SIZE, pageCount, parseListParams } from "./page";

describe("parseListParams", () => {
  it("uses defaults", () => {
    expect(parseListParams({})).toEqual({
      q: "",
      page: 1,
      skip: 0,
      take: PAGE_SIZE,
    });
  });
  it("trims q, takes the first array value and caps its length", () => {
    expect(parseListParams({ q: ["  amit ", "x"] }).q).toBe("amit");
    expect(parseListParams({ q: "a".repeat(500) }).q).toHaveLength(100);
  });
  it("computes skip from the page", () => {
    expect(parseListParams({ page: "3" })).toMatchObject({ page: 3, skip: 50 });
  });
  it("falls back to page 1 for invalid pages", () => {
    for (const page of ["0", "-2", "abc", "1.5", "123456", ""]) {
      expect(parseListParams({ page }).page).toBe(1);
    }
  });
});

describe("pageCount", () => {
  it("is at least one", () => {
    expect(pageCount(0)).toBe(1);
    expect(pageCount(25)).toBe(1);
    expect(pageCount(26)).toBe(2);
  });
});
