import { formatValue } from "./orders-format";
import { STATUS_LABELS, isOrderStatus } from "./orders-status";

export interface TimelineAudit {
  at: Date;
  action: string;
  actorEmail: string | null;
  after: unknown;
}

export interface TimelineEmail {
  at: Date;
  template: string;
  status: "QUEUED" | "SENT" | "FAILED";
}

export interface TimelineEntry {
  at: Date;
  title: string;
  detail: string;
}

const ACTION_TITLES: Record<string, string> = {
  "order.status_changed": "Status changed",
  "order.note_added": "Internal note added",
};

function statusName(value: unknown): string {
  return isOrderStatus(value) ? STATUS_LABELS[value] : formatValue(value);
}

function auditDetail(entry: TimelineAudit): string {
  const meta =
    entry.after && typeof entry.after === "object"
      ? (entry.after as Record<string, unknown>)
      : {};
  const parts: string[] = [];
  if (entry.action === "order.status_changed") {
    parts.push(`${statusName(meta.from)} to ${statusName(meta.to)}`);
    if (typeof meta.reason === "string" && meta.reason) {
      parts.push(`Reason: ${meta.reason}`);
    }
  }
  parts.push(`by ${entry.actorEmail ?? "system"}`);
  return parts.join(". ");
}

/** Merges order dates, audit rows and emails into one list, newest first. */
export function buildTimeline(input: {
  createdAt: Date;
  paidAt: Date | null;
  audit: readonly TimelineAudit[];
  emails: readonly TimelineEmail[];
}): TimelineEntry[] {
  const entries: TimelineEntry[] = [
    { at: input.createdAt, title: "Order created", detail: "" },
  ];
  if (input.paidAt) {
    entries.push({
      at: input.paidAt,
      title: "Payment confirmed",
      detail: "Confirmed by the payment provider",
    });
  }
  for (const row of input.audit) {
    entries.push({
      at: row.at,
      title: ACTION_TITLES[row.action] ?? row.action,
      detail: auditDetail(row),
    });
  }
  for (const mail of input.emails) {
    entries.push({
      at: mail.at,
      title: `Email to customer: ${mail.template}`,
      detail: mail.status.toLowerCase(),
    });
  }
  return entries.sort((a, b) => b.at.getTime() - a.at.getTime());
}
