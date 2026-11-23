import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "../../../components/marketing/PageIntro";
import { blogPosts } from "../../../components/marketing/content";

export const metadata: Metadata = {
  title: "Insights | Juris Consultants USA",
  description:
    "Illustrative draft articles on US company formation and business planning for founders worldwide.",
};

export default function BlogPage() {
  return (
    <main className="subpage">
      <div className="page-container">
        <PageIntro
          description="Ideas and explainers for founders thinking about a US business. Articles below are illustrative drafts, not published guidance."
          eyebrow="INSIGHTS · DRAFT PREVIEW"
          title="A little more clarity for the road ahead."
        />
        <div className="blog-grid">
          {blogPosts.map((post, index) => (
            <article className="blog-card hover-card" key={post.slug}>
              <div
                className={`blog-art blog-art-${index + 1}`}
                aria-hidden="true"
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <i />
                <i />
                <i />
              </div>
              <div className="blog-card-body">
                <span className="blog-category">{post.category}</span>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <span className="blog-status">ILLUSTRATIVE DRAFT</span>
                <Link href="/coming-soon">
                  Read more <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
        <p className="small-note centered-note">
          Articles and topics are draft examples only. No articles are currently
          published.
        </p>
      </div>
    </main>
  );
}
