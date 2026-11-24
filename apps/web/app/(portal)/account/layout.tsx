import { prisma } from "@juris/db";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { auth } from "../../../auth";
import { displayName } from "../../../src/lib/portal";
import { logOutAction } from "./actions";
import { LogoutButton } from "./logout-button";
import "./portal.css";
import { PortalShell } from "./portal-shell";

export const metadata: Metadata = {
  title: "My account | Juris Consultants USA",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

/**
 * The customer portal frame. Standard customer-dashboard approach: it lives in the website app
 * (customers never touch the admin panel), needs a signed-in CUSTOMER, and every page below only
 * reads rows that belong to that customer.
 */
export default async function PortalLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const session = await auth().catch(() => null);
  if (!session?.user?.id || session.user.role !== "CUSTOMER") {
    redirect("/login?next=/account");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      email: true,
      image: true,
      companies: {
        orderBy: { createdAt: "asc" },
        take: 1,
        select: { name: true },
      },
    },
  });
  if (!user) redirect("/login?next=/account");

  return (
    <PortalShell
      business={user.companies[0]?.name ?? null}
      image={user.image}
      logOut={<LogoutButton action={logOutAction} />}
      name={displayName(user.name, user.email)}
    >
      {children}
    </PortalShell>
  );
}
