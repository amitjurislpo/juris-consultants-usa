import {
  getAllowedTransitions,
  type KycDocumentStatus,
  type OrderKind,
  type OrderStatus,
  type StatusContext,
} from "@juris/core";

export const STATUS_LABELS: Record<OrderStatus, string> = {
  DRAFT: "Draft",
  PAID: "Paid",
  DETAILS_PENDING: "Details pending",
  READY_FOR_REVIEW: "Ready for review",
  FILING_SUBMITTED: "Filing submitted",
  APPROVED_BY_STATE: "Approved by state",
  EIN_RECEIVED: "EIN received",
  COMPLETED: "Completed",
  BOOKED: "Booked",
};

export const KIND_LABELS: Record<OrderKind, string> = {
  FORMATION: "Formation",
  SERVICES: "Services",
  CONSULTATION: "Expert consultation",
  GLOBAL: "Global warehousing",
};

export type StatusTone = "neutral" | "primary" | "success" | "warning" | "info";

export function statusTone(status: OrderStatus): StatusTone {
  switch (status) {
    case "DRAFT":
      return "neutral";
    case "COMPLETED":
      return "success";
    case "DETAILS_PENDING":
    case "READY_FOR_REVIEW":
      return "warning";
    case "PAID":
    case "BOOKED":
      return "info";
    default:
      return "primary";
  }
}

export function isOrderStatus(value: unknown): value is OrderStatus {
  return typeof value === "string" && Object.hasOwn(STATUS_LABELS, value);
}

export function isOrderKind(value: unknown): value is OrderKind {
  return typeof value === "string" && Object.hasOwn(KIND_LABELS, value);
}

/** Short order reference shown to staff and customers. */
export function orderRef(id: string): string {
  return `#${id.slice(-8).toUpperCase()}`;
}

export interface StatusContextInput {
  kind: OrderKind;
  /** The customer has submitted the company details (Order.detailsSubmittedAt is set). */
  detailsSubmitted: boolean;
  kycStatuses: readonly KycDocumentStatus[];
  /** An EIN line item was bought. */
  einOrdered: boolean;
}

export function buildStatusContext(input: StatusContextInput): StatusContext {
  return {
    kind: input.kind,
    detailsComplete: input.detailsSubmitted,
    kycDocuments: input.kycStatuses.map((status) => ({ status })),
    einOrdered: input.einOrdered,
  };
}

/**
 * Statuses an admin may move the order to. Never includes PAID: an order
 * becomes paid only through the payment provider's webhook.
 */
export function selectableStatuses(
  from: OrderStatus,
  context: StatusContext,
): OrderStatus[] {
  return getAllowedTransitions(from, context).filter(
    (status) => status !== "PAID",
  );
}

/** Moving back to DETAILS_PENDING is a rejection and needs a reason for the customer. */
export function needsReason(from: OrderStatus, to: OrderStatus): boolean {
  return from === "READY_FOR_REVIEW" && to === "DETAILS_PENDING";
}

export interface StatusEmailInput {
  customerName: string | null;
  ref: string;
  from: OrderStatus;
  to: OrderStatus;
  reason: string | null;
}

export interface StatusEmail {
  template: "order-rejected" | "order-status-changed";
  subject: string;
  text: string;
}

export function buildStatusEmail(input: StatusEmailInput): StatusEmail {
  const greeting = input.customerName
    ? `Hello ${input.customerName},`
    : "Hello,";
  if (input.reason && needsReason(input.from, input.to)) {
    return {
      template: "order-rejected",
      subject: `Action needed on your order ${input.ref}`,
      text: [
        greeting,
        "",
        `We reviewed your order ${input.ref} and need a few things corrected before we can continue.`,
        "",
        `Reason: ${input.reason}`,
        "",
        "Please sign in to your dashboard, update the details or documents, and send them again.",
      ].join("\n"),
    };
  }
  return {
    template: "order-status-changed",
    subject: `Your order ${input.ref} is now: ${STATUS_LABELS[input.to]}`,
    text: [
      greeting,
      "",
      `The status of your order ${input.ref} changed to "${STATUS_LABELS[input.to]}".`,
      "",
      "You can follow every step in your dashboard.",
    ].join("\n"),
  };
}

export type PaymentStatusName = "PENDING" | "SUCCEEDED" | "FAILED" | "REFUNDED";

export const PAYMENT_LABELS: Record<PaymentStatusName, string> = {
  PENDING: "Pending",
  SUCCEEDED: "Succeeded",
  FAILED: "Failed",
  REFUNDED: "Refunded",
};

export function isPaymentStatus(value: unknown): value is PaymentStatusName {
  return typeof value === "string" && Object.hasOwn(PAYMENT_LABELS, value);
}

export function paymentTone(
  status: PaymentStatusName,
): "neutral" | "success" | "warning" | "danger" {
  if (status === "SUCCEEDED") return "success";
  if (status === "FAILED") return "danger";
  if (status === "PENDING") return "warning";
  return "neutral";
}

export type ConsultationStatusName = "SCHEDULED" | "COMPLETED" | "CANCELLED";

export const CONSULTATION_LABELS: Record<ConsultationStatusName, string> = {
  SCHEDULED: "Scheduled",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export function isConsultationStatus(
  value: unknown,
): value is ConsultationStatusName {
  return typeof value === "string" && Object.hasOwn(CONSULTATION_LABELS, value);
}

export function consultationTone(
  status: ConsultationStatusName,
): "info" | "success" | "neutral" {
  if (status === "SCHEDULED") return "info";
  if (status === "COMPLETED") return "success";
  return "neutral";
}
