import type { Metadata } from "next";
import { FinalPage } from "../../../components/marketing/final/Shell";
import { FINAL_PAGES } from "../../../components/marketing/final/generated";

export const metadata: Metadata = {
  title: "Contact | Juris Consultants USA",
  description:
    "Talk to a US formation expert by phone or email.",
};

export default function Page() {
  return <FinalPage html={FINAL_PAGES.contact} page="contact" />;
}
