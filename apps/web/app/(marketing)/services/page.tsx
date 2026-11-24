import type { Metadata } from "next";
import { FinalPage } from "../../../components/marketing/final/Shell";
import { FINAL_PAGES } from "../../../components/marketing/final/generated";

export const metadata: Metadata = {
  title: "Services | Juris Consultants USA",
  description:
    "Everything to start, run and grow your US company. Click any service to see details first; payment comes after.",
};

export default function Page() {
  return <FinalPage html={FINAL_PAGES.services} page="services" />;
}
