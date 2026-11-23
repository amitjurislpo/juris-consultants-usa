import Link from "next/link";
import { services } from "./content";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
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
          <p>
            US company formation and business support for founders, wherever
            they are in the world.
          </p>
          <span className="footer-preview">
            Preview only · Services and content are being finalized
          </span>
        </div>
        <div className="footer-column">
          <h2>Explore</h2>
          <Link href="/services">All services</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/how-it-works">How it works</Link>
          <Link href="/about">About</Link>
        </div>
        <div className="footer-column">
          <h2>Popular services</h2>
          {services.slice(0, 4).map((service) => (
            <Link href={`/services/${service.slug}`} key={service.slug}>
              {service.title}
            </Link>
          ))}
        </div>
        <div className="footer-column">
          <h2>More</h2>
          <Link href="/blog">Blog</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/coming-soon">Login</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Juris Consultants USA</span>
        <nav aria-label="Legal">
          <Link href="/legal/privacy">Privacy</Link>
          <Link href="/legal/terms">Terms</Link>
          <Link href="/legal/refund">Refunds</Link>
        </nav>
        <span>Legal pages are draft placeholders for review.</span>
      </div>
    </footer>
  );
}
