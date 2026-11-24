import { describe, expect, it } from "vitest";
import { addressLine, noteText } from "./customers";

describe("noteText", () => {
  it("returns the note or an empty string", () => {
    expect(noteText({ note: "called" })).toBe("called");
    expect(noteText({ note: 5 })).toBe("");
    expect(noteText(null)).toBe("");
    expect(noteText([])).toBe("");
  });
});

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
