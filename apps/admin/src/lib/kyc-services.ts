import {
  ConsoleEmailAdapter,
  ResendEmailAdapter,
  storageFromEnv,
  type EmailAdapter,
  type StorageAdapter,
} from "@juris/core";
import { prisma } from "@juris/db";

export function getStorage(): StorageAdapter {
  const storage = storageFromEnv(process.env);
  if (!storage) {
    throw new Error(
      "No file storage is configured (set BLOB_READ_WRITE_TOKEN, or STORAGE_LOCAL_DIR and STORAGE_SIGNING_SECRET for local testing)",
    );
  }
  return storage;
}

function getEmail(): EmailAdapter {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.AUTH_EMAIL_FROM;
  if (apiKey && from) return new ResendEmailAdapter({ apiKey, from });
  if (process.env.NODE_ENV === "development") return new ConsoleEmailAdapter();
  throw new Error("RESEND_API_KEY and AUTH_EMAIL_FROM are not set");
}

/** Sends one customer email and records it in EmailLog. A failed send is logged, never thrown. */
export async function sendCustomerEmail(input: {
  to: string;
  template: string;
  orderId: string;
  subject: string;
  text: string;
}): Promise<boolean> {
  let sent = false;
  try {
    await getEmail().send({
      to: input.to,
      subject: input.subject,
      text: input.text,
    });
    sent = true;
  } catch (error) {
    console.error("Customer email failed", input.template, error);
  }
  await prisma.emailLog.create({
    data: {
      to: input.to,
      template: input.template,
      orderId: input.orderId,
      status: sent ? "SENT" : "FAILED",
    },
  });
  return sent;
}
