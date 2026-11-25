/* Pure calculations for the admin dashboard (no database, no React), so they can be unit tested.
   Money arrives as plain numbers in USD. */

export const RANGE_OPTIONS = [7, 30, 90] as const;
export type RangeDays = (typeof RANGE_OPTIONS)[number];
export const DEFAULT_RANGE: RangeDays = 30;

const DAY = 24 * 60 * 60 * 1000;

/** Widgets a STAFF user does not see. One list, so it is easy to change after the owner decides. */
export const STAFF_HIDDEN_WIDGETS = [
  "revenue",
  "revenueChart",
  "amounts",
] as const;
export type DashboardWidget = (typeof STAFF_HIDDEN_WIDGETS)[number];

export function canSeeWidget(role: string, widget: DashboardWidget): boolean {
  if (role === "SUPER_ADMIN") return true;
  if (role !== "STAFF") return false;
  return !(STAFF_HIDDEN_WIDGETS as readonly string[]).includes(widget);
}

export function parseRange(value: string | string[] | undefined): RangeDays {
  const raw = Array.isArray(value) ? value[0] : value;
  const n = Number(raw);
  return (RANGE_OPTIONS as readonly number[]).includes(n)
    ? (n as RangeDays)
    : DEFAULT_RANGE;
}

export interface Period {
  start: Date;
  end: Date;
  prevStart: Date;
  days: RangeDays;
}

/** The chosen period ends now; the previous period is the same length right before it. */
export function periodFor(now: Date, days: RangeDays): Period {
  const end = now;
  const start = new Date(end.getTime() - days * DAY);
  const prevStart = new Date(start.getTime() - days * DAY);
  return { start, end, prevStart, days };
}

/** Percent change from previous to current, rounded. Null when there is nothing to compare with. */
export function percentChange(
  current: number,
  previous: number,
): number | null {
  if (previous <= 0) return null;
  return Math.round(((current - previous) / previous) * 100);
}

export function changeLabel(change: number | null, days: number): string {
  if (change === null) return `Last ${days} days`;
  const sign = change > 0 ? "+" : "";
  return `${sign}${change}% vs previous ${days} days`;
}

export interface Bucket {
  label: string;
  value: number;
}

/** Revenue per day (7 days) or per week (30 and 90 days), oldest first. */
export function revenueBuckets(
  payments: { at: Date; amount: number }[],
  period: Period,
): Bucket[] {
  const daily = period.days <= 7;
  const size = (daily ? 1 : 7) * DAY;
  const count = Math.ceil(period.days / (daily ? 1 : 7));
  const buckets: Bucket[] = Array.from({ length: count }, (_, i) => ({
    label: daily
      ? new Date(period.start.getTime() + i * size).toLocaleDateString(
          "en-GB",
          { day: "2-digit", month: "short", timeZone: "UTC" },
        )
      : `W${i + 1}`,
    value: 0,
  }));
  for (const p of payments) {
    const offset = p.at.getTime() - period.start.getTime();
    if (offset < 0 || offset > period.days * DAY) continue;
    const index = Math.min(count - 1, Math.floor(offset / size));
    (buckets[index] as Bucket).value += p.amount;
  }
  return buckets.map((b) => ({ ...b, value: Math.round(b.value) }));
}

export const STATUS_ORDER = [
  "PAID",
  "DETAILS_PENDING",
  "READY_FOR_REVIEW",
  "FILING_SUBMITTED",
  "APPROVED_BY_STATE",
  "EIN_RECEIVED",
  "COMPLETED",
] as const;
export type DashStatus = (typeof STATUS_ORDER)[number];

/** Colours and labels from the approved design (text colour, chip background). */
export const STATUS_STYLE: Record<
  DashStatus,
  { label: string; color: string; background: string }
> = {
  PAID: { label: "Paid", color: "#93C5FD", background: "rgba(59,130,246,.15)" },
  DETAILS_PENDING: {
    label: "Details pending",
    color: "#FBBF24",
    background: "rgba(251,191,36,.13)",
  },
  READY_FOR_REVIEW: {
    label: "Ready for review",
    color: "#C4B5FD",
    background: "rgba(139,92,246,.16)",
  },
  FILING_SUBMITTED: {
    label: "Filing submitted",
    color: "#67E8F9",
    background: "rgba(34,211,238,.13)",
  },
  APPROVED_BY_STATE: {
    label: "Approved by state",
    color: "#5EEAD4",
    background: "rgba(20,184,166,.14)",
  },
  EIN_RECEIVED: {
    label: "EIN received",
    color: "#F0ABFC",
    background: "rgba(232,121,249,.13)",
  },
  COMPLETED: {
    label: "Completed",
    color: "#34D399",
    background: "rgba(52,211,153,.13)",
  },
};

export function isDashStatus(value: string): value is DashStatus {
  return (STATUS_ORDER as readonly string[]).includes(value);
}

/** Counts per status for the 7 shown statuses (drafts and bookings are not part of the donut). */
export function statusCounts(statuses: string[]): Record<DashStatus, number> {
  const out = Object.fromEntries(STATUS_ORDER.map((s) => [s, 0])) as Record<
    DashStatus,
    number
  >;
  for (const s of statuses) if (isDashStatus(s)) out[s] += 1;
  return out;
}

