import type { Prisma } from "@juris/db";
import { z } from "zod";

export const KYC_STATUSES = ["PENDING", "APPROVED", "REJECTED"] as const;
export type KycStatusValue = (typeof KYC_STATUSES)[number];

export const KYC_BADGE = {
  PENDING: "warning",
  APPROVED: "success",
  REJECTED: "danger",
} as const;

export interface KycFilters {
  status: KycStatusValue | "ALL";
  docType: string;
}

type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

/** Reads ?status= and ?docType=. The queue defaults to documents waiting for review. */
export function parseKycFilters(params: SearchParams): KycFilters {
  const status = first(params.status);
  return {
    status:
      status === "ALL"
        ? "ALL"
        : (KYC_STATUSES.find((value) => value === status) ?? "PENDING"),
    docType: first(params.docType).trim().slice(0, 80),
  };
}

export function kycWhere({
  status,
  docType,
}: KycFilters): Prisma.KycDocumentWhereInput {
  return {
    ...(status === "ALL" ? {} : { status }),
    ...(docType ? { docType } : {}),
  };
}

export const rejectSchema = z.object({
  id: z.string().min(1).max(40),
  reason: z
    .string()
    .trim()
    .min(5, "Write a reason of at least 5 characters.")
    .max(500, "Keep the reason under 500 characters."),
});

export const approveSchema = z.object({ id: z.string().min(1).max(40) });

const IMAGE_EXTENSIONS = new Set(["png", "jpg", "jpeg", "webp", "gif"]);

/** Decides how the review screen shows a stored file, from the extension of its key. */
export function previewKind(fileKey: string): "image" | "pdf" | "other" {
  let pathname = fileKey;
  try {
    pathname = new URL(fileKey).pathname;
  } catch {
    // Not a URL: the key itself is a path.
  }
  const extension = pathname.split(".").pop()?.toLowerCase() ?? "";
  if (IMAGE_EXTENSIONS.has(extension)) return "image";
  return extension === "pdf" ? "pdf" : "other";
}

export function orderRef(orderId: string): string {
  return orderId.slice(-8).toUpperCase();
}

export function rejectionEmail(input: {
  name: string | null;
  docLabel: string;
  orderId: string;
  reason: string;
}): { subject: string; text: string } {
  const greeting = input.name ? `Hello ${input.name},` : "Hello,";
  return {
    subject: `Action needed: please re-upload your ${input.docLabel}`,
    text: [
      greeting,
      "",
      `We could not accept your ${input.docLabel} for order ${orderRef(input.orderId)}.`,
      "",
      `Reason: ${input.reason}`,
      "",
      "Please sign in to your dashboard, open KYC & Documents and upload a corrected file.",
      "",
      "Juris Consultants USA",
    ].join("\n"),
  };
}
