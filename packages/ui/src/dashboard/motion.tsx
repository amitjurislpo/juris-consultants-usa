"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

/** Plays the dashboard animations once the page is shown: lines draw, donuts fill, bars grow,
 *  progress fills and numbers count up. Static (final state) for reduced motion. */
export function DashMotion({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  // Run again after every page change (the layout stays mounted while pages swap).
  const pathname = usePathname();
  const search = useSearchParams().toString();
  useEffect(() => {
    // The page scrolls inside .jd, so a new page starts at the top.
    ref.current?.closest(".jd")?.scrollTo({ top: 0 });
    // The page content hydrates a moment after this wrapper. Changing it before that would
    // break hydration, so we wait for <DashPlay /> (rendered by the page) or a short timeout.
    let cleanup: (() => void) | undefined;
    let started = false;
    const play = () => {
      if (started) return;
      started = true;
      const root = ref.current;
      if (!root) return undefined;
      const calm = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const lines = root.querySelectorAll<SVGGeometryElement>(".d-draw");
      lines.forEach((p) => {
        if (p.dataset.len) {
          const length = p.getTotalLength();
          p.style.strokeDasharray = String(length);
          p.style.strokeDashoffset = String(length);
          p.dataset.to = "0";
        }
      });
      const finish = () => {
        lines.forEach((p) => {
          p.style.strokeDashoffset = p.dataset.to ?? "0";
        });
        root.querySelectorAll<HTMLElement>("[data-w]").forEach((e) => {
          e.style.width = `${e.dataset.w}%`;
        });
        root.querySelectorAll<SVGElement>(".d-grow-b").forEach((e) => {
          e.style.transform = "scaleY(1)";
        });
        root.querySelectorAll<SVGElement>(".d-fadein").forEach((e) => {
          e.style.opacity = "1";
        });
      };
      const counters = root.querySelectorAll<HTMLElement>("[data-count]");
      const text = (el: HTMLElement, v: number) => {
        const money = el.dataset.m === "1";
        el.textContent = `${money ? "$" : ""}${v.toLocaleString("en-US")}${el.dataset.suf ?? ""}`;
      };
      if (calm) {
        finish();
        counters.forEach((el) => text(el, Number(el.dataset.count)));
        return undefined;
      }
      let frame = 0;
      const start = performance.now();
      const tick = (now: number) => {
        const k = Math.min(1, (now - start) / 1300);
        const e = 1 - Math.pow(1 - k, 3);
        counters.forEach((el) =>
          text(el, Math.round(Number(el.dataset.count) * e)),
        );
        if (k < 1) frame = requestAnimationFrame(tick);
      };
      const outer = requestAnimationFrame(() => {
        requestAnimationFrame(finish);
        frame = requestAnimationFrame(tick);
      });
      return () => {
        cancelAnimationFrame(outer);
        cancelAnimationFrame(frame);
      };
    };
    const onPlay = () => {
      cleanup = play();
    };
    window.addEventListener("dash:play", onPlay);
    const timer = window.setTimeout(onPlay, 1500);
    return () => {
      window.removeEventListener("dash:play", onPlay);
      window.clearTimeout(timer);
      cleanup?.();
    };
  }, [pathname, search]);
  return <div ref={ref}>{children}</div>;
}

/** Put this at the end of a page. It tells <DashMotion /> the page is hydrated, so the animations can start. */
export function DashPlay() {
  useEffect(() => {
    window.dispatchEvent(new Event("dash:play"));
  }, []);
  return null;
}
