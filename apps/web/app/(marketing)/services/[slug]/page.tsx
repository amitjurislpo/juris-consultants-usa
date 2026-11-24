import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FinalPage } from "../../../../components/marketing/final/Shell";
import { FINAL_SERVICES } from "../../../../components/marketing/final/generated";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(FINAL_SERVICES).map((slug) => ({ slug }));
}

function titleFor(html: string) {
  const match = /<h1[^>]*>([^<]+)<\/h1>/.exec(html);
  return match ? match[1] : "Service";
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const html = FINAL_SERVICES[slug];
  if (!html) return { title: "Service not found | Juris Consultants USA" };
  return { title: `${titleFor(html)} | Juris Consultants USA` };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const html = FINAL_SERVICES[slug];
  if (!html) notFound();
  return <FinalPage arg={slugToId[slug]} html={html} page="service" />;
}

const slugToId: Record<string, string> = {
  "llc-formation": "llc",
  "c-corp-formation": "ccorp",
  "ein-tax-registration": "ein",
  "registered-agent": "agent",
  "bank-account-assistance": "bank",
  "virtual-address-mailbox": "mailbox",
  "physical-office-address": "office",
  "accounting-bookkeeping": "books",
  "warehousing-fulfilment": "warehouse",
  "compliance-annual-filings": "compliance",
  "us-tax-filing": "tax",
  "talk-to-an-expert": "expert",
};
