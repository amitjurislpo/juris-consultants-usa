import type { Metadata } from "next";
import { FinalPage } from "../../../components/marketing/final/Shell";
import { FINAL_PAGES } from "../../../components/marketing/final/generated";

export const metadata: Metadata = {
  title: "How it works | Juris Consultants USA",
  description:
    "From India to a US company, step by step, with honest timelines.",
};

export default function Page() {
  return <FinalPage html={FINAL_PAGES.how} page="how" />;
}
