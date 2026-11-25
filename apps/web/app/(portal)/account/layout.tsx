import { prisma } from "@juris/db";
import { DashPromo, DashShell, type DashNavGroup } from "@juris/ui/dashboard";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { auth } from "../../../auth";
import { loadShellInfo } from "../../../src/lib/dashboard-data";
import { displayName } from "../../../src/lib/portal";
import { logOutAction } from "./actions";
import { LogoutButton } from "./logout-button";
import "./portal.css";
import { CrumbLabelProvider, PathBreadcrumbs } from "@juris/ui";
import { PORTAL_CRUMBS } from "../../../content/breadcrumbs";
import { TopUser } from "./portal-chrome";

export const metadata: Metadata = {
  title: "My account | Juris Consultants USA",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

/** "Talk to my expert": WhatsApp when a number is configured, otherwise the contact page. */
function expertHref(): string {
  const digits = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(
    /\D/g,
    "",
  );
  return digits ? `https://wa.me/${digits}` : "/contacts";
}

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
    redirect("/login?next=/account/dashboard");
  }

  const [user, info] = await Promise.all([
    prisma.user.findUnique({
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
    }),
    loadShellInfo(session.user.id),
  ]);
  if (!user) redirect("/login?next=/account/dashboard");

  const name = displayName(user.name, user.email);
  const groups: DashNavGroup[] = [
    {
      label: "Overview",
      color: "#8B5CF6",
      items: [
        {
          href: "/account/dashboard",
          icon: "dash",
          label: "Dashboard",
          exact: true,
        },
      ],
    },
    {
      label: "My account",
      color: "#22D3EE",
      items: [
        {
          href: "/account/orders",
          icon: "orders",
          label: "My Orders",
          badge: info.needsAction,
          warn: true,
        },
        {
          href: "/account/documents",
          icon: "docs",
          label: "Documents",
          badge: info.documents,
        },
        { href: "/account/payments", icon: "pay", label: "Payments" },
        { href: "/account/profile", icon: "user", label: "Profile" },
      ],
    },
    {
      label: "Help",
      color: "#34D399",
      items: [{ href: expertHref(), icon: "chat", label: "Talk to my expert" }],
    },
  ];

  return (
    <CrumbLabelProvider>
      <DashShell
        brandSub="Customer portal"
        crumb={<PathBreadcrumbs {...PORTAL_CRUMBS} />}
        groups={groups}
        sideFooter={
          <>
            <DashPromo
              cta="Start now"
              href="/start?flow=start"
              text="Form another company, get an EIN or add a service."
              title="Start a new order"
            />
          </>
        }
        topRight={
          <TopUser
            business={user.companies[0]?.name ?? null}
            image={user.image}
            logOut={<LogoutButton action={logOutAction} />}
            name={name}
          />
        }
      >
        <div className="pt-content">{children}</div>
      </DashShell>
    </CrumbLabelProvider>
  );
}
