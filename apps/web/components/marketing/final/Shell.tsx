import Script from "next/script";
import type { ReactNode } from "react";
import { FINAL_MEGA } from "./generated";

/* Markup copied 1:1 from the final design HTML (announce bar, header, footer,
   WhatsApp button, sticky CTA). Links use real URLs instead of #/ hashes. */

const WA_PATH =
  "M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z";

const bodyClassScript =
  "document.body.classList.add('dm','L20','L7','L12','hr1','cu5','ck1','no-chg');";

export function FinalShell({ children }: { children: ReactNode }) {
  return (
    <>
      <link href="https://fonts.googleapis.com" rel="preconnect" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@500;600;700&display=swap"
        rel="stylesheet"
      />
      <link href="/final.css" precedence="default" rel="stylesheet" />
      <script dangerouslySetInnerHTML={{ __html: bodyClassScript }} />
      <div className="announce">
        <span aria-label="India" className="fl fl-in" role="img" /> →{" "}
        <span aria-label="USA" className="fl fl-us" role="img" /> Start your US
        company from India with expert help ·{" "}
        <span className="ph">[Offer, e.g. “EIN included this month”]</span> ·{" "}
        <a href="/pricing">See pricing</a>
      </div>
      <header className="site">
        <div className="container nav">
          <a aria-label="Juris Consultants USA home" className="logo" href="/">
            <span className="logo-mark">JC</span>
            <span>
              Juris Consultants <span className="usa">USA</span>
            </span>
          </a>
          <nav aria-label="Main" className="menu">
            <div className="dd">
              <button aria-haspopup="true" type="button">
                Services
                <svg
                  aria-hidden="true"
                  fill="none"
                  height="14"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                  width="14"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div
                className="mega"
                dangerouslySetInnerHTML={{ __html: FINAL_MEGA }}
                id="mega"
              />
            </div>
            <a data-nav="pricing" href="/pricing">
              Pricing
            </a>
            <a data-nav="how" href="/how-it-works">
              How it works
            </a>
            <a data-nav="blogs" href="/blog">
              Blogs
            </a>
            <a data-nav="about" href="/about">
              About Us
            </a>
            <a data-nav="contact" href="/contact">
              Contact
            </a>
          </nav>
          <div className="nav-cta">
            <span
              className="nav-phone muted"
              style={{ fontSize: 14, whiteSpace: "nowrap" }}
            >
              +91 99996 30777
            </span>
            <a className="btn btn-outline btn-sm" href="/contact">
              Talk to an Expert
            </a>
            <a className="btn btn-primary btn-sm" href="/start">
              Launch Your Company
            </a>
            <button aria-label="Open menu" className="burger" type="button">
              <svg
                aria-hidden="true"
                fill="none"
                height="22"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="22"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        <div className="mobile-menu" id="mm">
          <a href="/">Home</a>
          <a href="/services">Services</a>
          <a href="/pricing">Pricing</a>
          <a href="/how-it-works">How it works</a>
          <a href="/blog">Blogs</a>
          <a href="/about">About Us</a>
          <a href="/contact">Contact</a>
        </div>
      </header>

      {children}

      <footer>
        <div className="container">
          <div className="foot-grid">
            <div>
              <div className="logo" style={{ color: "#fff" }}>
                <span className="logo-mark">JC</span>
                <span>
                  Juris Consultants{" "}
                  <span style={{ color: "var(--on-dark-accent)" }}>USA</span>
                </span>
              </div>
              <p style={{ marginTop: 14, fontSize: 14, maxWidth: 320 }}>
                US company formation, compliance and support for founders in
                India, by the team behind Juris Consultants India.
              </p>
              <div
                style={{
                  marginTop: 16,
                  display: "inline-flex",
                  gap: 8,
                  alignItems: "center",
                  background: "rgba(245,158,11,.15)",
                  color: "#FCD34D",
                  padding: "8px 12px",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                🛡 <span className="ph">[Money-back guarantee]</span>
              </div>
            </div>
            <div>
              <h5>Start</h5>
              <a href="/services/llc-formation">LLC Formation</a>
              <a href="/services/c-corp-formation">C-Corp Formation</a>
              <a href="/services/ein-tax-registration">EIN &amp; Tax ID</a>
              <a href="/services/registered-agent">Registered Agent</a>
            </div>
            <div>
              <h5>Company</h5>
              <a href="/about">About Us</a>
              <a href="/pricing">Pricing</a>
              <a href="/blog">Blogs</a>
              <a href="/how-it-works">How it works</a>
              <a href="/contact">Contact</a>
            </div>
            <div>
              <h5>Talk to us</h5>
              <a href="tel:+919999630777">India: +91 99996 30777</a>
              <a href="tel:+16462338454">USA: +1 (646) 233-8454</a>
              <a
                href="https://wa.me/919999630777"
                rel="noopener"
                target="_blank"
              >
                WhatsApp us
              </a>
              <a href="/contact">
                <span className="ph">[email address]</span>
              </a>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© 2026 Juris Consultants USA. All rights reserved.</span>
            <span className="ph">[Disclaimer &amp; refund-policy text]</span>
          </div>
        </div>
      </footer>

      <a
        aria-label="Chat on WhatsApp"
        className="wa"
        href="https://wa.me/919999630777"
        rel="noopener"
        target="_blank"
      >
        <svg
          aria-hidden="true"
          fill="#fff"
          height="30"
          viewBox="0 0 24 24"
          width="30"
        >
          <path d={WA_PATH} />
        </svg>
      </a>
      <div className="sticky-cta" id="stickyCta">
        <span>
          <b>LLC from $249</b>{" "}
          <span style={{ color: "#CBD5E1" }}>
            + state fee · ~7 business days
          </span>
        </span>
        <a className="btn btn-primary btn-sm" href="/start">
          Launch Your Company
        </a>
      </div>
      <Script src="/final-runtime.js" strategy="afterInteractive" />
    </>
  );
}

export function FinalPage({
  html,
  page,
  arg,
}: {
  html: string;
  page: string;
  arg?: string;
}) {
  return (
    <main
      dangerouslySetInnerHTML={{ __html: html }}
      data-arg={arg}
      data-page={page}
      id="app"
    />
  );
}
