import type { Metadata } from "next";
import { PageIntro } from "../../../components/marketing/PageIntro";
import { faqs } from "../../../components/marketing/content";

export const metadata: Metadata = {
  title: "Frequently asked questions | Juris Consultants USA",
  description:
    "Draft answers to common questions about US company formation and business support.",
};

export default function FaqPage() {
  return (
    <main id="app" data-page="misc" className="subpage">
      <div className="page-container">
        <PageIntro
          description="These draft answers are intended to help frame a conversation. Confirm all service, legal, tax, and timing details before launch."
          eyebrow="FAQ"
          title="Questions worth asking."
        />
        <div className="faq-page-list">
          {faqs.map((faq, index) => (
            <details className="faq-item" key={faq.question}>
              <summary>
                <span className="faq-index">0{index + 1}</span>
                {faq.question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
        <p className="small-note centered-note">
          Preview content · These answers are not legal, tax, or financial
          advice.
        </p>
      </div>
    </main>
  );
}
