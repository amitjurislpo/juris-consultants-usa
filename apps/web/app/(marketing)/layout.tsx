import type { ReactNode } from "react";
import { FinalShell } from "../../components/marketing/final/Shell";
import "@juris/ui/faq.css";
import "./subpages.css";

export default function MarketingLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <FinalShell>{children}</FinalShell>;
}
