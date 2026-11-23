import { describe, expect, it } from "vitest";
import { hasPermission, isUserRole, requirePermission } from "./permissions.js";

describe("role permissions", () => {
  it("recognizes only supported session roles", () => {
    expect(isUserRole("SUPER_ADMIN")).toBe(true);
    expect(isUserRole("OWNER")).toBe(false);
  });

  it("gives every admin action to super admins", () => {
    expect(hasPermission("SUPER_ADMIN", "EXPORT_DATA")).toBe(true);
    expect(hasPermission("SUPER_ADMIN", "EDIT_SETTINGS")).toBe(true);
    expect(hasPermission("SUPER_ADMIN", "MANAGE_ADMIN_USERS")).toBe(true);
  });

  it("allows staff operations but not export, settings or users", () => {
    expect(hasPermission("STAFF", "CHANGE_ORDER_STATUS")).toBe(true);
    expect(hasPermission("STAFF", "REVIEW_KYC")).toBe(true);
    expect(hasPermission("STAFF", "EXPORT_DATA")).toBe(false);
    expect(hasPermission("STAFF", "EDIT_SETTINGS")).toBe(false);
    expect(hasPermission("STAFF", "MANAGE_ADMIN_USERS")).toBe(false);
  });

  it("allows customers only to view their own orders", () => {
    expect(hasPermission("CUSTOMER", "CUSTOMER_VIEW_OWN_ORDER")).toBe(true);
    expect(hasPermission("CUSTOMER", "VIEW_ORDERS")).toBe(false);
    expect(() => requirePermission("CUSTOMER", "CHANGE_ORDER_STATUS")).toThrow(
      /Permission denied/,
    );
  });
});
