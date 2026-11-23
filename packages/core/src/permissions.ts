export type UserRole = "CUSTOMER" | "STAFF" | "SUPER_ADMIN";

export type Permission =
  | "CUSTOMER_VIEW_OWN_ORDER"
  | "VIEW_CUSTOMERS"
  | "VIEW_ORDERS"
  | "CHANGE_ORDER_STATUS"
  | "REVIEW_KYC"
  | "UPLOAD_DOCUMENTS"
  | "MANAGE_NOTES"
  | "VIEW_CONSULTATIONS"
  | "EXPORT_DATA"
  | "EDIT_SETTINGS"
  | "MANAGE_ADMIN_USERS";

export function isUserRole(value: unknown): value is UserRole {
  return value === "CUSTOMER" || value === "STAFF" || value === "SUPER_ADMIN";
}

const staffPermissions = new Set<Permission>([
  "VIEW_CUSTOMERS",
  "VIEW_ORDERS",
  "CHANGE_ORDER_STATUS",
  "REVIEW_KYC",
  "UPLOAD_DOCUMENTS",
  "MANAGE_NOTES",
  "VIEW_CONSULTATIONS",
]);

const superAdminPermissions = new Set<Permission>([
  ...staffPermissions,
  "EXPORT_DATA",
  "EDIT_SETTINGS",
  "MANAGE_ADMIN_USERS",
]);

export function hasPermission(role: UserRole, permission: Permission): boolean {
  if (role === "SUPER_ADMIN") return superAdminPermissions.has(permission);
  if (role === "STAFF") return staffPermissions.has(permission);
  return permission === "CUSTOMER_VIEW_OWN_ORDER";
}

export function requirePermission(
  role: UserRole,
  permission: Permission,
): void {
  if (!hasPermission(role, permission)) {
    throw new Error(`Permission denied: ${role} cannot perform ${permission}`);
  }
}
