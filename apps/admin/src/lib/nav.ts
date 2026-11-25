import { hasPermission, type Permission, type UserRole } from "@juris/core";

export type NavIcon =
  | "dash"
  | "chart"
  | "orders"
  | "kyc"
  | "users"
  | "docs"
  | "pay"
  | "inv"
  | "map"
  | "mail"
  | "team"
  | "gear"
  | "chat"
  | "clock"
  | "spark"
  | "down";

export interface NavItem {
  href: string;
  label: string;
  icon: NavIcon;
  permission?: Permission;
  /** Highlight only on this exact path (the Dashboard). */
  exact?: boolean;
  /** Which sidebar count to show on this item. */
  badge?: "paidOrders" | "kycWaiting";
}

export interface NavGroup {
  label: string;
  color: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: "Overview",
    color: "#8B5CF6",
    items: [
      { href: "/", label: "Dashboard", icon: "dash", exact: true },
      {
        href: "/reports",
        label: "Reports",
        icon: "chart",
        permission: "VIEW_ORDERS",
      },
    ],
  },
  {
    label: "Operations",
    color: "#22D3EE",
    items: [
      {
        href: "/orders",
        label: "Orders",
        icon: "orders",
        permission: "VIEW_ORDERS",
        badge: "paidOrders",
      },
      {
        href: "/kyc",
        label: "KYC review",
        icon: "kyc",
        permission: "REVIEW_KYC",
        badge: "kycWaiting",
      },
      {
        href: "/customers",
        label: "Customers",
        icon: "users",
        permission: "VIEW_CUSTOMERS",
      },
      {
        href: "/leads",
        label: "Leads",
        icon: "spark",
        permission: "VIEW_CUSTOMERS",
      },
      {
        href: "/enquiries",
        label: "Enquiries",
        icon: "mail",
        permission: "VIEW_CUSTOMERS",
      },
      {
        href: "/consultations",
        label: "Consultations",
        icon: "chat",
        permission: "VIEW_CONSULTATIONS",
      },
      {
        href: "/documents",
        label: "Documents",
        icon: "docs",
        permission: "VIEW_ORDERS",
      },
    ],
  },
  {
    label: "Finance",
    color: "#34D399",
    items: [
      {
        href: "/payments",
        label: "Payments",
        icon: "pay",
        permission: "VIEW_ORDERS",
      },
      {
        href: "/invoices",
        label: "Invoices",
        icon: "inv",
        permission: "VIEW_ORDERS",
      },
    ],
  },
  {
    label: "Settings",
    color: "#F472B6",
    items: [
      {
        href: "/states",
        label: "States on/off",
        icon: "map",
        permission: "EDIT_SETTINGS",
      },
      {
        href: "/email-templates",
        label: "Email templates",
        icon: "mail",
        permission: "EDIT_SETTINGS",
      },
      {
        href: "/staff",
        label: "Staff & roles",
        icon: "team",
        permission: "MANAGE_ADMIN_USERS",
      },
      {
        href: "/settings",
        label: "Settings",
        icon: "gear",
        permission: "EDIT_SETTINGS",
      },
      {
        href: "/activity",
        label: "Activity log",
        icon: "clock",
        permission: "MANAGE_ADMIN_USERS",
      },
      {
        href: "/export",
        label: "Export",
        icon: "down",
        permission: "EXPORT_DATA",
      },
    ],
  },
];

const allowed = (role: UserRole, item: NavItem) =>
  !item.permission || hasPermission(role, item.permission);

/** Menu groups with only the items this role may open. Empty groups are dropped. */
export function navGroupsFor(role: UserRole): NavGroup[] {
  return NAV_GROUPS.map((group) => ({
    ...group,
    items: group.items.filter((item) => allowed(role, item)),
  })).filter((group) => group.items.length > 0);
}

/** The same menu as one flat list. */
export function navFor(role: UserRole): NavItem[] {
  return navGroupsFor(role).flatMap((group) => group.items);
}
