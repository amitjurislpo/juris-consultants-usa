import { NextResponse } from "next/server";
import {
  ADDON_SLUGS,
  CONSULT_SLUG,
  PLAN_SLUGS,
  loadCatalog,
  type AddonId,
  type PlanId,
} from "../../../src/lib/catalog";

export const dynamic = "force-dynamic";

/* Public prices for the order pages, read from the database so admin edits show up at once. */
export async function GET() {
  const { bySlug, states } = await loadCatalog();
  const plans: Record<string, number> = {};
  for (const id of Object.keys(PLAN_SLUGS) as PlanId[]) {
    const item = bySlug.get(PLAN_SLUGS[id]);
    if (item) plans[id] = item.price;
  }
  const addons: Record<string, { price: number; billing: string }> = {};
  for (const id of Object.keys(ADDON_SLUGS) as AddonId[]) {
    const item = bySlug.get(ADDON_SLUGS[id]);
    if (item) addons[id] = { price: item.price, billing: item.billing };
  }
  const consult = bySlug.get(CONSULT_SLUG)?.price ?? null;
  return NextResponse.json(
    {
      plans,
      addons,
      consult,
      states: states.map((s) => ({ name: s.name, fee: s.fee })),
    },
    { headers: { "cache-control": "no-store" } },
  );
}
