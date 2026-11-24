import { z } from "zod";
import { orderRef } from "./kyc";

export const MAX_DELIVERABLE_BYTES = 15 * 1024 * 1024;

const EXTENSIONS = {
  "application/pdf": "pdf",
  "image/png": "png",
  "image/jpeg": "jpg",
} as const;

export type DeliverableMime = keyof typeof EXTENSIONS;

export const deliverableSchema = z.object({
  orderId: z.string().min(1).max(40),
  type: z
    .string()
    .trim()
    .min(2, "Enter what this document is, for example EIN letter.")
    .max(80),
});

function startsWith(bytes: Uint8Array, signature: readonly number[]): boolean {
  return signature.every((value, index) => bytes[index] === value);
}

/** Checks the real file bytes, not just the name the browser sent. */
export function sniffMime(bytes: Uint8Array): DeliverableMime | null {
  if (startsWith(bytes, [0x25, 0x50, 0x44, 0x46])) return "application/pdf";
  if (startsWith(bytes, [0x89, 0x50, 0x4e, 0x47])) return "image/png";
  if (startsWith(bytes, [0xff, 0xd8, 0xff])) return "image/jpeg";
  return null;
}

export function validateDeliverableFile(
  size: number,
  bytes: Uint8Array,
): { error: string } | { mime: DeliverableMime } {
  if (size === 0) return { error: "Choose a file to upload." };
  if (size > MAX_DELIVERABLE_BYTES) {
    return { error: "The file is larger than 15 MB." };
  }
  const mime = sniffMime(bytes);
  if (!mime) return { error: "Only PDF, PNG or JPG files are allowed." };
  return { mime };
}

export function deliverableKey(
  orderId: string,
  uniqueId: string,
  mime: DeliverableMime,
): string {
  return `deliverables/${orderId}/${uniqueId}.${EXTENSIONS[mime]}`;
}

export function deliverableEmail(input: {
  name: string | null;
  type: string;
  orderId: string;
}): { subject: string; text: string } {
  return {
    subject: `Your ${input.type} is ready`,
    text: [
      input.name ? `Hello ${input.name},` : "Hello,",
      "",
      `Your ${input.type} for order ${orderRef(input.orderId)} is ready.`,
      "Sign in to your dashboard and open My documents to download it.",
      "",
      "Juris Consultants USA",
    ].join("\n"),
  };
}
