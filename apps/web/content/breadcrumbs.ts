import type { PathBreadcrumbsProps } from "@juris/ui";

/** Names for the website's pages (breadcrumbs). Service pages are listed by their full path. */
export const SITE_CRUMBS: PathBreadcrumbsProps = {
  root: [{ label: "Home", href: "/" }],
  hideOn: ["/"],
  labels: {
    "/about": "About Us",
    "/pricing": "Pricing",
    "/how-it-works": "How it works",
    "/contacts": "Contact",
    "/faq": "FAQ",
    "/services": "Services",
    "/start": "Start your business",
    "/track-order": "Track your order",
    "/login": "Log in",
    "/terms": "Terms & Conditions",
    "/privacy": "Privacy Policy",
    "/refund": "Refund policy",
    "/coming-soon": "Coming soon",
    "/services/llc-formation": "US LLC Formation",
    "/services/c-corp-formation": "US C-Corp Formation",
    "/services/ein-tax-registration": "EIN & Tax Registration",
    "/services/registered-agent": "Registered Agent",
    "/services/bank-account-assistance": "Bank Account Assistance",
    "/services/virtual-address-mailbox": "Virtual Address & Mailbox",
    "/services/physical-office-address": "Physical Office Address",
    "/services/accounting-bookkeeping": "Accounting & Bookkeeping",
    "/services/warehousing-fulfilment": "Warehousing & Fulfilment",
    "/services/compliance-annual-filings": "Compliance & Annual Filings",
    "/services/us-tax-filing": "US Tax Filing",
    "/services/talk-to-an-expert": "Talk to an Expert",
  },
};

/** Customer portal: Home › My account › … */
export const PORTAL_CRUMBS: PathBreadcrumbsProps = {
  root: [
    { label: "Home", href: "/" },
    { label: "My account", href: "/account" },
  ],
  skip: ["/account"],
  labels: {
    "/account/dashboard": "Dashboard",
    "/account/orders": "My orders",
    "/account/orders/*": "Order details",
    "/account/documents": "Documents",
    "/account/payments": "Payments",
    "/account/profile": "Profile",
    "/account/coming-soon": "Coming soon",
  },
};
