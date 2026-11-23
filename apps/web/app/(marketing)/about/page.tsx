import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "../../../components/marketing/PageIntro";
import { Reveal } from "../../../components/marketing/Reveal";

export const metadata: Metadata = {
  title: "About | Juris Consultants USA",
  description:
    "Learn about the planned approach of Juris Consultants USA for founders around the world.",
};

export default function AboutPage() {
  return (
    <main className="subpage">
      <div className="page-container">
        <PageIntro
          description="We are building a guided company formation and business support experience for founders worldwide."
          eyebrow="ABOUT JURIS CONSULTANTS USA"
          title="A global outlook. A human approach."
        />
        <section className="about-feature">
          <div className="about-emblem" aria-hidden="true">
            <span>J</span>
            <i />
            <i />
            <i />
          </div>
          <div className="about-copy">
            <Reveal>
              <p className="eyebrow">OUR APPROACH</p>
              <h2>Clear guidance for a cross-border journey.</h2>
              <p>
                Building a company in another country can raise a lot of
                questions. Juris Consultants USA is being built to help founders
                understand the process, prepare information, and find their next
                step with a CA/CS-led expert team.
              </p>
              <p>
                Our service is intended for founders worldwide. The details on
                this preview are drafts and will be confirmed before launch.
              </p>
            </Reveal>
            <Link className="button" href="/coming-soon">
              Talk to our team <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
        <section className="about-values">
          <div className="section-heading centered">
            <p className="eyebrow">WHAT WE VALUE</p>
            <h2>Good guidance begins with clarity.</h2>
          </div>
          <div className="value-grid">
            {[
              ["Clarity", "Make complex steps easier to understand."],
              ["Care", "Start with the founder's goals and questions."],
              [
                "Continuity",
                "Keep important details and next steps connected.",
              ],
            ].map(([title, detail], index) => (
              <article className="value-card hover-card" key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </section>
        <p className="small-note centered-note">
          Team biographies, credentials, history, and contact details will be
          added after confirmation.
        </p>
      </div>
    </main>
  );
}
