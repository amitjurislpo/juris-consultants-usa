-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "leadId" TEXT,
ADD COLUMN     "userId" TEXT,
ALTER COLUMN "orderId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "assignedToId" TEXT,
ADD COLUMN     "detailsSubmittedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "mfaSecret";

-- CreateTable
CREATE TABLE "OrderStatusChange" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "fromStatus" "OrderStatus",
    "toStatus" "OrderStatus" NOT NULL,
    "reason" TEXT,
    "actorId" TEXT,
    "at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderStatusChange_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OrderStatusChange_orderId_at_idx" ON "OrderStatusChange"("orderId", "at");

-- CreateIndex
CREATE INDEX "OrderStatusChange_toStatus_at_idx" ON "OrderStatusChange"("toStatus", "at");

-- CreateIndex
CREATE INDEX "Note_userId_createdAt_idx" ON "Note"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "Note_leadId_createdAt_idx" ON "Note"("leadId", "createdAt");

-- CreateIndex
CREATE INDEX "Order_assignedToId_idx" ON "Order"("assignedToId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderStatusChange" ADD CONSTRAINT "OrderStatusChange_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderStatusChange" ADD CONSTRAINT "OrderStatusChange_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;


-- Data: notes on leads and customers used to be stored in AuditLog; move them to Note.
INSERT INTO "Note" ("id", "leadId", "authorId", "body", "createdAt")
SELECT 'm' || md5(a."id" || 'lead'), a."entityId", a."actorId", a."after"->>'note', a."at"
FROM "AuditLog" a
WHERE a."action" = 'LEAD_CONTACTED' AND a."actorId" IS NOT NULL AND a."after"->>'note' IS NOT NULL
  AND EXISTS (SELECT 1 FROM "Lead" l WHERE l."id" = a."entityId")
  AND EXISTS (SELECT 1 FROM "User" u WHERE u."id" = a."actorId");

INSERT INTO "Note" ("id", "userId", "authorId", "body", "createdAt")
SELECT 'm' || md5(a."id" || 'cust'), a."entityId", a."actorId", a."after"->>'note', a."at"
FROM "AuditLog" a
WHERE a."action" = 'CUSTOMER_NOTE' AND a."actorId" IS NOT NULL AND a."after"->>'note' IS NOT NULL
  AND EXISTS (SELECT 1 FROM "User" c WHERE c."id" = a."entityId")
  AND EXISTS (SELECT 1 FROM "User" u WHERE u."id" = a."actorId");

-- Data: orders whose company already has members count as "details submitted".
UPDATE "Order" o SET "detailsSubmittedAt" = o."updatedAt"
WHERE o."companyId" IS NOT NULL
  AND EXISTS (SELECT 1 FROM "Member" m WHERE m."companyId" = o."companyId");
