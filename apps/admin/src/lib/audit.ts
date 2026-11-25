import { prisma, type Prisma } from "@juris/db";

export interface AuditEntry {
  actorId: string | null;
  action: string;
  entity: string;
  entityId: string;
  /** State before the change (stored in the `before` column). */
  before?: Prisma.InputJsonObject | null;
  /** State after the change, or extra details (stored in the `after` column). */
  meta?: Prisma.InputJsonObject;
}

/** Appends one AuditLog row. `before` and `meta` go to the `before` and `after` columns. */
export async function writeAudit({
  actorId,
  action,
  entity,
  entityId,
  before,
  meta,
}: AuditEntry): Promise<void> {
  await prisma.auditLog.create({
    data: {
      actorId,
      action,
      entity,
      entityId,
      before: before ?? undefined,
      after: meta,
    },
  });
}
