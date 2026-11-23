import Link from "next/link";
import { DesktopServicesMenu, MobileNavigation } from "./NavigationMenus";

const primaryLinks = [
  { label: "Pricing", href: "/pricing" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Blogs", href: "/blog" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  return (
    <>
      <div className="preview-notice">
        Preview site <span aria-hidden="true">·</span> Copy and prices are
        illustrative placeholders
      </div>
      <header className="site-header">
        <div className="site-header-inner">
          <Link
            aria-label="Juris Consultants USA home"
            className="brand"
            href="/"
          >
            <span aria-hidden="true" className="brand-mark">
              JC
            </span>
            <span className="brand-name">
              Juris Consultants
              <small>USA</small>
            </span>
          </Link>

          <nav aria-label="Main navigation" className="desktop-nav">
            <DesktopServicesMenu />
            {primaryLinks.map((link) => (
              <Link href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
            <Link href="/coming-soon">Login</Link>
            <Link className="button button-small" href="/coming-soon">
              Launch your company <span aria-hidden="true">↗</span>
            </Link>
          </nav>

          <MobileNavigation links={primaryLinks} />
        </div>
      </header>
    </>
  );
}
