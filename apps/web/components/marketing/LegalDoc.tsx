import type { ReactNode } from "react";
import { PageIntro } from "./PageIntro";

export type LegalSection = { heading: string; body: ReactNode };

export function LegalDoc({
  eyebrow,
  title,
  intro,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <main id="app" data-page="misc" className="subpage legal-page">
      <div className="page-container">
        <PageIntro description={intro} eyebrow={eyebrow} title={title} />
        <article className="legal-doc">
          <p className="small-note">Last updated: {updated}</p>
          {sections.map((s, i) => (
            <section key={s.heading}>
              <h2>
                {i + 1}. {s.heading}
              </h2>
              {s.body}
            </section>
          ))}
          <p className="small-note">
            Questions? Write to{" "}
            <a href="mailto:contact@jurisconsultantsusa.com">
              contact@jurisconsultantsusa.com
            </a>
            .
          </p>
        </article>
      </div>
    </main>
  );
}
