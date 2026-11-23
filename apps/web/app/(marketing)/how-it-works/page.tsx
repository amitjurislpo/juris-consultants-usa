import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "../../../components/marketing/PageIntro";

export const metadata: Metadata = {
  title: "How it works | Juris Consultants USA",
  description:
    "An illustrative overview of how founders may work with Juris Consultants USA.",
};

const steps = [
  {
    number: "01",
    title: "Start with your goals",
    body: "Share what you are building and what you hope to do in the United States.",
  },
  {
    number: "02",
    title: "Explore your options",
    body: "Discuss possible company structures and services with the team.",
  },
  {
    number: "03",
    title: "Prepare the details",
    body: "Review the information and documents that may be needed for your chosen service.",
  },
  {
    number: "04",
    title: "Review the next steps",
    body: "Confirm the scope, fees, and process before moving ahead.",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="subpage">
      <div className="page-container">
        <PageIntro
          description="A draft overview of the intended customer journey. The final process and service timings will be confirmed before launch."
          eyebrow="HOW IT WORKS"
          title="A clear path, guided by people."
        />
        <div className="steps-list">
          {steps.map((step) => (
            <article className="step-card hover-card" key={step.number}>
              <span className="step-number">{step.number}</span>
              <div>
                <h2>{step.title}</h2>
                <p>{step.body}</p>
              </div>
              <span className="step-arrow" aria-hidden="true">
                ↗
              </span>
            </article>
          ))}
        </div>
        <p className="small-note centered-note">
          Illustrative journey only. Actual steps depend on the service and your
          circumstances.
        </p>
        <div className="detail-bottom-cta">
          <h2>Not sure where to begin?</h2>
          <p>Talk through your questions with the team.</p>
          <Link className="button" href="/coming-soon">
            Talk to an expert
          </Link>
        </div>
      </div>
    </main>
  );
}
