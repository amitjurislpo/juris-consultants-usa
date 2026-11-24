import { describe, expect, it } from "vitest";
import {
  catalogItemSchema,
  changedFields,
  parseSettingValue,
  settingKindOf,
  stateFeeSchema,
} from "./settings-schemas";

const item = {
  type: "PLAN",
  slug: "starter-llc",
  name: "Starter LLC",
  description: "",
  priceUsd: "99.5",
  billing: "ONE_TIME",
  sort: "10",
  warnings: "Check state\n\n  Second  ",
  active: "on",
};

describe("catalogItemSchema", () => {
  it("normalises price, checkboxes and warning lines", () => {
    expect(catalogItemSchema.parse(item)).toMatchObject({
      priceUsd: "99.50",
      description: null,
      mandatory: false,
      active: true,
      sort: 10,
      warnings: ["Check state", "Second"],
    });
  });
  it("rejects a negative or malformed price and a bad slug", () => {
    expect(
      catalogItemSchema.safeParse({ ...item, priceUsd: "-1" }).success,
    ).toBe(false);
    expect(
      catalogItemSchema.safeParse({ ...item, priceUsd: "1.234" }).success,
    ).toBe(false);
    expect(
      catalogItemSchema.safeParse({ ...item, slug: "Bad Slug" }).success,
    ).toBe(false);
  });
});

describe("stateFeeSchema", () => {
  it("rejects unknown states", () => {
    expect(
      stateFeeSchema.safeParse({ state: "OHIO", feeUsd: "10" }).success,
    ).toBe(false);
  });
});

describe("setting values", () => {
  it("parses by kind", () => {
    expect(parseSettingValue("flag", "true")).toBe(true);
    expect(parseSettingValue("flag", "yes")).toBeNull();
    expect(parseSettingValue("number", "4.5")).toBe(4.5);
    expect(parseSettingValue("number", "")).toBeNull();
    expect(parseSettingValue("text", "Hello")).toBe("Hello");
    expect(parseSettingValue("text", "")).toBeNull();
  });
  it("detects the kind of stored values", () => {
    expect(settingKindOf(false)).toBe("flag");
    expect(settingKindOf(3)).toBe("number");
    expect(settingKindOf("x")).toBe("text");
    expect(settingKindOf({ a: 1 })).toBeNull();
  });
});

describe("changedFields", () => {
  it("keeps only differing fields", () => {
    expect(
      changedFields({ a: 1, b: [1], c: "x" }, { a: 2, b: [1], c: "x" }),
    ).toEqual({ before: { a: 1 }, after: { a: 2 } });
  });
  it("returns the full row on create", () => {
    expect(changedFields(null, { a: 1 })).toEqual({
      before: null,
      after: { a: 1 },
    });
  });
});
