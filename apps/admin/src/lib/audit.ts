import { prisma, type Prisma } from "@juris/db";

export interface AuditEntry {
  actorId: string | null;
  action: string;
  entity: string;
  entityId: string;
  meta?: Prisma.InputJsonObject;
}

/** Appends one AuditLog row. `meta` is stored in the row's `after` column. */
export async function writeAudit({
  actorId,
  action,
  entity,
  entityId,
  meta,
}: AuditEntry): Promise<void> {
  await prisma.auditLog.create({
    data: { actorId, action, entity, entityId, after: meta },
  });
}
