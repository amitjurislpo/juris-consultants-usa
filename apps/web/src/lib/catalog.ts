import { prisma } from "@juris/db";

/** Website ids (used by the order pages) -> catalog slugs in the database. */
export const PLAN_SLUGS = {
  starter: "starter-llc",
  premium: "premium-c-corp",
} as const;
export const ADDON_SLUGS = {
  ein: "ein",
  bank: "virtual-bank",
  mail: "virtual-mailbox",
  books: "bookkeeping",
  office: "office-address",
} as const;
export const CONSULT_SLUG = "expert-call";

export type PlanId = keyof typeof PLAN_SLUGS;
export type AddonId = keyof typeof ADDON_SLUGS;

export const STATE_LABELS: Record<string, string> = {
  WYOMING: "Wyoming",
  TEXAS: "Texas",
  DELAWARE: "Delaware",
  FLORIDA: "Florida",
  NEVADA: "Nevada",
  NEW_YORK: "New York",
  CALIFORNIA: "California",
  NEW_MEXICO: "New Mexico",
  WASHINGTON: "Washington",
};

export function stateCodeFromLabel(label: string): string | null {
  const hit = Object.entries(STATE_LABELS).find(([, name]) => name === label);
  return hit ? hit[0] : null;
}

export interface CatalogItemRow {
  id: string;
  slug: string;
  name: string;
  price: number;
  billing: "ONE_TIME" | "MONTHLY" | "YEARLY";
}

/** Active catalog items and state fees, exactly as admins have set them. */
export async function loadCatalog() {
  const [items, fees] = await Promise.all([
    prisma.catalogItem.findMany({ where: { active: true } }),
    prisma.stateFee.findMany({ where: { active: true } }),
  ]);
  const bySlug = new Map<string, CatalogItemRow>(
    items.map((item) => [
      item.slug,
      {
        id: item.id,
        slug: item.slug,
        name: item.name,
        price: Number(item.priceUsd.toString()),
        billing: item.billing,
      },
    ]),
  );
  const states = fees
    .filter((fee) => STATE_LABELS[fee.state])
    .map((fee) => ({
      code: fee.state as string,
      id: fee.id,
      name: STATE_LABELS[fee.state] as string,
      fee: Number(fee.feeUsd.toString()),
    }));
  return { bySlug, states };
}
