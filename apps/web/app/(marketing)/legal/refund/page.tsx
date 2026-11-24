import type { Metadata } from "next";
import { PageIntro } from "../../../../components/marketing/PageIntro";

export const metadata: Metadata = {
  title: "Refund policy | Juris Consultants USA",
  description: "Refund policy draft placeholder for Juris Consultants USA.",
};

export default function RefundPage() {
  return (
    <main id="app" data-page="misc" className="subpage legal-page">
      <div className="page-container">
        <PageIntro
          description="Draft placeholder · This page does not set refund terms."
          eyebrow="LEGAL · REVIEW REQUIRED"
          title="Refund policy"
        />
        <div className="legal-placeholder">
          <span className="placeholder-pill">
            Draft placeholder · not for reliance
          </span>
          <h2>Refund terms will be published after review.</h2>
          <p>
            Final refund terms must be confirmed before taking payment. No
            payment, cancellation, or refund terms are established by this
            placeholder.
          </p>
          <p className="small-note">Last updated: to be confirmed.</p>
        </div>
      </div>
    </main>
  );
}
