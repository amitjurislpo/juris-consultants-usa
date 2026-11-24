import type { Metadata } from "next";
import { PageIntro } from "../../../../components/marketing/PageIntro";

export const metadata: Metadata = {
  title: "Terms of service | Juris Consultants USA",
  description: "Terms of service draft placeholder for Juris Consultants USA.",
};

export default function TermsPage() {
  return (
    <main id="app" data-page="misc" className="subpage legal-page">
      <div className="page-container">
        <PageIntro
          description="Draft placeholder · These are not terms of service."
          eyebrow="LEGAL · REVIEW REQUIRED"
          title="Terms of service"
        />
        <div className="legal-placeholder">
          <span className="placeholder-pill">
            Draft placeholder · not for reliance
          </span>
          <h2>Terms will be published after review.</h2>
          <p>
            Final terms must be reviewed and approved before services are
            offered. This placeholder does not define services, fees,
            responsibilities, limitations, or any agreement between a visitor
            and the company.
          </p>
          <p className="small-note">Effective date: to be confirmed.</p>
        </div>
      </div>
    </main>
  );
}
