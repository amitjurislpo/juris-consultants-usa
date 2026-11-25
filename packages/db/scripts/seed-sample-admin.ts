/**
 * DEV / PREVIEW ONLY. Adds illustrative "Sample" customers, orders, payments and KYC uploads
 * spread over the last 90 days so every admin dashboard widget has something to show.
 * Never part of db:bootstrap or the production seed. Refuses to run when NODE_ENV=production.
 * Safe to run again: it removes its own earlier rows first (emails sample-admin-*@example.com).
 *
 *   pnpm --filter @juris/db db:seed-sample-admin
 */
import { PrismaClient, type Prisma } from "@prisma/client";

const prisma = new PrismaClient();
const DAY = 24 * 60 * 60 * 1000;
const ago = (days: number) => new Date(Date.now() - days * DAY);

type Status =
  | "DRAFT"
  | "PAID"
  | "DETAILS_PENDING"
  | "READY_FOR_REVIEW"
  | "FILING_SUBMITTED"
  | "APPROVED_BY_STATE"
  | "EIN_RECEIVED"
  | "COMPLETED";

const STATES = [
  "WYOMING",
  "WYOMING",
  "WYOMING",
  "DELAWARE",
  "DELAWARE",
  "TEXAS",
  "FLORIDA",
  "NEW_YORK",
  "CALIFORNIA",
] as const;
const COUNTRIES = ["IN", "NG", "AE", "DE", "SG", "GB", "PK", "BR"];
const STATUS_CYCLE: Status[] = [
  "COMPLETED",
  "COMPLETED",
  "COMPLETED",
  "EIN_RECEIVED",
  "APPROVED_BY_STATE",
  "FILING_SUBMITTED",
  "FILING_SUBMITTED",
  "READY_FOR_REVIEW",
  "READY_FOR_REVIEW",
  "DETAILS_PENDING",
  "DETAILS_PENDING",
  "DETAILS_PENDING",
  "PAID",
  "PAID",
  "DRAFT",
  "DRAFT",
];

async function main() {
  if (process.env.NODE_ENV === "production") {
    throw new Error("seed-sample-admin must not run in production");
  }
  await prisma.user.deleteMany({
    where: { email: { startsWith: "sample-admin-" } },
  });

  const catalog = await prisma.catalogItem.findMany();
  const bySlug = new Map(catalog.map((c) => [c.slug, c]));
  const plan = bySlug.get("starter-llc");
  const corp = bySlug.get("premium-c-corp");
  const ein = bySlug.get("ein");
  const bank = bySlug.get("virtual-bank");
  const expert = bySlug.get("expert-call");
  if (!plan || !corp || !ein || !bank || !expert) {
    throw new Error("Run the normal seed first (catalog items are missing)");
  }
  const admin = await prisma.user.findFirst({ where: { role: "SUPER_ADMIN" } });

  const touch: { id: string; days: number }[] = [];

  for (let i = 0; i < 44; i += 1) {
    const status = STATUS_CYCLE[i % STATUS_CYCLE.length] as Status;
    const createdDaysAgo = Math.round((i * 89) / 43) + (i % 3);
    const user = await prisma.user.create({
      data: {
        email: `sample-admin-${i + 1}@example.com`,
        name: `Sample Customer ${i + 1}`,
        country: COUNTRIES[i % COUNTRIES.length] as string,
        role: "CUSTOMER",
        createdAt: ago(createdDaysAgo + 1),
      },
    });

    const kind =
      i % 9 === 4 ? "CONSULTATION" : i % 9 === 7 ? "SERVICES" : "FORMATION";
    const company =
      kind === "FORMATION"
        ? await prisma.company.create({
            data: {
              userId: user.id,
              name: `Sample Co ${i + 1} LLC`,
              state: STATES[i % STATES.length] as (typeof STATES)[number],
              entityType: i % 5 === 0 ? "CCORP" : "LLC",
              address: {},
            },
          })
        : null;

    const lines =
      kind === "CONSULTATION"
        ? [{ item: expert, price: 49 }]
        : kind === "SERVICES"
          ? [
              { item: bank, price: 100 },
              { item: ein, price: 80 },
            ]
          : [
              {
                item: i % 5 === 0 ? corp : plan,
                price: i % 5 === 0 ? 849 : 249,
              },
              ...(i % 3 === 0 ? [{ item: ein, price: 80 }] : []),
            ];
    const total = lines.reduce((sum, l) => sum + l.price, 0);
    const paid = status !== "DRAFT";

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        companyId: company?.id ?? null,
        kind,
        status,
        totalUsd: total,
        createdAt: ago(createdDaysAgo),
        paidAt: paid ? ago(createdDaysAgo) : null,
        tags: ["sample"],
        items: {
          create: lines.map((l) => ({
            catalogItemId: l.item.id,
            nameSnapshot: l.item.name,
            priceUsdSnapshot: l.price,
            billing: "ONE_TIME" as const,
            qty: 1,
          })),
        },
      },
    });
    if (paid) {
      await prisma.payment.create({
        data: {
          orderId: order.id,
          provider: "MOCK",
          providerRef: `sample_admin_${order.id}`,
          amount: total,
          status: "SUCCEEDED",
          createdAt: ago(createdDaysAgo),
          rawEvent: { sample: true } as Prisma.InputJsonValue,
        },
      });
    }
    // Stuck orders for the "needs attention" queues.
    if (status === "DETAILS_PENDING")
      touch.push({ id: order.id, days: 2 + (i % 5) });
    if (status === "FILING_SUBMITTED")
      touch.push({ id: order.id, days: 5 + (i % 6) });

    if (
      status === "READY_FOR_REVIEW" ||
      (status === "DETAILS_PENDING" && i % 2 === 0)
    ) {
      await prisma.kycDocument.create({
        data: {
          orderId: order.id,
          docType: "PASSPORT",
          fileKey: `sample/${order.id}/passport.pdf`,
          status: "PENDING",
          createdAt: new Date(Date.now() - (2 + (i % 20)) * 3_600_000),
        },
      });
    }
    if (admin && i === 10) {
      await prisma.payment.create({
        data: {
          orderId: order.id,
          provider: "MOCK",
          providerRef: `sample_admin_failed_${order.id}`,
          amount: total,
          status: "FAILED",
          createdAt: ago(3),
        },
      });
    }
  }

  // updatedAt is automatic, so age the stuck orders with a direct statement.
  for (const t of touch) {
    await prisma.$executeRaw`UPDATE "Order" SET "updatedAt" = ${ago(t.days)} WHERE id = ${t.id}`;
  }
  console.log("Added sample admin data (44 customers with orders).");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
