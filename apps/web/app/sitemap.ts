import type { MetadataRoute } from "next";
import { services } from "../components/marketing/content";

import { siteUrl } from "../src/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/services",
    "/pricing",
    "/how-it-works",
    "/about",
    "/contacts",
    "/faq",
    "/track-order",
    "/start",
    "/privacy",
    "/terms",
    "/refund",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...services.map((service) => ({
      url: `${siteUrl}/services/${service.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
