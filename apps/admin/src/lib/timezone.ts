import { prisma } from "@juris/db";
import { cookies } from "next/headers";
import { cache } from "react";
import { DEFAULT_TIME_ZONE, isSupportedTimeZone } from "./datetime";
import { requireAdmin } from "./guard";

export const TIME_ZONE_COOKIE = "admin_tz";

/**
 * The zone every time in the panel is shown in. Order: the zone picked in this browser session,
 * then the admin's saved default, then IST.
 */
export const getAdminTimeZone = cache(async (): Promise<string> => {
  const picked = (await cookies()).get(TIME_ZONE_COOKIE)?.value;
  if (isSupportedTimeZone(picked)) return picked;
  const admin = await requireAdmin();
  const user = await prisma.user.findUnique({
    where: { id: admin.id },
    select: { timezone: true },
  });
  return isSupportedTimeZone(user?.timezone)
    ? user.timezone
    : DEFAULT_TIME_ZONE;
});
