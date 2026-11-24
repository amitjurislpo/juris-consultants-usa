import { prisma } from "@juris/db";
import { CUSTOMER_DEFAULT_TIME_ZONE, isPortalTimeZone } from "./datetime";

/** The zone this customer picked for their portal (UTC until they choose one). */
export async function customerTimeZone(userId: string): Promise<string> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { timezone: true },
  });
  return isPortalTimeZone(user?.timezone)
    ? user.timezone
    : CUSTOMER_DEFAULT_TIME_ZONE;
}

/** Company details can be changed by the customer until the state filing is submitted. */
const LOCKED_STATUSES = [
  "FILING_SUBMITTED",
  "APPROVED_BY_STATE",
  "EIN_RECEIVED",
  "COMPLETED",
] as const;

export async function companyIsEditable(companyId: string): Promise<boolean> {
  const locked = await prisma.order.count({
    where: { companyId, status: { in: [...LOCKED_STATUSES] } },
  });
  return locked === 0;
}
