import { hasPermission, type Permission, type UserRole } from "@juris/core";

export interface NavItem {
  href: string;
  label: string;
  permission?: Permission;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Dashboard" },
  { href: "/leads", label: "Leads", permission: "VIEW_CUSTOMERS" },
  { href: "/customers", label: "Customers", permission: "VIEW_CUSTOMERS" },
  { href: "/orders", label: "Orders", permission: "VIEW_ORDERS" },
  { href: "/payments", label: "Payments", permission: "VIEW_ORDERS" },
  { href: "/kyc", label: "KYC review", permission: "REVIEW_KYC" },
  {
    href: "/consultations",
    label: "Consultations",
    permission: "VIEW_CONSULTATIONS",
  },
  { href: "/settings", label: "Settings", permission: "EDIT_SETTINGS" },
  { href: "/staff", label: "Staff", permission: "MANAGE_ADMIN_USERS" },
  {
    href: "/activity",
    label: "Activity log",
    permission: "MANAGE_ADMIN_USERS",
  },
  { href: "/export", label: "Export", permission: "EXPORT_DATA" },
];

export function navFor(role: UserRole): NavItem[] {
  return NAV_ITEMS.filter(
    (item) => !item.permission || hasPermission(role, item.permission),
  );
}
