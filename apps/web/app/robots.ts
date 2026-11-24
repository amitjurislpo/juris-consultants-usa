import type { MetadataRoute } from "next";

const deploymentHost =
  process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
const siteUrl = deploymentHost
  ? `https://${deploymentHost}`
  : "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  // Search engines are blocked until ALLOW_INDEXING=true is set for the live site.
  if (process.env.ALLOW_INDEXING !== "true") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
