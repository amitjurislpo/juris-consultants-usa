import type { Metadata } from "next";
import { FinalPage } from "../../../components/marketing/final/Shell";
import { FINAL_PAGES } from "../../../components/marketing/final/generated";

export const metadata: Metadata = {
  title: "Start your US company | Juris Consultants USA",
  description:
    "Tell us about you, choose a plan and review your order.",
};

export default function Page() {
  return <FinalPage html={FINAL_PAGES.start} page="start" />;
}
