import { prisma } from "@juris/db";
import {
  ordersByService,
  ordersByState,
  periodFor,
  revenueBuckets,
  staleCounts,
  type Period,
  type RangeDays,
} from "./dashboard";

const num = (value: { toString(): string } | null | undefined): number =>
  value ? Number(value.toString()) : 0;

/** Counts shown as badges in the sidebar. Cheap, runs for every page. */
export async function loadNavBadges(now = new Date()) {
  const since = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const [paidOrders, kycWaiting] = await Promise.all([
    prisma.order.count({ where: { paidAt: { gte: since } } }),
    prisma.kycDocument.count({ where: { status: "PENDING" } }),
  ]);
  return { paidOrders, kycWaiting };
}

/** Every number on the dashboard, in a fixed small set of queries (no per-row queries). */
export async function loadDashboard(days: RangeDays, now = new Date()) {
  const period: Period = periodFor(now, days);

  const [
    orders,
    payments,
    prevRevenue,
    detailsPending,
    filingSubmitted,
    kycPending,
    kycOldest,
    failedPayments,
    stateFees,
    latest,
  ] = await Promise.all([
    prisma.order.findMany({
      where: { createdAt: { gte: period.start } },
      select: {
        status: true,
        paidAt: true,
        company: { select: { state: true } },
        items: {
          select: {
            nameSnapshot: true,
            catalogItem: { select: { slug: true } },
          },
        },
      },
    }),
    prisma.payment.findMany({
      where: { status: "SUCCEEDED", createdAt: { gte: period.start } },
      select: { createdAt: true, amount: true },
    }),
    prisma.payment.aggregate({
      where: {
        status: "SUCCEEDED",
        createdAt: { gte: period.prevStart, lt: period.start },
      },
      _sum: { amount: true },
    }),
    prisma.order.findMany({
      where: { status: "DETAILS_PENDING" },
      select: {
        updatedAt: true,
        statusChanges: {
          orderBy: { at: "desc" },
          take: 1,
          select: { at: true },
        },
      },
    }),
    prisma.order.findMany({
      where: { status: "FILING_SUBMITTED" },
      select: {
        updatedAt: true,
        statusChanges: {
          orderBy: { at: "desc" },
          take: 1,
          select: { at: true },
        },
      },
    }),
    prisma.kycDocument.count({ where: { status: "PENDING" } }),
    prisma.kycDocument.aggregate({
      where: { status: "PENDING" },
      _min: { createdAt: true },
    }),
    prisma.payment.count({
      where: { status: "FAILED", createdAt: { gte: period.start } },
    }),
    prisma.stateFee.findMany({
      orderBy: { state: "asc" },
      select: { state: true, active: true },
    }),
    prisma.order.findMany({
      where: { status: { not: "DRAFT" } },
      orderBy: { createdAt: "desc" },
      take: 6,
      select: {
        id: true,
        createdAt: true,
        status: true,
        kind: true,
        totalUsd: true,
        user: { select: { name: true, email: true, country: true } },
        assignedTo: { select: { name: true, email: true } },
        company: { select: { state: true } },
        items: {
          take: 1,
          orderBy: { id: "asc" },
          select: { nameSnapshot: true },
        },
      },
    }),
  ]);

  const paidInPeriod = orders.filter((o) => o.paidAt);
  const revenue = payments.reduce((sum, p) => sum + num(p.amount), 0);
  const stateRows = orders
    .filter((o) => o.status !== "DRAFT")
    .map((o) => ({ state: o.company?.state ?? null }));
  const stateCountsByCode = new Map(
    ordersByState(stateRows, 99).map((r) => [r.state, r.count]),
  );

  return {
    period,
    statuses: orders.map((o) => o.status as string),
    revenue,
    prevRevenue: num(prevRevenue._sum.amount),
    weekly: revenueBuckets(
      payments.map((p) => ({ at: p.createdAt, amount: num(p.amount) })),
      period,
    ),
    paidOrders: paidInPeriod.length,
    paidCompleted: paidInPeriod.filter((o) => o.status === "COMPLETED").length,
    detailsPending: detailsPending.length,
    kycPending,
    kycOldest: kycOldest._min.createdAt,
    stale: staleCounts({
      now,
      detailsPending: detailsPending.map(sinceStatusChange),
      filingSubmitted: filingSubmitted.map(sinceStatusChange),
    }),
    failedPayments,
    byState: ordersByState(stateRows),
    byService: ordersByService(
      orders
        .filter((o) => o.status !== "DRAFT")
        .map((o) => ({
          items: o.items.map((i) => ({
            slug: i.catalogItem.slug,
            name: i.nameSnapshot,
          })),
        })),
    ),
    states: stateFees.map((s) => ({
      code: s.state as string,
      active: s.active,
      orders: stateCountsByCode.get(s.state) ?? 0,
    })),
    latest: latest.map((o) => ({
      id: o.id,
      createdAt: o.createdAt,
      status: o.status as string,
      kind: o.kind as string,
      amount: num(o.totalUsd),
      customer: o.user.name?.trim() || o.user.email,
      country: o.user.country,
      service: o.items[0]?.nameSnapshot ?? o.kind,
      state: o.company?.state ?? null,
      assignedTo: o.assignedTo
        ? o.assignedTo.name?.trim() || o.assignedTo.email
        : null,
    })),
  };
}

/** Date the order entered its current status (falls back to last update for older orders). */
function sinceStatusChange(order: {
  updatedAt: Date;
  statusChanges: { at: Date }[];
}): { updatedAt: Date } {
  return { updatedAt: order.statusChanges[0]?.at ?? order.updatedAt };
}

export type DashboardData = Awaited<ReturnType<typeof loadDashboard>>;

/** Orders created in the period, for the dashboard CSV export. */
export async function loadOrdersForExport(period: Period, limit: number) {
  return prisma.order.findMany({
    where: { createdAt: { gte: period.start } },
    orderBy: { createdAt: "desc" },
    take: limit,
    include: {
      user: { select: { email: true, name: true, country: true } },
      company: { select: { name: true, state: true, entityType: true } },
    },
  });
}
