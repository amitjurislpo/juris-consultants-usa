import { faqFlipCardsHtml, faqJsonLd, type FaqItem } from "@juris/ui/faq";
import { describe, expect, it } from "vitest";
import { faqPageItems, generalFaqs } from "./index";

const items: FaqItem[] = [
  {
    question: 'Is "A" <b>ok</b>?',
    short: "Yes & yes",
    answer: 'Fine <a href="/x">link</a>.',
  },
  { question: "Two?", short: "Two", answer: "Second." },
  { question: "Three?", short: "Three", answer: "Third." },
  { question: "Four?", short: "Four", answer: "Fourth." },
  { question: "Five?", short: "Five", answer: "Fifth." },
];

const count = (html: string, needle: string) => html.split(needle).length - 1;

describe("FaqFlipCards markup", () => {
  it("renders every item with both faces in the HTML", () => {
    const html = faqFlipCardsHtml({ items, variant: "full" });
    expect(count(html, 'class="jfaq-fc')).toBe(5);
    expect(count(html, 'class="jfaq-fa"')).toBe(5);
    expect(count(html, 'class="jfaq-fb"')).toBe(5);
    expect(html).toContain("Fifth.");
    expect(html).not.toContain("jfaq-showall");
    expect(html).not.toContain("jfaq-hide");
  });

  it("compact shows 4 cards and offers Show all", () => {
    const html = faqFlipCardsHtml({ items, variant: "compact" });
    expect(html).toContain("jfaq--compact");
    expect(count(html, "jfaq-hide")).toBe(1);
    expect(html).toContain("Show all 5 questions");
  });

  it("honours an explicit limit", () => {
    const html = faqFlipCardsHtml({ items, limit: 2 });
    expect(count(html, "jfaq-hide")).toBe(3);
    expect(html).toContain("Show all 5 questions");
  });

  it("cards start closed and are real buttons with a Show answer label", () => {
    const html = faqFlipCardsHtml({ items: items.slice(0, 1) });
    expect(html).toContain(
      '<button type="button" class="jfaq-fa" aria-pressed="false"',
    );
    expect(html).toContain("Show answer");
    expect(html).toContain('class="jfaq-fb" aria-hidden="true"');
  });

  it("escapes question and short text but keeps the answer HTML", () => {
    const html = faqFlipCardsHtml({ items: items.slice(0, 1) });
    expect(html).toContain("Is &quot;A&quot; &lt;b&gt;ok&lt;/b&gt;?");
    expect(html).toContain("Yes &amp; yes");
    expect(html).toContain('<a href="/x">link</a>');
  });
});

describe("FAQPage JSON-LD", () => {
  it("is valid JSON with plain-text answers", () => {
    const data = JSON.parse(faqJsonLd({ items })) as {
      "@type": string;
      mainEntity: { name: string; acceptedAnswer: { text: string } }[];
    };
    expect(data["@type"]).toBe("FAQPage");
    expect(data.mainEntity).toHaveLength(5);
    expect(data.mainEntity[0]?.acceptedAnswer.text).toBe("Fine link.");
  });

  it("only lists the questions shown on the page", () => {
    const data = JSON.parse(faqJsonLd({ items, variant: "compact" })) as {
      mainEntity: unknown[];
    };
    expect(data.mainEntity).toHaveLength(4);
  });

  it("appears once in the markup and its text cannot break out of the script tag", () => {
    const html = faqFlipCardsHtml({
      items: [
        { question: "</script>x", short: "y", answer: "</script><b>z</b>" },
      ],
    });
    expect(count(html, "application/ld+json")).toBe(1);
    const block =
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(html);
    expect(block?.[1]).toBeDefined();
    expect(block?.[1]).not.toContain("<");
    expect(() => JSON.parse(block?.[1] ?? "")).not.toThrow();
  });
});

describe("FAQ content", () => {
  it("every item has a question, a short line of at most 5 words and an answer", () => {
    for (const item of faqPageItems) {
      expect(item.question.length).toBeGreaterThan(5);
      expect(item.answer.length).toBeGreaterThan(5);
      const words = item.short.trim().split(/\s+/).length;
      expect(words).toBeGreaterThanOrEqual(2);
      expect(words).toBeLessThanOrEqual(5);
    }
  });

  it("the /faq page lists the general questions first", () => {
    expect(faqPageItems.slice(0, generalFaqs.length)).toEqual(generalFaqs);
  });
});
