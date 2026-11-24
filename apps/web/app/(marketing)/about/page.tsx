import type { Metadata } from "next";
import { FinalPage } from "../../../components/marketing/final/Shell";
import { FINAL_PAGES } from "../../../components/marketing/final/generated";

export const metadata: Metadata = {
  title: "About Us | Juris Consultants USA",
  description:
    "The team behind Juris Consultants India, now helping you go global.",
};

export default function Page() {
  return <FinalPage html={FINAL_PAGES.about} page="about" />;
}
