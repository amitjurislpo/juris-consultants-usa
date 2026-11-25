/** Pure calculations for the customer dashboard. Plain data in, numbers and lists out (no database). */

export interface DOrderItem {
  name: string;
  priceUsd: number;
  qty: number;
  billing: "ONE_TIME" | "MONTHLY" | "YEARLY";
}

export interface DOrder {
  id: string;
  kind: "FORMATION" | "SERVICES" | "CONSULTATION" | "GLOBAL";
  status: string;
  totalUsd: number;
  createdAt: Date;
  paidAt: Date | null;
  companyName: string | null;
  items: DOrderItem[];
}

export interface DPayment {
  orderId: string;
  amountUsd: number;
  status: "PENDING" | "SUCCEEDED" | "FAILED" | "REFUNDED";
  createdAt: Date;
}

export interface DKyc {
  orderId: string;
  docType: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  rejectReason: string | null;
  createdAt: Date;
}

export interface DDeliverable {
  id: string;
  orderId: string;
  type: string;
  createdAt: Date;
}

export interface DStatusEvent {
  orderId: string;
  to: string;
  at: Date;
}

export const FORMATION_PATH = [
  "PAID",
  "DETAILS_PENDING",
  "READY_FOR_REVIEW",
  "FILING_SUBMITTED",
  "APPROVED_BY_STATE",
  "EIN_RECEIVED",
  "COMPLETED",
] as const;
export const CONSULTATION_PATH = ["PAID", "BOOKED", "COMPLETED"] as const;

/** Labels for the dashboard stepper (same words as the approved design). */
export const STEP_LABELS: Record<string, string> = {
  PAID: "Paid",
  DETAILS_PENDING: "Your details",
  READY_FOR_REVIEW: "Expert review",
  FILING_SUBMITTED: "Filed with state",
  APPROVED_BY_STATE: "State approved",
  EIN_RECEIVED: "EIN received",
  BOOKED: "Call booked",
  COMPLETED: "Completed",
};

export function pathFor(kind: DOrder["kind"]): readonly string[] {
  return kind === "CONSULTATION" || kind === "GLOBAL"
    ? CONSULTATION_PATH
    : FORMATION_PATH;
}

/** Index of the step an order is on (0 = Paid). -1 for unpaid drafts. */
export function stepIndex(order: Pick<DOrder, "kind" | "status">): number {
  return pathFor(order.kind).indexOf(order.status);
}

/** Share of the path finished, 0 to 100. Drafts are 0. */
export function progressPercent(
  order: Pick<DOrder, "kind" | "status">,
): number {
  const path = pathFor(order.kind);
  const idx = path.indexOf(order.status);
  if (idx < 0) return 0;
  return Math.round((idx / (path.length - 1)) * 100);
}

const isRecurring = (item: DOrderItem) => item.billing !== "ONE_TIME";

/** The order the stepper shows: newest paid order that is not finished, formations first. */
export function pickMainOrder(orders: DOrder[]): DOrder | null {
  const open = orders
    .filter((o) => o.status !== "DRAFT" && o.status !== "COMPLETED")
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  return (
    open.find((o) => o.kind === "FORMATION") ??
    open[0] ??
    orders
      .filter((o) => o.status === "COMPLETED")
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0] ??
    null
  );
}

export function totalPaid(payments: DPayment[]): number {
  return payments
    .filter((p) => p.status === "SUCCEEDED")
    .reduce((sum, p) => sum + p.amountUsd, 0);
}

/** Services still running: unfinished paid orders, plus finished ones that renew (monthly/yearly). */
export function activeServices(orders: DOrder[]): number {
  return orders.filter((o) => {
    if (o.status === "DRAFT") return false;
    if (o.status !== "COMPLETED") return true;
    return o.items.some(isRecurring);
  }).length;
}

export interface OpenTask {
  kind: "pay" | "details" | "kyc-rejected" | "kyc-missing";
  title: string;
  text: string;
  href: string;
  cta: string;
  at: Date;
}

