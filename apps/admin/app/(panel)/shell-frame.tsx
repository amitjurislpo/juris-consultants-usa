"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";

/** Copies each column heading onto its cells so a table can become stacked cards on a phone. */
function labelTables(root: ParentNode) {
  root.querySelectorAll<HTMLTableElement>("table.ui-table").forEach((table) => {
    const heads = Array.from(table.querySelectorAll("thead th")).map(
      (th) => th.textContent?.trim() ?? "",
    );
    if (heads.length === 0) return;
    table.classList.add("stack-sm");
    table.querySelectorAll("tbody tr").forEach((row) => {
      Array.from(row.children).forEach((cell, index) => {
        if (
          cell.tagName === "TD" &&
          !cell.hasAttribute("data-label") &&
          !cell.hasAttribute("colspan")
        ) {
          cell.setAttribute("data-label", heads[index] ?? "");
        }
      });
    });
  });
}

/**
 * The page frame: sidebar on wide screens, a slide-in menu opened by a button on tablets and phones.
 * Everything inside is rendered on the server; this only keeps the open/closed state.
 */
export function ShellFrame({
  sidebar,
  topbar,
  children,
}: {
  sidebar: ReactNode;
  topbar: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;
    labelTables(main);
    const observer = new MutationObserver(() => labelTables(main));
    observer.observe(main, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <div className="shell" data-nav-open={open ? "true" : "false"}>
      <aside className="shell-side" id="admin-menu">
        {sidebar}
      </aside>
      <button
        aria-label="Close menu"
        className="shell-scrim"
        onClick={() => setOpen(false)}
        tabIndex={open ? 0 : -1}
        type="button"
      />
      <div className="shell-main">
        <header className="topbar">
          <button
            aria-controls="admin-menu"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="nav-toggle"
            onClick={() => setOpen((value) => !value)}
            type="button"
          >
            <span aria-hidden="true" className="nav-toggle-bars" />
          </button>
          {topbar}
        </header>
        <main className="content" ref={mainRef}>
          {children}
        </main>
      </div>
    </div>
  );
}
