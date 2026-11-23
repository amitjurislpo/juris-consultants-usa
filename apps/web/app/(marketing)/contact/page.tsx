import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "../../../components/marketing/PageIntro";

export const metadata: Metadata = {
  title: "Contact | Juris Consultants USA",
  description:
    "Get in touch with Juris Consultants USA. Contact details are being finalized.",
};

export default function ContactPage() {
  return (
    <main className="subpage">
      <div className="page-container">
        <PageIntro
          description="Have a question about forming a US company? We are preparing the best way to connect with our team."
          eyebrow="LET'S TALK"
          title="Start with a conversation."
        />
        <div className="contact-layout">
          <section className="contact-card">
            <span className="contact-icon" aria-hidden="true">
              ↗
            </span>
            <p className="eyebrow">TALK TO AN EXPERT</p>
            <h2>Tell us what you are planning.</h2>
            <p>
              Share your goals and questions with our team. The consultation
              booking experience is coming soon.
            </p>
            <Link className="button" href="/coming-soon">
              Coming soon <span aria-hidden="true">↗</span>
            </Link>
          </section>
          <aside className="contact-details">
            <p className="eyebrow">CONTACT DETAILS</p>
            <h2>We are finalizing our contact channels.</h2>
            <p>
              Phone, WhatsApp, and email details will be published here once
              confirmed.
            </p>
            <span className="placeholder-pill">Details to be confirmed</span>
            <div className="contact-hours">
              <strong>Worldwide founders welcome</strong>
              <span>
                Service availability and response times to be confirmed.
              </span>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