/** Everything the customer still has to do, oldest first. */
export function openTasks(input: {
  orders: DOrder[];
  kyc: DKyc[];
  requiredDocTypes: string[];
  ref: (orderId: string) => string;
  docLabel: (docType: string) => string;
}): OpenTask[] {
  const tasks: OpenTask[] = [];
  for (const o of input.orders) {
    if (o.status === "DRAFT") {
      tasks.push({
        kind: "pay",
        title: `Pay for order ${input.ref(o.id)}`,
        text: "Your order is saved but not paid yet. Payment starts the work.",
        href: `/account/orders/${o.id}`,
        cta: "Pay now",
        at: o.createdAt,
      });
    } else if (o.status === "DETAILS_PENDING") {
      tasks.push({
        kind: "details",
        title: "We need a few details from you",
        text: `Order ${input.ref(o.id)} is waiting for your information.`,
        href: `/account/orders/${o.id}`,
        cta: "Open order",
        at: o.paidAt ?? o.createdAt,
      });
    }
  }
  // Latest upload per document type decides whether it is open.
  const latest = new Map<string, DKyc>();
  for (const doc of [...input.kyc].sort(
    (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
  )) {
    latest.set(doc.docType.toLowerCase(), doc);
  }
  for (const doc of latest.values()) {
    if (doc.status === "REJECTED") {
      tasks.push({
        kind: "kyc-rejected",
        title: `Upload your ${input.docLabel(doc.docType)} again`,
        text: doc.rejectReason
          ? `Not accepted: ${doc.rejectReason}`
          : "Our team could not accept the last file.",
        href: "/account/documents",
        cta: "Upload now",
        at: doc.createdAt,
      });
    }
  }
  const paid = input.orders.filter((o) => o.status !== "DRAFT");
  if (paid.length > 0) {
    const firstPaid = paid
      .map((o) => o.paidAt ?? o.createdAt)
      .sort((a, b) => a.getTime() - b.getTime())[0] as Date;
    for (const type of input.requiredDocTypes) {
      if (!latest.has(type.toLowerCase())) {
        tasks.push({
          kind: "kyc-missing",
          title: `Upload your ${input.docLabel(type)} for KYC`,
          text: "Needed to file your company. Takes 2 minutes.",
          href: "/account/documents",
          cta: "Upload now",
          at: firstPaid,
        });
      }
    }
  }
  return tasks.sort((a, b) => a.at.getTime() - b.at.getTime());
}

export interface StatusBuckets {
  done: number;
  inProgress: number;
  needsAction: number;
}

/** Donut: finished or running as a subscription / still being worked on / waiting for the customer. */
export function statusBuckets(
  orders: DOrder[],
  tasks: OpenTask[],
): StatusBuckets {
  const needs = new Set(
    tasks
      .map((t) => t.href.match(/\/orders\/(.+)$/)?.[1])
      .filter((id): id is string => Boolean(id)),
  );
  const out: StatusBuckets = { done: 0, inProgress: 0, needsAction: 0 };
  for (const o of orders) {
    if (o.status === "DRAFT" || needs.has(o.id)) out.needsAction += 1;
    else if (o.status === "COMPLETED") out.done += 1;
    else out.inProgress += 1;
  }
  return out;
}

/** Day key ("2026-11-02") in a time zone, so payments group by the customer's own calendar day. */
export function dayKey(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

/** Running total of successful payments, one point per day. Always starts from zero. */
export function cumulativeSpend(
  payments: DPayment[],
  timeZone: string,
  label: (date: Date) => string,
): { labels: string[]; values: number[] } {
  const paid = payments
    .filter((p) => p.status === "SUCCEEDED")
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  const days = new Map<string, { at: Date; amount: number }>();
  for (const p of paid) {
    const key = dayKey(p.createdAt, timeZone);
    const hit = days.get(key);
    if (hit) hit.amount += p.amountUsd;
    else days.set(key, { at: p.createdAt, amount: p.amountUsd });
  }
  const labels: string[] = [];
  const values: number[] = [];
  let running = 0;
  for (const { at, amount } of days.values()) {
    running += amount;
    labels.push(label(at));
    values.push(Math.round(running * 100) / 100);
  }
  if (values.length === 1) {
    return { labels: ["Start", ...labels], values: [0, ...values] };
  }
  return { labels, values };
}

const SHORT_NAME: [RegExp, string][] = [
  [/llc/i, "LLC"],
  [/c-?corp/i, "C-Corp"],
  [/state/i, "State fee"],
  [/ein/i, "EIN"],
  [/bank/i, "Bank"],
  [/mailbox/i, "Mailbox"],
  [/book/i, "Books"],
  [/office/i, "Office"],
  [/agent/i, "Agent"],
  [/expert|consult/i, "Expert"],
];

export function shortServiceName(name: string): string {
  for (const [pattern, short] of SHORT_NAME) {
    if (pattern.test(name)) return short;
  }
  return name.length > 9 ? `${name.slice(0, 8)}.` : name;
}

/** Spend per service across paid orders (price at purchase x quantity), largest first, top 5. */
export function spendByService(orders: DOrder[], limit = 5) {
  const totals = new Map<string, number>();
  for (const o of orders) {
    if (o.status === "DRAFT") continue;
    for (const item of o.items) {
      const key = shortServiceName(item.name);
      totals.set(key, (totals.get(key) ?? 0) + item.priceUsd * item.qty);
    }
  }
  const rows = [...totals.entries()]
    .map(([label, value]) => ({ label, value: Math.round(value) }))
    .sort((a, b) => b.value - a.value);
  return rows.slice(0, limit);
}

/** Date under each stepper step: when the order reached it, from the status history. */
export function stepDates(
  order: DOrder,
  events: DStatusEvent[],
): (Date | null)[] {
  return pathFor(order.kind).map((step) => {
    if (step === "PAID" && order.paidAt) return order.paidAt;
    const hit = events
      .filter((e) => e.orderId === order.id && e.to === step)
      .sort((a, b) => a.at.getTime() - b.at.getTime())[0];
    return hit?.at ?? null;
  });
}

/** Sidebar badges: orders that need the customer, and documents ready to download. */
export function badgeCounts(
  orders: Pick<DOrder, "status">[],
  deliverableCount: number,
) {
  return {
    orders: orders.filter(
      (o) => o.status === "DRAFT" || o.status === "DETAILS_PENDING",
    ).length,
    documents: deliverableCount,
  };
}
