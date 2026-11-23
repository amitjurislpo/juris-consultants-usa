import { describe, expect, it } from "vitest";
import { calculatePricing, type PricingItem } from "./pricing.js";

describe("calculatePricing", () => {
  it("itemizes a formation quote and sums only upfront charges", () => {
    const plan: PricingItem = {
      id: "plan",
      name: "Formation plan",
      priceUsd: 499,
      billing: "ONE_TIME",
    };
    const quote = calculatePricing({
      plan,
      stateFee: {
        id: "state",
        name: "State fee",
        priceUsd: 299,
        billing: "ONE_TIME",
      },
      addOns: [
        {
          id: "agent",
          name: "Registered agent",
          priceUsd: 100,
          billing: "YEARLY",
        },
      ],
    });

    expect(quote.totalUsd).toBe(798);
    expect(quote.oneTimeUsd).toBe(798);
    expect(quote.recurringYearlyUsd).toBe(100);
    expect(quote.lines).toHaveLength(3);
  });

  it("supports quantities and rejects fractional USD prices", () => {
    const quote = calculatePricing({
      plan: {
        id: "p",
        name: "Plan",
        priceUsd: 12.5,
        billing: "MONTHLY",
        quantity: 2,
      },
      stateFee: { id: "s", name: "State", priceUsd: 0, billing: "ONE_TIME" },
      addOns: [],
    });
    expect(quote.lines[0]?.lineTotalUsd).toBe(25);
    expect(quote.recurringMonthlyUsd).toBe(25);

    expect(() =>
      calculatePricing({
        plan: { id: "p", name: "Plan", priceUsd: 1.001, billing: "ONE_TIME" },
        stateFee: { id: "s", name: "State", priceUsd: 0, billing: "ONE_TIME" },
        addOns: [],
      }),
    ).toThrow(RangeError);
  });
});
