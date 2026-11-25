import type { PathBreadcrumbsProps } from "@juris/ui";

/** Admin panel: Dashboard › Orders › Order details, and so on. */
export const ADMIN_CRUMBS: PathBreadcrumbsProps = {
  root: [{ label: "Dashboard", href: "/" }],
  labels: {
    "/orders": "Orders",
    "/orders/*": "Order details",
    "/customers": "Customers",
    "/customers/*": "Customer details",
    "/customers/*/preview": "Portal preview",
    "/leads": "Leads",
    "/enquiries": "Enquiries",
    "/consultations": "Consultations",
    "/kyc": "KYC review",
    "/kyc/*": "KYC details",
    "/payments": "Payments",
    "/invoices": "Invoices",
    "/documents": "Documents",
    "/reports": "Reports",
    "/email-templates": "Email templates",
    "/states": "States",
    "/staff": "Staff",
    "/settings": "Settings",
    "/activity": "Activity log",
    "/my-details": "My details",
    "/export": "Export",
  },
};
