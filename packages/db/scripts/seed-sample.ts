/**
 * DEV / PREVIEW ONLY. Adds illustrative "Sample" orders, payments, documents and a rejected
 * upload to ONE customer so every dashboard widget has something to show.
 * Never part of db:bootstrap or the production seed. Refuses to run when NODE_ENV=production.
 *
 *   SAMPLE_CUSTOMER_EMAIL=customer2@example.com pnpm --filter @juris/db db:seed-sample
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const day = (iso: string) => new Date(`${iso}T10:00:00Z`);

async function main() {
  if (process.env.NODE_ENV === "production") {
    throw new Error("seed-sample must not run in production");
  }
  const email = (process.env.SAMPLE_CUSTOMER_EMAIL ?? "").trim().toLowerCase();
  if (!email) throw new Error("Set SAMPLE_CUSTOMER_EMAIL");
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.role !== "CUSTOMER") {
    throw new Error(`No customer with email ${email}`);
  }
  const admin = await prisma.user.findFirst({ where: { role: "SUPER_ADMIN" } });
  if (!admin)
    throw new Error("Run the normal seed first (needs a super admin)");

  const already = await prisma.company.findFirst({
    where: { userId: user.id, name: { startsWith: "Sample " } },
  });
  if (already) {
    console.log("Sample data already present, nothing to do.");
    return;
  }

  const item = async (slug: string) =>
    prisma.catalogItem.findUniqueOrThrow({ where: { slug } });
  const llc = await item("starter-llc");
  const ein = await item("ein");
  const expert = await item("expert-call");
  const mailbox = await item("virtual-mailbox");

  const company = await prisma.company.create({
    data: {
      userId: user.id,
      name: "Sample Nova Labs LLC",
      state: "WYOMING",
      entityType: "LLC",
      address: {},
    },
  });

  type Spec = {
    kind: "FORMATION" | "SERVICES" | "CONSULTATION";
    status: "FILING_SUBMITTED" | "DETAILS_PENDING" | "COMPLETED";
    paid: string;
    company?: string;
    lines: {
      id: string;
      name: string;
      price: number;
      billing?: "ONE_TIME" | "MONTHLY" | "YEARLY";
    }[];
    history: [string, string][];
  };
  const specs: Spec[] = [
    {
      kind: "FORMATION",
      status: "FILING_SUBMITTED",
      paid: "2026-11-02",
      company: company.id,
      lines: [
        { id: llc.id, name: "Starter (LLC) - Sample", price: 249 },
        { id: llc.id, name: "Wyoming state filing fee", price: 103.75 },
        {
          id: mailbox.id,
          name: "Virtual mailbox",
          price: 25,
          billing: "MONTHLY",
        },
      ],
      history: [
        ["DETAILS_PENDING", "2026-11-03"],
        ["READY_FOR_REVIEW", "2026-11-04"],
        ["FILING_SUBMITTED", "2026-11-05"],
      ],
    },
    {
      kind: "SERVICES",
      status: "DETAILS_PENDING",
      paid: "2026-11-03",
      lines: [{ id: ein.id, name: "EIN (US tax ID) - Sample", price: 80 }],
      history: [["DETAILS_PENDING", "2026-11-03"]],
    },
    {
      kind: "SERVICES",
      status: "COMPLETED",
      paid: "2026-10-05",
      lines: [
        {
          id: ein.id,
          name: "Registered agent - Sample",
          price: 99,
          billing: "YEARLY",
        },
      ],
      history: [["COMPLETED", "2026-10-09"]],
    },
    {
      kind: "CONSULTATION",
      status: "COMPLETED",
      paid: "2026-10-18",
      lines: [
        { id: expert.id, name: "Expert consultation (30 min)", price: 49 },
      ],
      history: [["COMPLETED", "2026-10-20"]],
    },
  ];

  const orderIds: string[] = [];
  for (const spec of specs) {
    const total = spec.lines.reduce((sum, l) => sum + l.price, 0);
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        companyId: spec.company ?? null,
        kind: spec.kind,
        status: spec.status,
        totalUsd: total,
        createdAt: day(spec.paid),
        paidAt: day(spec.paid),
        items: {
          create: spec.lines.map((l) => ({
            catalogItemId: l.id,
            nameSnapshot: l.name,
            priceUsdSnapshot: l.price,
            billing: l.billing ?? "ONE_TIME",
          })),
        },
        payments: {
          create: {
            provider: "MOCK",
            providerRef: `sample_${Math.random().toString(36).slice(2, 10)}`,
            amount: total,
            status: "SUCCEEDED",
            createdAt: day(spec.paid),
            rawEvent: { sample: true },
          },
        },
      },
    });
    orderIds.push(order.id);
    for (const [to, at] of spec.history) {
      await prisma.auditLog.create({
        data: {
          actorId: admin.id,
          action: "order.status_changed",
          entity: "Order",
          entityId: order.id,
          after: { to },
          at: day(at),
        },
      });
    }
  }

  const [formation, , agent, call] = orderIds as [
    string,
    string,
    string,
    string,
  ];
  for (const [orderId, type, at] of [
    [formation, "Operating Agreement (sample)", "2026-11-05"],
    [agent, "Registered Agent consent (sample)", "2026-10-09"],
    [call, "Expert call summary (sample)", "2026-10-20"],
  ] as const) {
    await prisma.deliverable.create({
      data: {
        orderId,
        type,
        fileKey: `sample/${orderId}/${type}.pdf`,
        uploadedById: admin.id,
        createdAt: day(at),
      },
    });
  }
  await prisma.kycDocument.create({
    data: {
      orderId: formation,
      docType: "PASSPORT",
      fileKey: `sample/${formation}/passport.pdf`,
      status: "REJECTED",
      rejectReason: "The photo is blurry. Please upload a clear scan.",
      createdAt: day("2026-11-04"),
    },
  });
  console.log(`Sample data added for ${email}.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
