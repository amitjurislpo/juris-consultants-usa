import { prisma } from "@juris/db";
import type { ReactNode } from "react";
import { requireAdmin } from "../../src/lib/guard";
import { navFor } from "../../src/lib/nav";
import { getAdminTimeZone } from "../../src/lib/timezone";
import { AdminNav } from "./admin-nav";
import { ShellFrame } from "./shell-frame";
import { signOutAction } from "./sign-out";
import { SignOutButton } from "./sign-out-button";
import { TimeZoneSwitcher } from "./timezone-switcher";
import { UserMenu } from "./user-menu";

export default async function PanelLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const admin = await requireAdmin();
  const items = navFor(admin.role);
  const [profile, timeZone] = await Promise.all([
    prisma.user.findUnique({
      where: { id: admin.id },
      select: { name: true, image: true },
    }),
    getAdminTimeZone(),
  ]);
  const displayName = profile?.name?.trim() || "Admin user";

  return (
    <ShellFrame
      sidebar={
        <>
          <div className="brand">Juris Admin</div>
          <AdminNav items={items} />
        </>
      }
      topbar={
        <>
          <span className="topbar-brand">Juris Admin</span>
          <span className="topbar-spacer" />
          <TimeZoneSwitcher current={timeZone} />
          <UserMenu
            image={profile?.image ?? null}
            name={displayName}
            signOut={<SignOutButton action={signOutAction} />}
          />
        </>
      }
    >
      {children}
    </ShellFrame>
  );
}
