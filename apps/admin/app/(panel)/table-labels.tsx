"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

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

/** Wraps the page content and keeps its tables labelled, so they stack nicely on phones. */
export function TableLabels({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    labelTables(el);
    const observer = new MutationObserver(() => labelTables(el));
    observer.observe(el, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [pathname]);
  return <div ref={ref}>{children}</div>;
}
