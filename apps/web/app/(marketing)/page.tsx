import type { Metadata } from "next";
import { FinalPage } from "../../components/marketing/final/Shell";
import { FINAL_PAGES } from "../../components/marketing/final/generated";

export const metadata: Metadata = {
  title: "Go global from anywhere. Launch in the US. | Juris Consultants USA",
  description:
    "Form your US LLC or C-Corp from anywhere, with EIN, bank account and compliance handled end-to-end by CA / CS experts.",
};

export default function Page() {
  return <FinalPage html={FINAL_PAGES.home} page="home" />;
}
