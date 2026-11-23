import type { MetadataRoute } from "next";
import { services } from "../components/marketing/content";

const deploymentHost =
  process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
const siteUrl = deploymentHost
  ? `https://${deploymentHost}`
  : "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/services",
    "/pricing",
    "/how-it-works",
    "/about",
    "/contact",
    "/faq",
    "/blog",
    "/legal/privacy",
    "/legal/terms",
    "/legal/refund",
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
