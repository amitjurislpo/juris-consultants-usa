import type { Metadata } from "next";
import { PageIntro } from "../../../../components/marketing/PageIntro";

export const metadata: Metadata = {
  title: "Privacy policy | Juris Consultants USA",
  description: "Privacy policy draft placeholder for Juris Consultants USA.",
};

export default function PrivacyPage() {
  return (
    <main id="app" data-page="misc" className="subpage legal-page">
      <div className="page-container">
        <PageIntro
          description="Draft placeholder · This page is not a privacy policy."
          eyebrow="LEGAL · REVIEW REQUIRED"
          title="Privacy policy"
        />
        <div className="legal-placeholder">
          <span className="placeholder-pill">
            Draft placeholder · not for reliance
          </span>
          <h2>Privacy terms will be published after review.</h2>
          <p>
            The final policy must explain what information is collected, how it
            is used and protected, who it may be shared with, how long it is
            retained, and how people can contact the company about their
            information. No privacy terms are established by this placeholder.
          </p>
          <p className="small-note">Last updated: to be confirmed.</p>
        </div>
      </div>
    </main>
  );
}
