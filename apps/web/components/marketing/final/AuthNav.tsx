"use client";

import { useEffect, useRef, useState } from "react";

type SessionUser = { name?: string | null; email?: string | null };

/** Ends the Auth.js session (CSRF-protected POST), then returns to the home page. */
async function logout() {
  try {
    const { csrfToken } = (await fetch("/api/auth/csrf").then((r) =>
      r.json(),
    )) as { csrfToken: string };
    await fetch("/api/auth/signout", {
      body: new URLSearchParams({ callbackUrl: "/", csrfToken }),
      credentials: "same-origin",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      method: "POST",
    });
  } finally {
    window.location.href = "/";
  }
}

/* Shows "Log in" for visitors and "My account" for signed-in customers.
   Fetches the session in the browser so marketing pages stay static. */
export function AuthNav({ mobile = false }: { mobile?: boolean }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

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
      <>
        <a href="/account">My account</a>
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            void logout();
          }}
        >
          Logout
        </a>
      </>
    ) : (
      <a href="/login">Log in</a>
    );
  }

  const initial = (user?.name || user?.email || "?").trim()[0]?.toUpperCase();
  return user ? (
    <div className="acct-menu" ref={box}>
      <button
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="My account"
        className="btn btn-primary btn-sm btn-login"
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        <span aria-hidden="true" className="av">
          {initial}
        </span>
        <span className="lbl">My account</span>
      </button>
      {open ? (
        <div className="acct-pop" role="menu">
          <a href="/account" role="menuitem">
            My account
          </a>
          <button onClick={() => void logout()} role="menuitem" type="button">
            Logout
          </button>
        </div>
      ) : null}
    </div>
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
