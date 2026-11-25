import type { Metadata } from "next";
import { FaqFlipCards } from "@juris/ui/faq";
import { faqPageItems } from "../../../content/faq";

export const metadata: Metadata = {
  title: "Frequently asked questions | Juris Consultants USA",
  description:
    "Answers to common questions about forming a US company as a founder outside the US.",
};

export default function FaqPage() {
  return (
    <main id="app" data-page="misc" className="subpage">
      <FaqFlipCards
        items={faqPageItems}
        subtitle="Tap a card to see the answer. Not legal or tax advice."
        variant="full"
      />
    </main>
  );
}
