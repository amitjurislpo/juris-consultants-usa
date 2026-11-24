import { hasPermission, type Permission, type UserRole } from "@juris/core";
import { prisma } from "@juris/db";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";
import { auth } from "../../auth";

export interface AdminUser {
  id: string;
  role: UserRole;
  email: string;
}

/** Signed-in, active SUPER_ADMIN or STAFF, read fresh from the database. Redirects to /login otherwise. */
export const requireAdmin = cache(async (): Promise<AdminUser> => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, role: true, email: true, status: true },
  });
  if (
    !user ||
    user.status !== "ACTIVE" ||
    (user.role !== "SUPER_ADMIN" && user.role !== "STAFF")
  ) {
    redirect("/login");
  }
  return { id: user.id, role: user.role, email: user.email };
});

/** Call first in every page, server action and route handler. Shows a 404 when the role lacks the permission. */
export async function requirePermission(
  permission: Permission,
): Promise<AdminUser> {
  const user = await requireAdmin();
  if (!hasPermission(user.role, permission)) notFound();
  return user;
}

/**
 * Kept so sensitive pages and actions still read the same way. Signing in already needs the password
 * and an emailed code, so there is no second password/code prompt after login.
 * Call after requirePermission; the role check there is what protects these areas.
 */
export async function requireRecentAuth(_returnTo = "/"): Promise<AdminUser> {
  return requireAdmin();
}
