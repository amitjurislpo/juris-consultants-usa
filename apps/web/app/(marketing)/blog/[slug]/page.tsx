import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FinalPage } from "../../../../components/marketing/final/Shell";
import { FINAL_BLOGS } from "../../../../components/marketing/final/generated";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(FINAL_BLOGS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const html = FINAL_BLOGS[slug];
  if (!html) return { title: "Guide not found | Juris Consultants USA" };
  const match = /<h1[^>]*>([^<]+)<\/h1>/.exec(html);
  return {
    title: `${match ? match[1] : "Guide"} | Juris Consultants USA`,
  };
}

export default async function BlogPage({ params }: Props) {
  const { slug } = await params;
  const html = FINAL_BLOGS[slug];
  if (!html) notFound();
  return <FinalPage arg={slug} html={html} page="blog" />;
}
