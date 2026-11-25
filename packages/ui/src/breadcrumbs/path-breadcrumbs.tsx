"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type LabelOverrides = {
  labels: Record<string, string>;
  set: (href: string, label: string | null) => void;
};

const OverrideContext = createContext<LabelOverrides>({
  labels: {},
  set: () => undefined,
});

/**
 * Wrap a layout in this so detail pages can show a real name in the trail
 * (for example "Order #2TQS2U4X" instead of "Order details") with <CrumbLabel />.
 */
export function CrumbLabelProvider({ children }: { children: ReactNode }) {
  const [labels, setLabels] = useState<Record<string, string>>({});
  // Stable setter: pages call it from an effect, so its identity must not change.
  const set = useCallback((href: string, label: string | null) => {
    setLabels((current) => {
      if (label === null) {
        if (!(href in current)) return current;
        const next = { ...current };
        delete next[href];
        return next;
      }
      return current[href] === label ? current : { ...current, [href]: label };
    });
  }, []);
  const value = useMemo<LabelOverrides>(() => ({ labels, set }), [labels, set]);
  return (
    <OverrideContext.Provider value={value}>
      {children}
    </OverrideContext.Provider>
  );
}

/** Put on a detail page: names the crumb for `href` (its own path or a parent path). */
export function CrumbLabel({ href, label }: { href: string; label: string }) {
  const { set } = useContext(OverrideContext);
  useEffect(() => {
    set(href, label);
    return () => set(href, null);
  }, [href, label, set]);
  return null;
}

export type PathCrumb = { label: string; href: string };

export type PathBreadcrumbsProps = {
  /** First crumbs, e.g. Home › My account. */
  root: PathCrumb[];
  /**
   * Names for paths. Exact path wins ("/orders"); "/orders/*" names any single
   * segment under /orders (detail pages). Unlisted segments are title-cased.
   */
  labels?: Record<string, string>;
  /** Paths without a page of their own, left out of the trail. */
  skip?: string[];
  /** Paths where no trail is shown (e.g. the home page). */
  hideOn?: string[];
  /** Adds BreadcrumbList structured data using this site origin (public pages only). */
  jsonLdOrigin?: string;
  className?: string;
};

const escapeRegExp = (text: string) =>
  text.replace(/[.*+?^${}()|[\]\\]/g, (c) => "\\" + c);

function labelFor(
  labels: Record<string, string>,
  path: string,
): string | undefined {
  if (labels[path]) return labels[path];
  for (const [pattern, label] of Object.entries(labels)) {
    if (!pattern.includes("*")) continue;
    const source = pattern.split("*").map(escapeRegExp).join("[^/]+");
    if (new RegExp(`^${source}$`).test(path)) return label;
  }
  return undefined;
}

function titleCase(segment: string): string {
  return decodeURIComponent(segment)
    .replace(/[-_]+/g, " ")
    .replace(/^./, (c) => c.toUpperCase());
}

export function buildPathCrumbs(
  pathname: string,
  { root, labels = {}, skip = [], hideOn = [] }: PathBreadcrumbsProps,
  overrides: Record<string, string> = {},
): { label: string; href: string; current: boolean }[] | null {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (hideOn.includes(path)) return null;
  const segments = path.split("/").filter(Boolean);
  const trail: { label: string; href: string }[] = [...root];
  let acc = "";
  for (const segment of segments) {
    acc += `/${segment}`;
    if (skip.includes(acc)) continue;
    trail.push({
      label: overrides[acc] ?? labelFor(labels, acc) ?? titleCase(segment),
      href: acc,
    });
  }
  // The current page may already be the last root crumb (e.g. the dashboard).
  const deduped = trail.filter(
    (crumb, i) => i === trail.length - 1 || crumb.href !== path,
  );
  return deduped.map((crumb, i) => ({
    ...crumb,
    current: i === deduped.length - 1,
  }));
}

/** Breadcrumbs that follow the current URL. One component for the website, customer portal and admin panel. */
export function PathBreadcrumbs(props: PathBreadcrumbsProps) {
  const pathname = usePathname() ?? "/";
  const { labels: overrides } = useContext(OverrideContext);
  const crumbs = buildPathCrumbs(pathname, props, overrides);
  if (!crumbs || crumbs.length === 0) return null;
  const origin = props.jsonLdOrigin?.replace(/\/$/, "");
  const jsonLd = origin
    ? JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.label,
          item: `${origin}${c.href === "/" ? "" : c.href}`,
        })),
      }).replace(/</g, "\\u003c")
    : null;
  return (
    <nav
      aria-label="Breadcrumb"
      className={`jbc${props.className ? ` ${props.className}` : ""}`}
    >
      <ol>
        {crumbs.map((crumb) => (
          <li key={crumb.href}>
            {crumb.current ? (
              <span aria-current="page">{crumb.label}</span>
            ) : (
              <a href={crumb.href}>{crumb.label}</a>
            )}
          </li>
        ))}
      </ol>
      {jsonLd ? (
        <script
          dangerouslySetInnerHTML={{ __html: jsonLd }}
          type="application/ld+json"
        />
      ) : null}
    </nav>
  );
}
