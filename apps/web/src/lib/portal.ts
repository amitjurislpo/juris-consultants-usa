/** Plain helpers for the customer portal (labels, dates, money). No database access here. */

export type StatusTone =
  "neutral" | "primary" | "success" | "warning" | "danger" | "info";

/** Same short reference the admin panel shows, so customer and staff can quote one number. */
export function orderRef(id: string): string {
  return `#${id.slice(-8).toUpperCase()}`;
}

const ORDER_STATUS: Record<
  string,
  { label: string; tone: StatusTone; hint: string }
> = {
  DRAFT: {
    label: "Draft",
    tone: "neutral",
    hint: "Started but not paid yet.",
  },
  PAID: {
    label: "Paid",
    tone: "success",
    hint: "Payment received. Our team is getting started.",
  },
  DETAILS_PENDING: {
    label: "Details needed",
    tone: "warning",
    hint: "We need a few details or documents from you.",
  },
  READY_FOR_REVIEW: {
    label: "Under review",
    tone: "info",
    hint: "Our team is checking your details.",
  },
  FILING_SUBMITTED: {
    label: "Filed with the state",
    tone: "info",
    hint: "Your filing has been submitted to the state.",
  },
  APPROVED_BY_STATE: {
    label: "Approved by the state",
    tone: "success",
    hint: "The state has approved your company.",
  },
  EIN_RECEIVED: {
    label: "EIN received",
    tone: "success",
    hint: "Your US tax ID (EIN) has arrived.",
  },
  COMPLETED: {
    label: "Completed",
    tone: "success",
    hint: "All done. Your documents are ready.",
  },
  BOOKED: {
    label: "Call booked",
    tone: "primary",
    hint: "Your expert call is booked.",
  },
};

export function orderStatusInfo(status: string) {
  return (
    ORDER_STATUS[status] ?? {
      label: status,
      tone: "neutral" as StatusTone,
      hint: "",
    }
  );
}

/** The path a formation order follows, in order. Used for the progress list on the order page. */
export const FORMATION_STEPS = [
  "PAID",
  "DETAILS_PENDING",
  "READY_FOR_REVIEW",
  "FILING_SUBMITTED",
  "APPROVED_BY_STATE",
  "EIN_RECEIVED",
  "COMPLETED",
] as const;

const ORDER_KIND: Record<string, string> = {
  FORMATION: "Company formation",
  SERVICES: "Business services",
  CONSULTATION: "Expert consultation",
  GLOBAL: "Global business setup",
};
export function orderKindLabel(kind: string): string {
  return ORDER_KIND[kind] ?? kind;
}

const PAYMENT_STATUS: Record<string, { label: string; tone: StatusTone }> = {
  PENDING: { label: "Pending", tone: "warning" },
  SUCCEEDED: { label: "Paid", tone: "success" },
  FAILED: { label: "Failed", tone: "danger" },
  REFUNDED: { label: "Refunded", tone: "neutral" },
};
export function paymentStatusInfo(status: string) {
  return (
    PAYMENT_STATUS[status] ?? { label: status, tone: "neutral" as StatusTone }
  );
}

const KYC_STATUS: Record<string, { label: string; tone: StatusTone }> = {
  PENDING: { label: "Under review", tone: "info" },
  APPROVED: { label: "Approved", tone: "success" },
  REJECTED: { label: "Needs a new upload", tone: "danger" },
};
export function kycStatusInfo(status: string) {
  return KYC_STATUS[status] ?? { label: status, tone: "neutral" as StatusTone };
}

export function stateLabel(state: string): string {
  return state
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function entityLabel(entity: string): string {
  return entity === "CCORP"
    ? "C-Corporation"
    : entity === "LLC"
      ? "LLC"
      : entity;
}

export function formatMoney(
  amount: { toString(): string } | number,
  currency = "USD",
): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(
    Number(amount.toString()),
  );
}

/** Turns a stored address JSON object into readable lines, always in postal order. */
export function addressLines(address: unknown): string[] {
  if (!address || typeof address !== "object") return [];
  const source = address as Record<string, unknown>;
  const order = ["line1", "line2", "city", "state", "zip", "country"];
  const known = order.map((key) => source[key]);
  const extra = Object.entries(source)
    .filter(([key]) => !order.includes(key))
    .map(([, value]) => value);
  return [...known, ...extra]
    .map((value) => (typeof value === "string" ? value.trim() : ""))
    .filter(Boolean);
}

export function displayName(
  name: string | null | undefined,
  email: string,
): string {
  const trimmed = name?.trim();
  if (trimmed) return trimmed;
  const local = email.split("@")[0] ?? "";
  return local ? local.charAt(0).toUpperCase() + local.slice(1) : "Customer";
}
