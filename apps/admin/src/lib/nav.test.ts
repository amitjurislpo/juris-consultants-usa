import { describe, expect, it } from "vitest";
import { navFor, navGroupsFor } from "./nav";

describe("navFor", () => {
  it("shows every section to a super admin, grouped as in the design", () => {
    expect(navGroupsFor("SUPER_ADMIN").map((g) => g.label)).toEqual([
      "Overview",
      "Operations",
      "Finance",
      "Settings",
    ]);
    expect(navFor("SUPER_ADMIN").map((i) => i.href)).toEqual([
      "/",
      "/reports",
      "/orders",
      "/kyc",
      "/customers",
      "/leads",
      "/enquiries",
      "/consultations",
      "/documents",
      "/payments",
      "/invoices",
      "/states",
      "/email-templates",
      "/staff",
      "/settings",
      "/activity",
      "/export",
    ]);
  });
  it("hides settings, staff, activity, states and export from staff", () => {
    const hrefs = navFor("STAFF").map((i) => i.href);
    for (const hidden of [
      "/settings",
      "/staff",
      "/activity",
      "/export",
      "/states",
      "/email-templates",
    ]) {
      expect(hrefs).not.toContain(hidden);
    }
    expect(hrefs).toContain("/orders");
    expect(navGroupsFor("STAFF").map((g) => g.label)).not.toContain("Settings");
  });
});
