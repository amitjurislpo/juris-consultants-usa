"use client";

import { useEffect, useState } from "react";

type SessionUser = { name?: string | null; email?: string | null };

/* Shows "Log in" for visitors and "My account" for signed-in customers.
   Fetches the session in the browser so marketing pages stay static. */
export function AuthNav({ mobile = false }: { mobile?: boolean }) {
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    let alive = true;
    fetch("/api/auth/session", { credentials: "same-origin" })
      .then((r) => (r.ok ? r.json() : null))
      .then((s: { user?: SessionUser } | null) => {
        if (alive && s?.user) setUser(s.user);
      })
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, []);

  if (mobile) {
    return user ? (
      <a href="/account">My account</a>
    ) : (
      <a href="/login">Log in</a>
    );
  }

  const initial = (user?.name || user?.email || "?").trim()[0]?.toUpperCase();
  return user ? (
    <a
      aria-label="My account"
      className="btn btn-primary btn-sm btn-login"
      href="/account"
    >
      <span aria-hidden="true" className="av">
        {initial}
      </span>
      <span className="lbl">My account</span>
    </a>
  ) : (
    <a className="btn btn-primary btn-sm btn-login" href="/login">
      <svg
        aria-hidden="true"
        fill="none"
        height="16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="16"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
      </svg>
      <span className="lbl">Log in</span>
    </a>
  );
}
