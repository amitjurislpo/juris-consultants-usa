import type { Metadata } from "next";
import Link from "next/link";
import {
  DeparturesBoard,
  DocumentsFolder,
  GlobeScene,
  StoryScene,
  TakeoffScene,
} from "../../components/marketing/Scenes";
import { PricingCards } from "../../components/marketing/PricingCards";
import { Reveal } from "../../components/marketing/Reveal";
import { faqs, services } from "../../components/marketing/content";

export const metadata: Metadata = {
  title: "Your US company, from anywhere in the world | Juris Consultants USA",
  description:
    "Formation, EIN, banking guidance, and compliance support for founders worldwide. Preview our public website.",
  openGraph: {
    title: "Your US company, from anywhere in the world.",
    description:
      "Explore US company formation and business support for founders worldwide.",
    type: "website",
  },
};

const journeys = [
  [
    "01",
    "Choose your direction",
    "Explore the structure and services that fit your goals.",
  ],
  [
    "02",
    "Prepare with guidance",
    "Understand what details and documents may be needed.",
  ],
  [
    "03",
    "Review before filing",
    "Check the information and agree on next steps.",
  ],
  [
    "04",
    "Keep moving forward",
    "Follow your company's next steps in one place.",
  ],
];

const audiences = [
  [
    "E-commerce founders",
    "Build the structure for a business serving US customers.",
  ],
  [
    "Independent professionals",
    "Explore options for working with clients across borders.",
  ],
  [
    "Import and export teams",
    "Plan a company setup alongside your global operations.",
  ],
  [
    "Startups and founders",
    "Compare company structures as your plans take shape.",
  ],
];

const faqsForHome = faqs.slice(0, 4);

