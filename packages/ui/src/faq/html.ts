/**
 * Shared "Flip cards" FAQ markup (approved design: docs/design/final/faq).
 * One builder is used everywhere: the React component renders it, and the
 * server-rendered marketing pages inline it, so every FAQ looks and behaves
 * the same. Questions and answers are in the server HTML (both faces), so
 * search engines can read them.
 *
 * `question`, `short` and the titles are plain text and get escaped.
 * `answer` is trusted HTML written by us (it may contain links).
 */

export type FaqItem = {
  question: string;
  /** Bold headline on the answer face, e.g. "~7 business days". */
  short: string;
  /** Trusted HTML. */
  answer: string;
  /** True while the wording still needs confirmation (not shown to visitors). */
  draft?: boolean;
};

export type FaqVariant = "full" | "compact";

export type FaqProps = {
  items: readonly FaqItem[];
  variant?: FaqVariant;
  /** Cards shown before "Show all". Default: all (full) or 4 (compact). */
  limit?: number;
  title?: string;
  titleAccent?: string;
  subtitle?: string;
  /** Inside a page column: no outer container padding. */
  embedded?: boolean;
  id?: string;
};

export const COMPACT_LIMIT = 4;

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&nbsp;": " ",
};

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Plain text of an answer (for structured data). */
export function answerText(answer: string): string {
  return answer
    .replace(/<[^>]*>/g, "")
    .replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (m) => ENTITIES[m] ?? m)
    .replace(/\s+/g, " ")
    .trim();
}

const FLIP_ICON =
  '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5"/></svg>';

export function faqVisibleCount(props: FaqProps): number {
  const total = props.items.length;
  const limit =
    props.limit ?? (props.variant === "compact" ? COMPACT_LIMIT : total);
  return Math.max(0, Math.min(limit, total));
}

/** FAQPage structured data (only the questions shown on the page). */
export function faqJsonLd(props: FaqProps): string {
  const shown = props.items.slice(0, faqVisibleCount(props));
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: shown.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: answerText(item.answer) },
    })),
  };
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function card(item: FaqItem, index: number, hidden: boolean): string {
  const q = escapeHtml(item.question);
  return (
    `<div class="jfaq-fc jfaq-rv${hidden ? " jfaq-hide" : ""}" style="--i:${index % 6}">` +
    `<div class="jfaq-fi">` +
    `<button type="button" class="jfaq-fa" aria-pressed="false" aria-label="${q}. Show answer">` +
    `<span class="jfaq-qi" aria-hidden="true">?</span><b>${q}</b>` +
    `<small>${FLIP_ICON} Tap to see the answer</small></button>` +
    `<div class="jfaq-fb" aria-hidden="true"><b>${escapeHtml(item.short)}</b>` +
    `<div class="jfaq-ans">${item.answer}</div>` +
    `<button type="button" class="jfaq-back" aria-pressed="true" aria-label="${q}. Hide answer">${FLIP_ICON} Tap to flip back</button>` +
    `</div></div></div>`
  );
}

export function faqFlipCardsHtml(props: FaqProps): string {
  const variant: FaqVariant = props.variant ?? "full";
  const visible = faqVisibleCount({ ...props, variant });
  const title = escapeHtml(props.title ?? "Questions founders");
  const accent = escapeHtml(props.titleAccent ?? (props.title ? "" : "ask us"));
  const subtitle = escapeHtml(
    props.subtitle ?? "Tap a card to see the answer.",
  );
  const classes = [
    "jfaq",
    `jfaq--${variant}`,
    props.embedded ? "jfaq--embedded" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const more =
    visible < props.items.length
      ? `<div class="jfaq-more"><button type="button" class="jfaq-btn jfaq-gh jfaq-showall">Show all ${props.items.length} questions</button></div>`
      : "";
  return (
    `<section class="${classes}" id="${escapeHtml(props.id ?? "faq")}">` +
    `<div class="jfaq-wrap">` +
    `<div class="jfaq-hdr jfaq-rv"><div><div class="jfaq-eyebrow">FAQ</div>` +
    `<h2 class="jfaq-ttl">${title}${accent ? ` <em>${accent}</em>` : ""}</h2>` +
    `<p class="jfaq-sub">${subtitle}</p></div></div>` +
    `<div class="jfaq-grid">${props.items
      .map((item, i) => card(item, i, i >= visible))
      .join("")}</div>${more}</div>` +
    `<script type="application/ld+json">${faqJsonLd({ ...props, variant })}</script>` +
    `</section>`
  );
}
