"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { Avatar } from "./editable-avatar";

export const PORTAL_LINKS = [
  { href: "/account", label: "Profile" },
  { href: "/account/orders", label: "My Orders" },
  { href: "/account/documents", label: "Documents" },
  { href: "/account/payments", label: "Payments" },
] as const;

function isActive(pathname: string, href: string): boolean {
  return href === "/account"
    ? pathname === "/account"
    : pathname === href || pathname.startsWith(`${href}/`);
}

/** Left menu on wide screens; on tablets and phones it slides in from a menu button. */
export function PortalShell({
  name,
  business,
  image,
  logOut,
  children,
}: {
  name: string;
  business: string | null;
  image: string | null;
  /** The log-out form, rendered by the server layout. */
  logOut: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
    setUserOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen && !userOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setUserOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, userOpen]);

  return (
    <div className="pt-shell" data-menu-open={menuOpen ? "true" : "false"}>
      <aside className="pt-side" id="portal-menu">
        <Link className="pt-brand" href="/">
          Juris Consultants <span>USA</span>
        </Link>
        <nav aria-label="Account" className="pt-nav">
          {PORTAL_LINKS.map((link) => (
            <Link
              aria-current={isActive(pathname, link.href) ? "page" : undefined}
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link className="pt-nav-extra" href="/start?flow=start">
          Start a new order
        </Link>
      </aside>
      <button
        aria-label="Close menu"
        className="pt-scrim"
        onClick={() => setMenuOpen(false)}
        tabIndex={menuOpen ? 0 : -1}
        type="button"
      />
      <div className="pt-main">
        <header className="pt-top">
          <button
            aria-controls="portal-menu"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="pt-menu-toggle"
            onClick={() => setMenuOpen((value) => !value)}
            type="button"
          >
            <span aria-hidden="true" className="pt-bars" />
          </button>
          <Link className="pt-top-brand" href="/">
            Juris Consultants <span>USA</span>
          </Link>
          <span className="pt-spacer" />
          <div className="pt-user">
            <button
              aria-expanded={userOpen}
              aria-haspopup="menu"
              className="pt-user-button"
              onClick={() => setUserOpen((value) => !value)}
              type="button"
            >
              <Avatar image={image} name={name} size={38} />
              <span className="pt-user-text">
                <strong>{name}</strong>
                {business ? <small>{business}</small> : null}
              </span>
              <svg
                aria-hidden="true"
                className="pt-chevron"
                data-open={userOpen ? "true" : "false"}
                fill="none"
                height="16"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="16"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            {userOpen ? (
              <>
                <button
                  aria-label="Close account menu"
                  className="pt-user-scrim"
                  onClick={() => setUserOpen(false)}
                  type="button"
                />
                <div className="pt-user-panel" role="menu">
                  {PORTAL_LINKS.map((link) => (
                    <Link
                      className="pt-user-item"
                      href={link.href}
                      key={link.href}
                      onClick={() => setUserOpen(false)}
                      role="menuitem"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="pt-user-logout">{logOut}</div>
                </div>
              </>
            ) : null}
          </div>
        </header>
        <main className="pt-content">{children}</main>
      </div>
    </div>
  );
}
