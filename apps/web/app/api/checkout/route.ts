import { calculatePricing, type PricingItem } from "@juris/core";
import { prisma } from "@juris/db";
import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "../../../auth";
import {
  ADDON_SLUGS,
  CONSULT_SLUG,
  PLAN_SLUGS,
  loadCatalog,
  stateCodeFromLabel,
  type AddonId,
} from "../../../src/lib/catalog";

const body = z.object({
  flow: z.enum(["START", "MANAGE", "EXPERT", "GLOBAL"]),
  plan: z.enum(["starter", "premium"]).optional(),
  state: z.string().max(40).optional(),
  add: z
    .array(z.enum(["ein", "bank", "mail", "books", "office"]))
    .max(5)
    .default([]),
  company: z.string().trim().max(160).optional(),
});

type StateCode = Parameters<typeof prisma.company.create>[0]["data"]["state"];

/* Turns a signed-in customer's choices into an unpaid order. The browser only says WHAT was
   chosen; every price comes from the database here. The order is paid later, by the payment
   provider's server-side confirmation, never from this request. */
export async function POST(request: Request) {
  const session = await auth().catch(() => null);
  const userId = session?.user?.id;
  if (!userId || session?.user?.role !== "CUSTOMER") {
    return new NextResponse(null, { status: 401 });
  }
  const parsed = body.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid order." }, { status: 400 });
  }
  const d = parsed.data;

  const { bySlug, states } = await loadCatalog();
  const lines: { item: PricingItem; catalogItemId: string }[] = [];
  const line = (slug: string) => {
    const row = bySlug.get(slug);
    if (!row) throw new Error(`Catalog item ${slug} is not available`);
    lines.push({
      catalogItemId: row.id,
      item: {
        id: row.id,
        name: row.name,
        priceUsd: row.price,
        billing: row.billing,
      },
    });
  };

  let kind: "FORMATION" | "SERVICES" | "CONSULTATION" | "GLOBAL";
  let companyData: {
    name: string;
    state: StateCode;
    entityType: "LLC" | "CCORP";
  } | null = null;

  try {
    if (d.flow === "EXPERT" || d.flow === "GLOBAL") {
      kind = d.flow === "EXPERT" ? "CONSULTATION" : "GLOBAL";
      line(CONSULT_SLUG);
    } else if (d.flow === "MANAGE") {
      kind = "SERVICES";
      for (const id of d.add) line(ADDON_SLUGS[id]);
      if (lines.length === 0) {
        return NextResponse.json(
          { error: "Choose at least one service." },
          { status: 400 },
        );
      }
    } else {
      kind = "FORMATION";
      if (!d.plan || !d.state) {
        return NextResponse.json(
          { error: "Choose a plan and a state." },
          { status: 400 },
        );
      }
      const code = stateCodeFromLabel(d.state);
      const fee = states.find((s) => s.code === code);
      if (!code || !fee) {
        return NextResponse.json(
          { error: "That state is not available." },
          { status: 400 },
        );
      }
      line(PLAN_SLUGS[d.plan]);
      // The state fee has no catalog row; it is stored against the plan's catalog item.
      lines.push({
        catalogItemId: lines[0]?.catalogItemId ?? "",
        item: {
          id: fee.id,
          name: `${fee.name} state filing fee`,
          priceUsd: fee.fee,
          billing: "ONE_TIME",
        },
      });
      for (const id of d.add as AddonId[]) {
        if (id === "ein" && d.plan === "premium") continue; // EIN is included in Premium
        line(ADDON_SLUGS[id]);
      }
      companyData = {
        name: d.company || `New ${fee.name} company`,
        state: code as StateCode,
        entityType: d.plan === "premium" ? "CCORP" : "LLC",
      };
    }
  } catch {
    return NextResponse.json(
      { error: "These prices are not available right now." },
      { status: 409 },
    );
  }

  const priced = lines.map((l) => l.item);
  const quote = calculatePricing({
    plan: priced[0] as PricingItem,
    stateFee: { id: "none", name: "none", priceUsd: 0, billing: "ONE_TIME" },
    addOns: priced.slice(1),
  });
  // What the order page shows as "Total today": one-time items plus the first month of monthly ones.
  const totalUsd =
    quote.totalUsd + quote.recurringMonthlyUsd + quote.recurringYearlyUsd;
  if (!(totalUsd > 0)) {
    return NextResponse.json(
      { error: "This order has no amount to pay." },
      { status: 400 },
    );
  }

  // calculatePricing keeps the plan first, the (empty) state fee second, then add-ons;
  // the "none" line is dropped so only real lines are stored.
  const stored = quote.lines
    .map((l, i) => ({ l, from: i === 0 ? 0 : i - 1 }))
    .filter(({ l }) => l.id !== "none");

  const order = await prisma.$transaction(async (tx) => {
    const company = companyData
      ? await tx.company.create({
          data: {
            userId,
            name: companyData.name,
            state: companyData.state,
            entityType: companyData.entityType,
            address: {},
          },
        })
      : null;
    return tx.order.create({
      data: {
        userId,
        companyId: company?.id ?? null,
        kind,
        status: "DRAFT",
        totalUsd,
        items: {
          create: stored.map(({ l, from }) => ({
            catalogItemId: lines[from]?.catalogItemId ?? "",
            nameSnapshot: l.name,
            priceUsdSnapshot: l.unitPriceUsd,
            billing: l.billing,
            qty: l.quantity,
          })),
        },
      },
      select: { id: true },
    });
  });

  await prisma.auditLog.create({
    data: {
      actorId: userId,
      action: "ORDER_CREATED",
      entity: "Order",
      entityId: order.id,
      after: { kind, totalUsd },
    },
  });
  return NextResponse.json({ orderId: order.id });
}
