import { faqFlipCardsHtml, type FaqItem, type FaqProps } from "@juris/ui/faq";
import { generalFaqs, faqPageExtras } from "./general";

export { generalFaqs, faqPageExtras };

/** Questions for the /faq page. */
export const faqPageItems: FaqItem[] = [...generalFaqs, ...faqPageExtras];

/** Marker used inside the generated marketing HTML: <!--FAQ:home--> */
export const FAQ_MARKER = /<!--FAQ:([a-z]+)-->/;

/**
 * Where each FAQ is used (one typed place per page or section):
 * - home: full variant
 * - pricing, services: compact
 * - service: compact, sits in the column of a service page (title from the page's own heading)
 */
function propsFor(key: string, pageTitle: string): FaqProps | null {
  switch (key) {
    case "home":
      return { items: generalFaqs, variant: "full" };
    case "pricing":
      return {
        items: generalFaqs,
        variant: "compact",
        title: "Pricing:",
        titleAccent: "FAQ",
      };
    case "services":
      return {
        items: generalFaqs,
        variant: "compact",
        title: "Services:",
        titleAccent: "FAQ",
      };
    case "service":
      return {
        items: generalFaqs,
        variant: "compact",
        title: pageTitle ? `${pageTitle}:` : "Questions about this service:",
        titleAccent: "FAQ",
        subtitle: "Questions about this service. Tap a card to see the answer.",
        embedded: true,
      };
    default:
      return null;
  }
}

function plainText(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .trim();
}

/** Replaces the FAQ marker in a generated page with the shared flip-card FAQ markup. */
export function expandFaqMarker(html: string): string {
  const match = FAQ_MARKER.exec(html);
  if (!match) return html;
  const h1 = /<h1[^>]*>([\s\S]*?)<\/h1>/.exec(html);
  const props = propsFor(match[1] ?? "", h1 ? plainText(h1[1] ?? "") : "");
  return props ? html.replace(FAQ_MARKER, faqFlipCardsHtml(props)) : html;
}
