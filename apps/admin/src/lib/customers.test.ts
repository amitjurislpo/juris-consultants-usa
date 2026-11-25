import { describe, expect, it } from "vitest";
import { addressLine } from "./customers";

describe("addressLine", () => {
  it("joins string parts", () => {
    expect(addressLine({ line1: "1 Main St", city: "Austin", zip: 7 })).toBe(
      "1 Main St, Austin",
    );
  });
  it("handles bad input", () => {
    expect(addressLine(null)).toBe("");
    expect(addressLine("x")).toBe("");
  });
});
