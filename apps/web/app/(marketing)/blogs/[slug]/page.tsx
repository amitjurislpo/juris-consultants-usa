import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSamplePost, SAMPLE_POSTS } from "../../../../content/blog/samples";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return SAMPLE_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const post = getSamplePost((await params).slug);
  if (!post) return {};
  return {
    title: `${post.title} | Juris Consultants USA`,
    description: post.summary,
    robots: { index: false, follow: true },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const post = getSamplePost((await params).slug);
  if (!post) notFound();

  return (
    <main id="app" data-page="misc" className="subpage blog-page">
      <div className="page-container">
        <div className="sec-head">
          <span className="eyebrow">{post.category}</span>
          <h1 style={{ fontSize: "clamp(30px,4vw,46px)" }}>{post.title}</h1>
          <p>{post.summary}</p>
        </div>
        <aside className="sample-note" role="note">
          <strong>Illustrative sample article.</strong> When the website goes
          live, this page will show our existing blog instead.
        </aside>
        <article className="legal-doc">
          <p className="small-note">{post.readMinutes} min read</p>
          {post.sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {s.paragraphs.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </section>
          ))}
          <p className="small-note">
            General information only, not legal or tax advice.
          </p>
          <p>
            Related: <Link href={post.service.href}>{post.service.label}</Link>{" "}
            · <Link href="/blogs">Back to all articles</Link>
          </p>
        </article>
      </div>
    </main>
  );
}
