import { PathBreadcrumbs } from "@juris/ui";
import type { ReactNode } from "react";
import { SITE_CRUMBS } from "../../content/breadcrumbs";
import { FinalShell } from "../../components/marketing/final/Shell";
import { siteUrl } from "../../src/lib/site-url";
import "@juris/ui/faq.css";
import "./subpages.css";

export default function MarketingLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <FinalShell>
      <div className="jbc-wrap">
        <div className="container jbc-bar">
          <PathBreadcrumbs {...SITE_CRUMBS} jsonLdOrigin={siteUrl} />
        </div>
      </div>
      {children}
    </FinalShell>
  );
}
