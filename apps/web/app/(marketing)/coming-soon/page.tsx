import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Coming soon | Juris Consultants USA",
  description:
    "The ordering and account experience is not available in this website preview.",
  robots: { index: false, follow: true },
};

export default function ComingSoonPage() {
  return (
    <main className="coming-soon-page">
      <div aria-hidden="true" className="coming-orbit">
        <span>J</span>
      </div>
      <p className="eyebrow">JURIS CONSULTANTS USA · PREVIEW</p>
      <h1>This part of the journey is coming soon.</h1>
      <p>
        Login and order flows are not available in this visual preview. The
        public website is here for your review.
      </p>
      <div className="hero-actions">
        <Link className="button" href="/">
          Back to home <span aria-hidden="true">↗</span>
        </Link>
        <Link className="button button-outline" href="/contact">
          Contact
        </Link>
      </div>
    </main>
  );
}
