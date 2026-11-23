export type BillingCycle = "ONE_TIME" | "MONTHLY" | "YEARLY";

export interface PricedLine {
  readonly id: string;
  readonly name: string;
  readonly billing: BillingCycle;
  readonly quantity: number;
  readonly unitPriceUsd: number;
  readonly lineTotalUsd: number;
  readonly unitPriceCents: number;
  readonly lineTotalCents: number;
}

export interface PricingItem {
  readonly id: string;
  readonly name: string;
  readonly priceUsd: number;
  readonly billing: BillingCycle;
  readonly quantity?: number;
}

export interface PricingInput {
  readonly plan: PricingItem;
  readonly stateFee: PricingItem;
  readonly addOns: readonly PricingItem[];
}

export interface PricingQuote {
  readonly lines: readonly PricedLine[];
  readonly oneTimeUsd: number;
  readonly recurringMonthlyUsd: number;
  readonly recurringYearlyUsd: number;
  readonly totalUsd: number;
  readonly totalCents: number;
}

function usdToCents(value: number, label: string): number {
  if (!Number.isFinite(value) || value < 0) {
    throw new RangeError(`${label} must be a finite, non-negative USD amount`);
  }
  const cents = Math.round(value * 100);
  if (Math.abs(cents / 100 - value) > 0.00001) {
    throw new RangeError(`${label} must have at most two decimal places`);
  }
  return cents;
}

function centsToUsd(cents: number): number {
  return cents / 100;
}

export function calculatePricing(input: PricingInput): PricingQuote {
  const sourceLines = [
    { ...input.plan, id: input.plan.id, name: input.plan.name },
    { ...input.stateFee, id: input.stateFee.id, name: input.stateFee.name },
    ...input.addOns,
  ];

  let oneTimeCents = 0;
  let monthlyCents = 0;
  let yearlyCents = 0;

  const lines = sourceLines.map((item) => {
    const quantity = item.quantity ?? 1;
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new RangeError(
        `Quantity for ${item.name} must be a positive integer`,
      );
    }
    const unitPriceCents = usdToCents(item.priceUsd, item.name);
    const lineTotalCents = unitPriceCents * quantity;

    if (item.billing === "MONTHLY") monthlyCents += lineTotalCents;
    else if (item.billing === "YEARLY") yearlyCents += lineTotalCents;
    else oneTimeCents += lineTotalCents;

    return {
      id: item.id,
      name: item.name,
      billing: item.billing,
      quantity,
      unitPriceUsd: centsToUsd(unitPriceCents),
      lineTotalUsd: centsToUsd(lineTotalCents),
      unitPriceCents,
      lineTotalCents,
    } satisfies PricedLine;
  });

  const totalCents = oneTimeCents;
  return {
    lines,
    oneTimeUsd: centsToUsd(oneTimeCents),
    recurringMonthlyUsd: centsToUsd(monthlyCents),
    recurringYearlyUsd: centsToUsd(yearlyCents),
    totalUsd: centsToUsd(totalCents),
    totalCents,
  };
}
