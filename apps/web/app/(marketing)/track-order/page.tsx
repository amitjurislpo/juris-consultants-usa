import type { Metadata } from "next";
import { FinalPage } from "../../../components/marketing/final/Shell";
import { FINAL_PAGES } from "../../../components/marketing/final/generated";

export const metadata: Metadata = {
  title: "Track your order | Juris Consultants USA",
  description:
    "See live progress for your US company formation.",
};

export default function Page() {
  return <FinalPage html={FINAL_PAGES.track} page="track" />;
}
