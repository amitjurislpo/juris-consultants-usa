import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "../../../components/marketing/PageIntro";

export const metadata: Metadata = {
  title: "Track an order | Juris Consultants USA",
  description:
    "Order tracking is not available in this public website preview yet.",
};

export default function TrackOrderPage() {
  return (
    <main className="subpage">
      <div className="page-container">
        <PageIntro
          description="The order-tracking experience is being prepared for a future launch."
          eyebrow="ORDER TRACKING · PREVIEW"
          title="Your next step, in one place."
        />
        <section className="track-order-preview">
          <span aria-hidden="true" className="track-order-icon">
            ↗
          </span>
          <h2>Coming soon</h2>
          <p>
            Order tracking is not active in this preview. No order numbers or
            personal information are collected here.
          </p>
          <Link className="button" href="/coming-soon">
            Get launch updates <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </div>
    </main>
  );
}
