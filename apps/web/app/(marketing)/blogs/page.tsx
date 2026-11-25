import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "../../../components/marketing/PageIntro";
import { SAMPLE_POSTS } from "../../../content/blog/samples";

export const metadata: Metadata = {
  title: "Blog | Juris Consultants USA",
  description:
    "Guides on forming and running a US company, written for founders around the world.",
  robots: { index: false, follow: true },
};

export default function BlogIndexPage() {
  return (
    <main id="app" data-page="misc" className="subpage blog-page">
      <div className="page-container">
        <PageIntro
          description="Guides on forming and running a US company, for founders around the world."
          eyebrow="BLOG"
          title="Insights for global founders"
        />
        <aside className="sample-note" role="note">
          <strong>Our full blog is coming to this page.</strong> When the
          website goes live, this page will show all of our existing blog
          articles. Until then, here are a few illustrative sample articles.
        </aside>
        <div className="grid g3 sample-grid">
          {SAMPLE_POSTS.map((post) => (
            <article className="card sample-card" key={post.slug}>
              <span className="placeholder-pill">Sample article</span>
              <span className="eyebrow">{post.category}</span>
              <h2>
                <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
              </h2>
              <p>{post.summary}</p>
              <span className="small-note">{post.readMinutes} min read</span>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
