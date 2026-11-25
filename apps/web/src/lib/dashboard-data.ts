import { prisma } from "@juris/db";
import type {
  DDeliverable,
  DKyc,
  DOrder,
  DPayment,
  DStatusEvent,
} from "./dashboard";

const num = (value: { toString(): string }) => Number(value.toString());

/** Everything the dashboard shows, for ONE customer. Every query is filtered by `userId`
 *  (taken from the session by the caller), so a customer can only ever see their own rows. */
export async function loadDashboardData(userId: string) {
  const [orderRows, paymentRows, kycRows, deliverableRows, requirements] =
    await Promise.all([
      prisma.order.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          kind: true,
          status: true,
          totalUsd: true,
          createdAt: true,
          paidAt: true,
          company: { select: { name: true } },
          items: {
            select: {
              nameSnapshot: true,
              priceUsdSnapshot: true,
              qty: true,
              billing: true,
            },
          },
        },
      }),
      prisma.payment.findMany({
        where: { order: { userId } },
        orderBy: { createdAt: "asc" },
        select: {
          orderId: true,
          amount: true,
          status: true,
          createdAt: true,
        },
      }),
      prisma.kycDocument.findMany({
        where: { order: { userId } },
        orderBy: { createdAt: "asc" },
        select: {
          orderId: true,
          docType: true,
          status: true,
          rejectReason: true,
          createdAt: true,
        },
      }),
      prisma.deliverable.findMany({
        where: { order: { userId } },
        orderBy: { createdAt: "desc" },
        select: { id: true, orderId: true, type: true, createdAt: true },
      }),
      prisma.kycRequirement.findMany({
        where: { active: true, appliesTo: "OWNER" },
        orderBy: { label: "asc" },
        select: { docType: true, label: true },
      }),
    ]);

  const orders: DOrder[] = orderRows.map((o) => ({
    id: o.id,
    kind: o.kind,
    status: o.status,
    totalUsd: num(o.totalUsd),
    createdAt: o.createdAt,
    paidAt: o.paidAt,
    companyName: o.company?.name ?? null,
    items: o.items.map((i) => ({
      name: i.nameSnapshot,
      priceUsd: num(i.priceUsdSnapshot),
      qty: i.qty,
      billing: i.billing,
    })),
  }));

  // Status history of this customer's orders (written by admin when status changes).
  const eventRows = orders.length
    ? await prisma.auditLog.findMany({
        where: {
          entity: "Order",
          action: "order.status_changed",
          entityId: { in: orders.map((o) => o.id) },
        },
        orderBy: { at: "asc" },
        select: { entityId: true, at: true, after: true },
      })
    : [];
  const events: DStatusEvent[] = eventRows.flatMap((row) => {
    const after = row.after as { to?: unknown } | null;
    return typeof after?.to === "string"
      ? [{ orderId: row.entityId, to: after.to, at: row.at }]
      : [];
  });

  const payments: DPayment[] = paymentRows.map((p) => ({
    orderId: p.orderId,
    amountUsd: num(p.amount),
    status: p.status,
    createdAt: p.createdAt,
  }));
  const kyc: DKyc[] = kycRows.map((k) => ({ ...k }));
  const deliverables: DDeliverable[] = deliverableRows.map((d) => ({ ...d }));

  return { orders, payments, kyc, deliverables, events, requirements };
}

/** Light query for the sidebar (runs on every portal page): badge counts, and how the customer signs in. */
export async function loadShellInfo(userId: string) {
  const [needsAction, documents, google] = await Promise.all([
    prisma.order.count({
      where: { userId, status: { in: ["DRAFT", "DETAILS_PENDING"] } },
    }),
    prisma.deliverable.count({ where: { order: { userId } } }),
    prisma.account.count({ where: { userId, provider: "google" } }),
  ]);
  return { needsAction, documents, viaGoogle: google > 0 };
}
