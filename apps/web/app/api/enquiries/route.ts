import { prisma } from "@juris/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const body = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(30).optional(),
  message: z.string().trim().min(10).max(3000),
  website: z.string().max(200).optional(), // honeypot: real people leave it empty
});

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function tooMany(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > MAX_PER_WINDOW;
}

/* Public contact form. Anyone can send a message, so it is limited per address
   and only ever creates an Enquiry row. */
export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (tooMany(ip)) return new NextResponse(null, { status: 429 });

  const parsed = body.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return new NextResponse(null, { status: 400 });
  const d = parsed.data;
  if (d.website) return new NextResponse(null, { status: 204 });

  await prisma.enquiry.create({
    data: {
      name: d.name,
      email: d.email.toLowerCase(),
      phone: d.phone || null,
      message: d.message,
    },
  });
  return new NextResponse(null, { status: 204 });
}
