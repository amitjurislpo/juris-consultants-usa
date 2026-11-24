import { prisma } from "@juris/db";
import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "../../../auth";

const body = z.object({
  flow: z.enum(["START", "MANAGE", "EXPERT", "GLOBAL"]),
  stepReached: z.number().int().min(0).max(10),
  plan: z.string().max(40).optional(),
  state: z.string().max(40).optional(),
  add: z.array(z.string().max(30)).max(10).optional(),
  name: z.string().max(120).optional(),
  phone: z.string().max(25).optional(),
  company: z.string().max(160).optional(),
  need: z.string().max(2000).optional(),
});

const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

/* Records how far a signed-in customer got in checkout, so the team can follow up
   with people who leave before paying. A customer can only write their own lead. */
export async function POST(request: Request) {
  const session = await auth().catch(() => null);
  const userId = session?.user?.id;
  if (!userId) return new NextResponse(null, { status: 401 });

  const parsed = body.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return new NextResponse(null, { status: 400 });
  const d = parsed.data;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true, name: true, phone: true },
  });
  if (!user) return new NextResponse(null, { status: 401 });

  const details = Object.fromEntries(
    Object.entries({
      email: user.email,
      name: d.name ?? user.name ?? undefined,
      phone: d.phone,
      company: d.company,
      need: d.need,
      plan: d.plan,
      state: d.state,
      add: d.add,
    }).filter(([, v]) => v !== undefined && v !== ""),
  );

  const existing = await prisma.lead.findFirst({
    where: {
      userId,
      createdAt: { gt: new Date(Date.now() - THIRTY_DAYS) },
      source: { in: ["login", "checkout"] },
    },
    orderBy: { createdAt: "desc" },
  });

  if (existing) {
    const previous =
      existing.contactInfo &&
      typeof existing.contactInfo === "object" &&
      !Array.isArray(existing.contactInfo)
        ? existing.contactInfo
        : {};
    await prisma.lead.update({
      where: { id: existing.id },
      data: {
        flow: d.flow,
        source: "checkout",
        stepReached: Math.max(existing.stepReached, d.stepReached),
        contactInfo: { ...previous, ...details },
      },
    });
  } else {
    await prisma.lead.create({
      data: {
        userId,
        flow: d.flow,
        source: "checkout",
        stepReached: d.stepReached,
        contactInfo: details,
      },
    });
  }

  // Keep the customer's own profile filled from what they typed.
  const profile: { name?: string; phone?: string } = {};
  if (!user.name && d.name) profile.name = d.name;
  if (!user.phone && d.phone) profile.phone = d.phone;
  if (Object.keys(profile).length) {
    await prisma.user.update({ where: { id: userId }, data: profile });
  }
  return new NextResponse(null, { status: 204 });
}
