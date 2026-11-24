import { describe, expect, it } from "vitest";
import { navFor } from "./nav";

describe("navFor", () => {
  it("shows every section to a super admin", () => {
    expect(navFor("SUPER_ADMIN").map((i) => i.href)).toEqual([
      "/",
      "/leads",
      "/customers",
      "/orders",
      "/payments",
      "/kyc",
      "/consultations",
      "/settings",
      "/staff",
      "/activity",
      "/export",
    ]);
  });
  it("hides settings, staff, activity and export from staff", () => {
    const hrefs = navFor("STAFF").map((i) => i.href);
    for (const hidden of ["/settings", "/staff", "/activity", "/export"]) {
      expect(hrefs).not.toContain(hidden);
    }
    expect(hrefs).toContain("/orders");
  });
});
