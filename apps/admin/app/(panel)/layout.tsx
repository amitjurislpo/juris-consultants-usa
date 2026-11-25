import { prisma } from "@juris/db";
import { CrumbLabelProvider, PathBreadcrumbs } from "@juris/ui";
import {
  DashShell,
  DashSystemOk,
  type DashNavGroup,
} from "@juris/ui/dashboard";
import type { ReactNode } from "react";
import { requireAdmin } from "../../src/lib/guard";
import { ADMIN_CRUMBS } from "../../src/lib/breadcrumbs";
import { loadNavBadges } from "../../src/lib/dashboard-data";
import { navGroupsFor } from "../../src/lib/nav";
import { getAdminTimeZone } from "../../src/lib/timezone";
import { signOutAction } from "./sign-out";
import { SignOutButton } from "./sign-out-button";
import { TableLabels } from "./table-labels";
import { TimeZoneSwitcher } from "./timezone-switcher";
import { UserMenu } from "./user-menu";

export default async function PanelLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const admin = await requireAdmin();
  const [profile, timeZone, badges] = await Promise.all([
    prisma.user.findUnique({
      where: { id: admin.id },
      select: { name: true, image: true },
    }),
    getAdminTimeZone(),
    loadNavBadges(),
  ]);
  const displayName = profile?.name?.trim() || "Admin user";

  const groups: DashNavGroup[] = navGroupsFor(admin.role).map((group) => ({
    label: group.label,
    color: group.color,
    items: group.items.map((item) => ({
      href: item.href,
      icon: item.icon,
      label: item.label,
      exact: item.exact,
      badge: item.badge ? badges[item.badge] : undefined,
      warn: item.badge === "kycWaiting",
    })),
  }));

  return (
    <CrumbLabelProvider>
      <DashShell
        brandSub="Admin panel"
        crumb={<PathBreadcrumbs {...ADMIN_CRUMBS} />}
        groups={groups}
        sideFooter={<DashSystemOk />}
        topRight={
          <>
            <TimeZoneSwitcher current={timeZone} />
            <UserMenu
              image={profile?.image ?? null}
              name={displayName}
              signOut={<SignOutButton action={signOutAction} />}
            />
          </>
        }
      >
        <TableLabels>{children}</TableLabels>
      </DashShell>
    </CrumbLabelProvider>
  );
}
