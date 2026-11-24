import { endOfDayInZone, startOfDayInZone } from "./datetime";
import { PAGE_SIZE } from "./page";

type SearchParams = Record<string, string | string[] | undefined>;

export interface ActivityFilters {
  actor: string;
  action: string;
  entity: string;
  from: Date | null;
  to: Date | null;
  page: number;
}

function first(value: string | string[] | undefined): string {
  return ((Array.isArray(value) ? value[0] : value) ?? "").trim().slice(0, 100);
}

function parseDay(
  value: string,
  endOfDay: boolean,
  timeZone: string,
): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  return endOfDay
    ? endOfDayInZone(value, timeZone)
    : startOfDayInZone(value, timeZone);
}

/** Reads ?actor= &action= &entity= &from= &to= &page= from the page's searchParams. */
export function parseActivityFilters(
  params: SearchParams,
  timeZone = "UTC",
): ActivityFilters {
  const rawPage = first(params.page);
  const page = /^\d{1,5}$/.test(rawPage) ? Math.max(Number(rawPage), 1) : 1;
  return {
    actor: first(params.actor),
    action: first(params.action),
    entity: first(params.entity),
    from: parseDay(first(params.from), false, timeZone),
    to: parseDay(first(params.to), true, timeZone),
    page,
  };
}

/** Prisma `where` for the AuditLog list. Login attempts are included on purpose. */
export function activityWhere(filters: ActivityFilters) {
  const at =
    filters.from || filters.to
      ? { gte: filters.from ?? undefined, lte: filters.to ?? undefined }
      : undefined;
  const contains = (value: string) => ({
    contains: value,
    mode: "insensitive" as const,
  });
  return {
    ...(filters.actor ? { actor: { email: contains(filters.actor) } } : {}),
    ...(filters.action ? { action: contains(filters.action) } : {}),
    ...(filters.entity ? { entity: contains(filters.entity) } : {}),
    ...(at ? { at } : {}),
  };
}

export function activitySkip(page: number): number {
  return (page - 1) * PAGE_SIZE;
}
