import type { Metadata } from "next";
import { FinalPage } from "../../../components/marketing/final/Shell";
import { FINAL_PAGES } from "../../../components/marketing/final/generated";

export const metadata: Metadata = {
  title: "Pricing | Juris Consultants USA",
  description:
    "Simple, transparent pricing. See your full total, including the state fee, before you pay.",
};

export default function Page() {
  return <FinalPage html={FINAL_PAGES.pricing} page="pricing" />;
}
