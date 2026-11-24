import {
  ConsoleEmailAdapter,
  ResendEmailAdapter,
  type EmailAdapter,
} from "@juris/core";
import { prisma } from "@juris/db";
import type { StatusEmail } from "./orders-status";

function emailAdapter(): EmailAdapter {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.AUTH_EMAIL_FROM;
  if (apiKey && from) return new ResendEmailAdapter({ apiKey, from });
  if (process.env.NODE_ENV === "development") return new ConsoleEmailAdapter();
  throw new Error("RESEND_API_KEY and AUTH_EMAIL_FROM are required");
}

/**
 * Queues the email in EmailLog, sends it through the EmailAdapter and records
 * the result. Never throws: a failed email must not undo a status change, and
 * the FAILED row shows in the order timeline.
 */
export async function sendOrderEmail(
  orderId: string,
  to: string,
  email: StatusEmail,
): Promise<void> {
  const log = await prisma.emailLog.create({
    data: { to, template: email.template, orderId, status: "QUEUED" },
  });
  let status: "SENT" | "FAILED" = "SENT";
  try {
    await emailAdapter().send({
      to,
      subject: email.subject,
      text: email.text,
    });
  } catch {
    status = "FAILED";
  }
  await prisma.emailLog.update({ where: { id: log.id }, data: { status } });
}