export default function HomePage() {
  return (
    <main>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Juris Consultants USA",
            description:
              "US company formation and business support for founders worldwide.",
            url: `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL ?? "localhost:3000"}`,
          }),
        }}
        type="application/ld+json"
      />
      <div className="home-wrap">
        <section className="hero-section" id="hero">
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-inner page-container">
            <div className="hero-copy">
              <span className="hero-badge">
                <span aria-hidden="true" className="status-dot" />
                <span className="hero-live">LIVE</span> Forming US companies for
                founders worldwide
              </span>
              <Reveal className="hero-title-wrap">
                <h1>
                  Go global from anywhere.{" "}
                  <span className="hero-gradient-text">Launch in the US.</span>
                </h1>
              </Reveal>
              <p className="hero-lead">
                Formation, EIN, bank account and compliance, handled end to end
                by our CA/CS-led expert team. Talk to us on WhatsApp or email,
                wherever you are.
              </p>
              <div className="hero-actions">
                <Link className="button" href="/coming-soon">
                  Launch Your Company <span aria-hidden="true">↗</span>
                </Link>
                <Link className="button button-outline" href="/coming-soon">
                  Talk to an Expert <span aria-hidden="true">↗</span>
                </Link>
              </div>
              <div className="hero-proof">
                <span>
                  <i>✓</i> Founders worldwide
                </span>
                <span>
                  <i>✓</i> CA/CS-led team
                </span>
                <span>
                  <i>✓</i> Guided next steps
                </span>
              </div>
            </div>
            <GlobeScene />
          </div>
          <div className="hero-bottomline page-container">
            <span>GLOBAL FOUNDERS</span>
            <span aria-hidden="true" className="bottomline-track" />
            <span>
              ONE CLEAR DIRECTION <b>↓</b>
            </span>
          </div>
        </section>

        <section className="section pricing-section" id="pricing">
          <div className="page-container">
            <div className="section-heading centered">
              <Reveal>
                <p className="eyebrow">PICK A CARD · SEE THE PRICE</p>
                <h2>Start with the service that fits.</h2>
                <p>
                  Select a card to preview the experience. Final prices are not
                  set yet.
                </p>
              </Reveal>
            </div>
            <PricingCards />
            <p className="small-note centered-note">
              All pricing is a placeholder pending confirmation. Nothing on this
              page is an offer or quote.
            </p>
          </div>
        </section>

        <section
          aria-label="Service approach"
          className="trust-strip"
          id="trust"
        >
          <div className="page-container trust-items">
            <div>
              <span className="trust-icon">◎</span>
              <strong>From anywhere</strong>
              <small>Support for founders worldwide</small>
            </div>
            <div>
              <span className="trust-icon">✳</span>
              <strong>Expert-led</strong>
              <small>CA/CS-led guidance</small>
            </div>
            <div>
              <span className="trust-icon">↗</span>
              <strong>Clear next steps</strong>
              <small>Understand the journey ahead</small>
            </div>
            <div>
              <span className="trust-icon">⌘</span>
              <strong>One place</strong>
              <small>Keep important details organized</small>
            </div>
          </div>
        </section>

        <section className="section quiz-section" id="quiz">
          <div className="page-container quiz-layout">
            <div className="section-heading">
              <Reveal>
                <p className="eyebrow">A FIRST QUESTION</p>
                <h2>LLC or C-Corp?</h2>
                <p>
                  The right choice depends on your plans. These short
                  descriptions are a starting point for a conversation, not
                  legal or tax advice.
                </p>
              </Reveal>
              <Link className="text-link" href="/coming-soon">
                Get help choosing <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <div className="quiz-options">
              <article className="quiz-card hover-card">
                <span className="quiz-symbol">LLC</span>
                <p className="eyebrow">LIMITED LIABILITY COMPANY</p>
                <h3>Looking for a flexible starting point?</h3>
                <p>
                  Explore how an LLC might fit your ownership and operating
                  plans.
                </p>
                <Link href="/services/llc-formation">
                  Explore LLC formation <span aria-hidden="true">↗</span>
                </Link>
              </article>
              <article className="quiz-card quiz-card-featured hover-card">
                <span className="quiz-symbol">C</span>
                <p className="eyebrow">C-CORPORATION</p>
                <h3>Planning for a venture-backed startup?</h3>
                <p>
                  Explore a corporate structure often considered by fundraising
                  teams.
                </p>
                <Link href="/services/c-corp-formation">
                  Explore C-Corp formation <span aria-hidden="true">↗</span>
                </Link>
              </article>
            </div>
          </div>
        </section>

        <StoryScene />

        <section className="section journey-section" id="journey">
          <div className="page-container">
            <div className="section-heading centered">
              <Reveal>
                <p className="eyebrow">A CLEARER WAY FORWARD</p>
                <h2>Your journey, with an expert beside you.</h2>
                <p>
                  Every business is different. Start with a conversation, then
                  move through the steps that apply to you.
                </p>
              </Reveal>
            </div>
            <div className="journey-grid">
              {journeys.map(([number, title, detail]) => (
                <article className="journey-card hover-card" key={number}>
                  <span className="journey-number">{number}</span>
                  <span className="journey-icon" aria-hidden="true">
                    {number === "01"
                      ? "⌖"
                      : number === "02"
                        ? "▤"
                        : number === "03"
                          ? "✓"
                          : "↗"}
                  </span>
                  <h3>{title}</h3>
                  <p>{detail}</p>
                  <span className="journey-line" />
                </article>
              ))}
            </div>
            <p className="small-note centered-note">
              Illustrative steps · Your process depends on the services
              selected.
            </p>
          </div>
        </section>

        <section className="section audience-section" id="who">
          <div className="page-container audience-layout">
            <div className="section-heading">
              <Reveal>
                <p className="eyebrow">MADE FOR AMBITION</p>
                <h2>One world. Many kinds of founders.</h2>
                <p>
                  Wherever you are starting from, get a clear view of your
                  possible next steps.
                </p>
              </Reveal>
              <Link className="text-link" href="/services">
                Explore all services <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <div className="audience-grid">
              {audiences.map(([title, detail], index) => (
                <article className="audience-card hover-card" key={title}>
                  <span className="audience-index">0{index + 1}</span>
                  <div className="audience-mark" aria-hidden="true">
                    {["◈", "⌘", "⇄", "✳"][index]}
                  </div>
                  <h3>{title}</h3>
                  <p>{detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section services-section" id="services">
          <div aria-hidden="true" className="ghost-word">
            SERVICES
          </div>
          <div className="page-container services-content">
            <div className="section-heading">
              <Reveal>
                <p className="eyebrow">FROM FIRST STEP TO WHAT'S NEXT</p>
                <h2>Support for the whole journey.</h2>
                <p>
                  Explore formation and business support services. Details are
                  draft content and will be confirmed before launch.
                </p>
              </Reveal>
            </div>
            <div className="service-grid">
              {services.slice(0, 6).map((service, index) => (
                <Link
                  className="service-card hover-card"
                  href={`/services/${service.slug}`}
                  key={service.slug}
                >
                  <div className="service-card-top">
                    <span className="service-number">0{index + 1}</span>
                    <span className="service-icon" aria-hidden="true">
                      {["⌂", "◫", "ID", "◎", "↗", "⌖"][index]}
                    </span>
                  </div>
                  <span className="service-group">{service.group}</span>
                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>
                  <span className="service-link">
                    Explore service <b aria-hidden="true">↗</b>
                  </span>
                </Link>
              ))}
            </div>
            <div className="section-cta">
              <Link className="button button-outline" href="/services">
                See all 12 services <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>

        <TakeoffScene />
        <DeparturesBoard />

        <section className="section documents-section" id="stack">
          <div className="page-container documents-layout">
            <div className="section-heading">
              <Reveal>
                <p className="eyebrow">WHAT YOU RECEIVE</p>
                <h2>Every document, stacked and ready.</h2>
                <p>
                  Scroll to watch your company’s paperwork arrive — formed,
                  filed and stored in your dashboard.
                </p>
              </Reveal>
              <div aria-live="polite" className="folder-progress">
                <span className="folder-progress-count" data-folder-count>
                  0
                </span>
                <span className="folder-progress-label">
                  / 5 documents ready
                </span>
              </div>
              <Link className="button" href="/coming-soon">
                Get my documents <span aria-hidden="true">↗</span>
              </Link>
              <p className="documents-disclaimer">
                Illustrative preview · Document labels and statuses are
                examples.
              </p>
            </div>
            <DocumentsFolder />
          </div>
        </section>

        <section className="section why-section">
          <div className="page-container why-layout">
            <div className="why-art">
              <div aria-hidden="true" className="why-orbit orbit-outer" />
              <div aria-hidden="true" className="why-orbit orbit-inner" />
              <span className="why-center">J</span>
              <span className="why-tag tag-expertise">EXPERT-LED</span>
              <span className="why-tag tag-world">WORLDWIDE</span>
              <span className="why-tag tag-clarity">CLEAR NEXT STEPS</span>
            </div>
            <div className="section-heading">
              <Reveal>
                <p className="eyebrow">THE JURIS APPROACH</p>
                <h2>Expert guidance, wherever you begin.</h2>
                <p>
                  A CA/CS-led team to help you understand the process, prepare
                  your information, and move ahead with clarity.
                </p>
              </Reveal>
              <div className="why-points">
                <p>
                  <i>✓</i>
                  <span>
                    <strong>Guidance that starts with your goals</strong>
                    <small>Understand options before choosing a service.</small>
                  </span>
                </p>
                <p>
                  <i>✓</i>
                  <span>
                    <strong>Support for founders worldwide</strong>
                    <small>
                      Talk through your questions from wherever you are.
                    </small>
                  </span>
                </p>
                <p>
                  <i>✓</i>
                  <span>
                    <strong>A more organized process</strong>
                    <small>
                      Keep the steps and information easy to follow.
                    </small>
                  </span>
                </p>
              </div>
              <Link className="text-link" href="/about">
                Get to know us <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="section faq-section" id="faq">
          <div className="page-container faq-layout">
            <div className="section-heading">
              <Reveal>
                <p className="eyebrow">GOOD QUESTIONS, CLEAR ANSWERS</p>
                <h2>Before you take the next step.</h2>
                <p>
                  Draft answers for preview. Confirm the final details before
                  launch.
                </p>
              </Reveal>
              <Link className="text-link" href="/faq">
                Browse all FAQs <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <div className="faq-list">
              {faqsForHome.map((faq) => (
                <details className="faq-item" key={faq.question}>
                  <summary>
                    {faq.question}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="final-cta-glow" aria-hidden="true" />
          <div className="page-container final-cta-inner">
            <Reveal>
              <p className="eyebrow">
                YOUR NEXT STEP STARTS WITH A CONVERSATION
              </p>
              <h2>Ready to explore your US business?</h2>
              <p>
                Tell us what you are building. We will help map out the next
                step.
              </p>
              <div className="hero-actions">
                <Link className="button" href="/coming-soon">
                  Start your business <span aria-hidden="true">↗</span>
                </Link>
                <Link className="button button-outline" href="/coming-soon">
                  Talk to an expert <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </main>
  );
}
