import { describe, expect, it } from "vitest";
import { maskEmail, maskPhone } from "./mask";

describe("maskEmail", () => {
  it("keeps the first letter and the domain", () => {
    expect(maskEmail("amit@example.com")).toBe("a***@example.com");
  });
  it("handles empty and invalid values", () => {
    expect(maskEmail(null)).toBe("");
    expect(maskEmail("")).toBe("");
    expect(maskEmail("not-an-email")).toBe("***");
    expect(maskEmail("@example.com")).toBe("***");
  });
});

describe("maskPhone", () => {
  it("keeps the last four digits and the format", () => {
    expect(maskPhone("+91 98765 43210")).toBe("+** ***** *3210");
  });
  it("masks everything when there are four digits or fewer", () => {
    expect(maskPhone("1234")).toBe("****");
  });
  it("handles empty values", () => {
    expect(maskPhone(undefined)).toBe("");
  });
});
