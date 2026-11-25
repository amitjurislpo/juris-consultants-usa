import Image from "next/image";
import Script from "next/script";
import type { ReactNode } from "react";
import { BLOG_URL } from "../../../src/lib/links";
import { AuthNav } from "./AuthNav";
import { FINAL_MEGA } from "./generated";

/* Markup copied 1:1 from the final design HTML (announce bar, header, footer,
   sticky CTA). Links use real URLs instead of #/ hashes. */

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
      <header className="site">
        <div className="container nav">
          <a aria-label="Juris Consultants USA home" className="logo" href="/">
            <Image
              alt=""
              className="logo-img"
              height={44}
              priority
              src="/logo-mark.png"
              width={42}
            />
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
            <a data-nav="blogs" href={BLOG_URL}>
              Blogs
            </a>
            <a data-nav="about" href="/about">
              About Us
            </a>
            <a data-nav="contact" href="/contacts">
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
            <AuthNav />
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
          <a href={BLOG_URL}>Blogs</a>
          <a href="/about">About Us</a>
          <a href="/contacts">Contact</a>
          <AuthNav mobile />
        </div>
      </header>

      {children}

      <footer>
        <div className="container">
          <div className="foot-grid">
            <div>
              <div className="logo" style={{ color: "#fff" }}>
                <Image
                  alt=""
                  className="logo-img"
                  height={44}
                  priority
                  src="/logo-mark.png"
                  width={42}
                />
                <span>
                  Juris Consultants{" "}
                  <span style={{ color: "var(--on-dark-accent)" }}>USA</span>
                </span>
              </div>
              <p style={{ marginTop: 14, fontSize: 14, maxWidth: 320 }}>
                US company formation, compliance and support for founders
                worldwide, by the team behind Juris Consultants India.
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
                <span
                  className="mbg"
                  dangerouslySetInnerHTML={{
                    __html:
                      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>Money-Back Guarantee',
                  }}
                />
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
              <a href={BLOG_URL}>Blogs</a>
              <a href="/how-it-works">How it works</a>
              <a href="/contacts">Contact</a>
            </div>
            <div>
              <h5>Talk to us</h5>
              <a href="tel:+919999630777">India: +91 99996 30777</a>
              <a href="tel:+16462338454">USA: +1 (646) 233-8454</a>
              <a href="mailto:contact@jurisconsultantsusa.com">
                contact@jurisconsultantsusa.com
              </a>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© 2026 Juris Consultants USA. All rights reserved.</span>
            <span>
              Not a law firm. No legal or tax advice. <a href="/terms">Terms</a>{" "}
              · <a href="/privacy">Privacy</a> · <a href="/refund">Refunds</a>
            </span>
          </div>
        </div>
      </footer>

      <div className="sticky-cta" id="stickyCta">
        <span>
          <b>LLC from $249</b>{" "}
          <span style={{ color: "#CBD5E1" }}>
            + state fee · ~7 business days
          </span>
        </span>
        <a className="btn btn-primary btn-sm" href="/start?flow=start">
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
      data-calendly={process.env.CALENDLY_EXPERT_URL || undefined}
      data-page={page}
      id="app"
    />
  );
}
