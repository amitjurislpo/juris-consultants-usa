"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { Avatar } from "./editable-avatar";

export const ACCOUNT_LINKS = [
  { href: "/account/dashboard", label: "Dashboard" },
  { href: "/account/orders", label: "My Orders" },
  { href: "/account/documents", label: "Documents" },
  { href: "/account/payments", label: "Payments" },
  { href: "/account/profile", label: "Profile" },
] as const;

/** Avatar button in the top bar with the account dropdown (pages, photo, log out). */
export function TopUser({
  name,
  business,
  image,
  logOut,
}: {
  name: string;
  business: string | null;
  image: string | null;
  /** The log-out button, rendered by the server layout. */
  logOut: ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="pt-user">
      <button
        aria-expanded={open}
        aria-haspopup="menu"
        className="pt-user-button"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <Avatar image={image} name={name} size={32} />
        <span className="pt-user-text">
          <strong>{name}</strong>
          {business ? <small>{business}</small> : null}
        </span>
        <svg
          aria-hidden="true"
          className="pt-chevron"
          data-open={open ? "true" : "false"}
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
      {open ? (
        <>
          <button
            aria-label="Close account menu"
            className="pt-user-scrim"
            onClick={() => setOpen(false)}
            type="button"
          />
          <div className="pt-user-panel" role="menu">
            {ACCOUNT_LINKS.map((link) => (
              <Link
                className="pt-user-item"
                href={link.href}
                key={link.href}
                onClick={() => setOpen(false)}
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
  );
}