export interface FunnelStep {
  label: string;
  count: number;
  /** Share of the first step, 0 to 100. */
  percent: number;
}

const AFTER_DETAILS: string[] = [
  "READY_FOR_REVIEW",
  "FILING_SUBMITTED",
  "APPROVED_BY_STATE",
  "EIN_RECEIVED",
  "COMPLETED",
];
const FILED: string[] = [
  "FILING_SUBMITTED",
  "APPROVED_BY_STATE",
  "EIN_RECEIVED",
  "COMPLETED",
];

/** Checkout started (every order incl. drafts) > Paid > Details complete > Filed with state > Completed. */
export function pipeline(statuses: string[]): FunnelStep[] {
  const started = statuses.length;
  const paid = statuses.filter((s) => s !== "DRAFT").length;
  const details = statuses.filter((s) => AFTER_DETAILS.includes(s)).length;
  const filed = statuses.filter((s) => FILED.includes(s)).length;
  const completed = statuses.filter((s) => s === "COMPLETED").length;
  const steps: [string, number][] = [
    ["Checkout started", started],
    ["Paid", paid],
    ["Details complete", details],
    ["Filed with state", filed],
    ["Completed", completed],
  ];
  return steps.map(([label, count]) => ({
    label,
    count,
    percent: started > 0 ? Math.round((count / started) * 100) : 0,
  }));
}

export const DETAILS_STALE_DAYS = 3;
export const STATE_STALE_DAYS = 7;

export interface AttentionInput {
  now: Date;
  detailsPending: { updatedAt: Date }[];
  filingSubmitted: { updatedAt: Date }[];
}

/** Orders stuck too long: customer details over 3 days, state filing over 7 days. */
export function staleCounts(input: AttentionInput): {
  detailsOverdue: number;
  stateOverdue: number;
} {
  const older = (rows: { updatedAt: Date }[], days: number) =>
    rows.filter((r) => input.now.getTime() - r.updatedAt.getTime() > days * DAY)
      .length;
  return {
    detailsOverdue: older(input.detailsPending, DETAILS_STALE_DAYS),
    stateOverdue: older(input.filingSubmitted, STATE_STALE_DAYS),
  };
}

export function stateLabel(code: string): string {
  return code
    .toLowerCase()
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function stateAbbr(code: string): string {
  const map: Record<string, string> = {
    WYOMING: "WY",
    DELAWARE: "DE",
    TEXAS: "TX",
    FLORIDA: "FL",
    NEW_YORK: "NY",
    CALIFORNIA: "CA",
    NEVADA: "NV",
    NEW_MEXICO: "NM",
    WASHINGTON: "WA",
  };
  return map[code] ?? code.slice(0, 2);
}

/** Orders per state, biggest first (top 6). Orders without a company are skipped. */
export function ordersByState(
  rows: { state: string | null }[],
  limit = 6,
): { state: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const r of rows) {
    if (!r.state) continue;
    counts.set(r.state, (counts.get(r.state) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([state, count]) => ({ state, count }))
    .sort((a, b) => b.count - a.count || a.state.localeCompare(b.state))
    .slice(0, limit);
}

const SERVICE_SHORT: Record<string, string> = {
  "starter-llc": "LLC",
  "premium-c-corp": "C-Corp",
  ein: "EIN",
  "registered-agent": "Agent",
  "expert-call": "Expert",
  "virtual-bank": "Bank",
  "virtual-mailbox": "Mailbox",
  bookkeeping: "Books",
  "office-address": "Office",
  warehousing: "Warehouse",
};

export function serviceLabel(slug: string, name: string): string {
  return SERVICE_SHORT[slug] ?? name.slice(0, 10);
}

/** Orders per service. Each order counts once per distinct catalog item it contains. */
export function ordersByService(
  orders: { items: { slug: string; name: string }[] }[],
  limit = 6,
): { label: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const order of orders) {
    const seen = new Set<string>();
    for (const item of order.items) {
      if (seen.has(item.slug)) continue;
      seen.add(item.slug);
      const label = serviceLabel(item.slug, item.name);
      counts.set(label, (counts.get(label) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
    .slice(0, limit);
}

/** "2h", "5h", "1d", "12m" since a time, for the Latest orders table. */
export function agoShort(then: Date, now: Date): string {
  const minutes = Math.max(
    0,
    Math.floor((now.getTime() - then.getTime()) / 60000),
  );
  if (minutes < 60) return `${Math.max(minutes, 1)}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
}

/** Age text for the oldest waiting KYC document: "Oldest: 6 hours". */
export function oldestLabel(oldest: Date | null, now: Date): string {
  if (!oldest) return "Nothing waiting";
  const hours = Math.floor((now.getTime() - oldest.getTime()) / 3_600_000);
  if (hours < 1) return "Oldest: under 1 hour";
  if (hours < 48) return `Oldest: ${hours} hour${hours === 1 ? "" : "s"}`;
  return `Oldest: ${Math.floor(hours / 24)} days`;
}
