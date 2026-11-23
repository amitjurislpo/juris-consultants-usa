export type OrderKind = "FORMATION" | "SERVICES" | "CONSULTATION" | "GLOBAL";

export type FormationStatus =
  | "DRAFT"
  | "PAID"
  | "DETAILS_PENDING"
  | "READY_FOR_REVIEW"
  | "FILING_SUBMITTED"
  | "APPROVED_BY_STATE"
  | "EIN_RECEIVED"
  | "COMPLETED";

export type ConsultationStatus = "DRAFT" | "PAID" | "BOOKED" | "COMPLETED";

export type OrderStatus = FormationStatus | ConsultationStatus;

export type KycDocumentStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface StatusContext {
  readonly kind: OrderKind;
  readonly detailsComplete?: boolean;
  readonly kycDocuments?: readonly { readonly status: KycDocumentStatus }[];
  readonly einOrdered?: boolean;
}

export interface StatusTransition {
  readonly from: OrderStatus;
  readonly to: OrderStatus;
  readonly kind: OrderKind;
}

const consultationKinds = new Set<OrderKind>(["CONSULTATION", "GLOBAL"]);

function hasApprovedKyc(context: StatusContext): boolean {
  const documents = context.kycDocuments;
  return (
    documents !== undefined &&
    documents.length > 0 &&
    documents.every((document) => document.status === "APPROVED")
  );
}

export function canTransition(
  from: OrderStatus,
  to: OrderStatus,
  context: StatusContext,
): boolean {
  if (consultationKinds.has(context.kind)) {
    const allowed: readonly (readonly [
      ConsultationStatus,
      ConsultationStatus,
    ])[] = [
      ["DRAFT", "PAID"],
      ["PAID", "BOOKED"],
      ["BOOKED", "COMPLETED"],
    ];
    return allowed.some(
      ([allowedFrom, allowedTo]) => allowedFrom === from && allowedTo === to,
    );
  }

  if (from === "READY_FOR_REVIEW" && to === "DETAILS_PENDING") {
    const rejected =
      context.kycDocuments?.some((doc) => doc.status === "REJECTED") ?? false;
    return rejected || context.detailsComplete === false;
  }

  if (from === "FILING_SUBMITTED" && to === "READY_FOR_REVIEW") return false;

  const allowed: readonly (readonly [FormationStatus, FormationStatus])[] = [
    ["DRAFT", "PAID"],
    ["PAID", "DETAILS_PENDING"],
    ["DETAILS_PENDING", "READY_FOR_REVIEW"],
    ["READY_FOR_REVIEW", "FILING_SUBMITTED"],
    ["FILING_SUBMITTED", "APPROVED_BY_STATE"],
    ["APPROVED_BY_STATE", "EIN_RECEIVED"],
    ["APPROVED_BY_STATE", "COMPLETED"],
    ["EIN_RECEIVED", "COMPLETED"],
  ];

  if (from === "DETAILS_PENDING" && to === "READY_FOR_REVIEW") {
    return context.detailsComplete === true && hasApprovedKyc(context);
  }

  if (from === "READY_FOR_REVIEW" && to === "FILING_SUBMITTED") {
    const documentsComplete =
      hasApprovedKyc(context) && context.detailsComplete === true;
    if (!documentsComplete) return false;
  }

  if (from === "APPROVED_BY_STATE" && to === "EIN_RECEIVED") {
    return context.einOrdered === true;
  }

  if (from === "APPROVED_BY_STATE" && to === "COMPLETED") {
    return context.einOrdered !== true;
  }

  return allowed.some(
    ([allowedFrom, allowedTo]) => allowedFrom === from && allowedTo === to,
  );
}

export function transitionStatus(
  from: OrderStatus,
  to: OrderStatus,
  context: StatusContext,
): StatusTransition {
  if (!canTransition(from, to, context)) {
    throw new Error(`Invalid order status transition: ${from} -> ${to}`);
  }
  return { from, to, kind: context.kind };
}

export function getAllowedTransitions(
  from: OrderStatus,
  context: StatusContext,
): readonly OrderStatus[] {
  const candidates: readonly OrderStatus[] = consultationKinds.has(context.kind)
    ? ["PAID", "BOOKED", "COMPLETED"]
    : [
        "PAID",
        "DETAILS_PENDING",
        "READY_FOR_REVIEW",
        "FILING_SUBMITTED",
        "APPROVED_BY_STATE",
        "EIN_RECEIVED",
        "COMPLETED",
      ];
  return candidates.filter((to) => canTransition(from, to, context));
}
