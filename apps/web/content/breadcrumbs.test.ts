import { buildPathCrumbs } from "@juris/ui";
import { describe, expect, it } from "vitest";
import { PORTAL_CRUMBS, SITE_CRUMBS } from "./breadcrumbs";

const names = (path: string, config = SITE_CRUMBS) =>
  buildPathCrumbs(path, config)?.map((c) => c.label);

describe("breadcrumbs", () => {
  it("shows nothing on the home page", () => {
    expect(buildPathCrumbs("/", SITE_CRUMBS)).toBeNull();
  });

  it("names website pages and marks the last one as current", () => {
    expect(names("/about")).toEqual(["Home", "About Us"]);
    const crumbs = buildPathCrumbs("/services/llc-formation", SITE_CRUMBS);
    expect(crumbs?.map((c) => c.label)).toEqual([
      "Home",
      "Services",
      "US LLC Formation",
    ]);
    expect(crumbs?.map((c) => c.current)).toEqual([false, false, true]);
    expect(crumbs?.[1]?.href).toBe("/services");
  });

  it("builds the customer portal trail and names order detail pages", () => {
    expect(names("/account/dashboard", PORTAL_CRUMBS)).toEqual([
      "Home",
      "My account",
      "Dashboard",
    ]);
    expect(names("/account/orders/abc123", PORTAL_CRUMBS)).toEqual([
      "Home",
      "My account",
      "My orders",
      "Order details",
    ]);
  });

  it("supports a wildcard in the middle of a path (admin style)", () => {
    const admin = {
      root: [{ label: "Dashboard", href: "/" }],
      labels: {
        "/customers": "Customers",
        "/customers/*": "Customer details",
        "/customers/*/preview": "Portal preview",
      },
    };
    expect(names("/customers/42/preview", admin)).toEqual([
      "Dashboard",
      "Customers",
      "Customer details",
      "Portal preview",
    ]);
  });

  it("falls back to a readable name for unlisted pages", () => {
    expect(names("/some-new-page")).toEqual(["Home", "Some new page"]);
  });
});
