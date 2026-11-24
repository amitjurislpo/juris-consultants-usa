import type { Metadata } from "next";
import { FinalPage } from "../../../components/marketing/final/Shell";
import { FINAL_PAGES } from "../../../components/marketing/final/generated";

export const metadata: Metadata = {
  title: "Blogs | Juris Consultants USA",
  description:
    "Guides for Indian founders. Each guide links to the service you need next.",
};

export default function Page() {
  return <FinalPage html={FINAL_PAGES.blogs} page="blogs" />;
}
