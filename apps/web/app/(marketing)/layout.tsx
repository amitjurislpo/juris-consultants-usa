import type { ReactNode } from "react";
import { CometCursor } from "../../components/marketing/Scenes";
import { MotionGate } from "../../components/marketing/Reveal";
import { SiteFooter } from "../../components/marketing/SiteFooter";
import { SiteHeader } from "../../components/marketing/SiteHeader";
import { StickyLaunch } from "../../components/marketing/StickyLaunch";
import "./marketing.css";

export default function MarketingLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <MotionGate />
      <SiteHeader />
      {children}
      <SiteFooter />
      <CometCursor />
      <StickyLaunch />
    </>
  );
}
