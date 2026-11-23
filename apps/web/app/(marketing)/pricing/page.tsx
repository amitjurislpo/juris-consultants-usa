import type { Metadata } from "next";
import { PricingCards } from "../../../components/marketing/PricingCards";
import { PageIntro } from "../../../components/marketing/PageIntro";

export const metadata: Metadata = {
  title: "Pricing | Juris Consultants USA",
  description:
    "Preview the pricing experience. Final service prices are still being confirmed.",
};

export default function PricingPage() {
  return (
    <main className="subpage pricing-page">
      <div className="page-container">
        <PageIntro
          description="Pick a card to preview the experience. Final prices, service scope, and availability are still being confirmed."
          eyebrow="PICK A CARD · SEE THE PRICE"
          title="Straightforward choices. Clear next steps."
        />
        <PricingCards />
        <div className="pricing-notes">
          <p className="placeholder-pill">
            Placeholder pricing · not an offer or quote
          </p>
          <h2>What will be included in the final price?</h2>
          <p>
            The final pricing page will explain service fees, state fees, and
            any recurring costs separately. Values will be added after they are
            confirmed.
          </p>
        </div>
      </div>
    </main>
  );
}
