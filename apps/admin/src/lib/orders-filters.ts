import type { Prisma } from "@juris/db";
import { nextDayString, startOfDayInZone } from "./datetime";
import { PAGE_SIZE } from "./page";
import { isOrderKind, isOrderStatus } from "./orders-status";

type SearchParams = Record<string, string | string[] | undefined>;

export interface OrderFilters {
  status: string;
  kind: string;
  paid: "paid" | "unpaid" | "";
  /** Only orders not touched for this many days (dashboard "needs attention" links). */
  stale: "3" | "7" | "";
  from: string;
  to: string;
}

function first(value: string | string[] | undefined): string {
  return ((Array.isArray(value) ? value[0] : value) ?? "").trim();
}

const DATE = /^\d{4}-\d{2}-\d{2}$/;

function validDate(value: string): string {
  return DATE.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`))
    ? value
    : "";
}

/** Reads the filter fields from searchParams; anything invalid is dropped. */
export function parseOrderFilters(params: SearchParams): OrderFilters {
  const status = first(params.status);
  const kind = first(params.kind);
  const paid = first(params.paid);
  const stale = first(params.stale);
  return {
    status: isOrderStatus(status) ? status : "",
    kind: isOrderKind(kind) ? kind : "",
    paid: paid === "paid" || paid === "unpaid" ? paid : "",
    stale: stale === "3" || stale === "7" ? stale : "",
    from: validDate(first(params.from)),
    to: validDate(first(params.to)),
  };
}

/** Prisma where clause for the orders list. `q` matches reference, customer or company. */
export function buildOrderWhere(
  filters: OrderFilters,
  q: string,
  timeZone = "UTC",
): Prisma.OrderWhereInput {
  const where: Prisma.OrderWhereInput = {};
  if (isOrderStatus(filters.status)) where.status = filters.status;
  if (isOrderKind(filters.kind)) where.kind = filters.kind;
  if (filters.paid === "paid") where.paidAt = { not: null };
  if (filters.paid === "unpaid") where.paidAt = null;
  if (filters.stale) {
    // "Stale" = the last status change is older than N days (orders with no recorded
    // status change yet fall back to their last-updated time).
    const cutoff = new Date(
      Date.now() - Number(filters.stale) * 24 * 60 * 60 * 1000,
    );
    where.AND = [
      {
        OR: [
          {
            statusChanges: { some: {} },
            NOT: { statusChanges: { some: { at: { gte: cutoff } } } },
          },
          { statusChanges: { none: {} }, updatedAt: { lt: cutoff } },
        ],
      },
    ];
  }

  const createdAt: Prisma.DateTimeFilter = {};
  const from = filters.from ? startOfDayInZone(filters.from, timeZone) : null;
  const before = filters.to
    ? startOfDayInZone(nextDayString(filters.to), timeZone)
    : null;
  if (from) createdAt.gte = from;
  if (before) createdAt.lt = before;
  if (createdAt.gte || createdAt.lt) where.createdAt = createdAt;

  const term = q.trim();
  if (term) {
    const contains = { contains: term, mode: "insensitive" as const };
    where.OR = [
      { id: { endsWith: term.replace(/^#/, "").toLowerCase() } },
      { user: { email: contains } },
      { user: { name: contains } },
      { company: { name: contains } },
    ];
  }
  return where;
}

/** Query string for a link to another page, keeping the non-empty values. */
export function buildQuery(
  values: Record<string, string>,
  page: number,
): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(values)) {
    if (value !== "") search.set(key, value);
  }
  if (page > 1) search.set("page", String(page));
  const text = search.toString();
  return text ? `?${text}` : "";
}

export interface SplitPage {
  failed: { skip: number; take: number };
  other: { skip: number; take: number };
}

/**
 * One list that shows failed payments first, then the rest, paged as a whole.
 * Works out which rows of each group fall on the requested page.
 */
export function splitFailedFirst(
  failedCount: number,
  skip: number,
  take = PAGE_SIZE,
): SplitPage {
  const failedSkip = Math.min(skip, failedCount);
  const failedTake = Math.min(take, failedCount - failedSkip);
  return {
    failed: { skip: failedSkip, take: failedTake },
    other: { skip: Math.max(0, skip - failedCount), take: take - failedTake },
  };
}
