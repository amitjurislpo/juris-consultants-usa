"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashIcon, type DashIconName } from "./icons";

export interface DashNavItem {
  href: string;
  icon: DashIconName;
  label: string;
  /** Count badge (omitted when 0 or undefined). */
  badge?: number;
  /** Amber badge, for things that need action. */
  warn?: boolean;
  /** Only highlight on this exact path (for the Dashboard item). */
  exact?: boolean;
}

export interface DashNavGroup {
  label: string;
  color: string;
  items: DashNavItem[];
}

function isActive(pathname: string, item: DashNavItem): boolean {
  if (pathname === item.href) return true;
  if (item.exact) return false;
  return pathname.startsWith(`${item.href}/`);
}

/** Sidebar menu (also the bottom bar on phones). Marks the current page. */
export function DashNav({ groups }: { groups: DashNavGroup[] }) {
  const pathname = usePathname() ?? "";
  return (
    <nav aria-label="Main" className="d-nav">
      {groups.map((group) => (
        <div key={group.label} style={{ display: "contents" }}>
          <div className="d-sec" style={{ ["--sc" as string]: group.color }}>
            {group.label}
          </div>
          {group.items.map((item) => {
            const on = isActive(pathname, item);
            return (
              <Link
                aria-current={on ? "page" : undefined}
                className={on ? "on" : undefined}
                href={item.href}
                key={item.href + item.label}
              >
                <span className="d-it">
                  <DashIcon name={item.icon} />
                </span>
                <span>{item.label}</span>
                {item.badge ? (
                  <em className={`d-pill${item.warn ? " w" : ""}`}>
                    {item.badge}
                  </em>
                ) : null}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
