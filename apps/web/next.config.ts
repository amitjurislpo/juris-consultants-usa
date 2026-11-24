import type { NextConfig } from "next";
import { BLOG_ORIGIN, OLD_SITE } from "./src/lib/links";

const nextConfig: NextConfig = {
  transpilePackages: ["@juris/core", "@juris/db", "@juris/ui"],
  async redirects() {
    return [
      // Old website URLs (from its sitemap) that moved on the new site.
      { source: "/contacts", destination: "/contact", permanent: true },
      { source: "/signup", destination: "/login", permanent: true },
      { source: "/privacy", destination: "/legal/privacy", permanent: true },
      { source: "/terms", destination: "/legal/terms", permanent: true },
      // Older draft blog paths.
      {
        source: "/blog/:path*",
        destination: BLOG_ORIGIN ? "/blogs" : `${OLD_SITE}/blogs`,
        permanent: false,
      },
      ...(BLOG_ORIGIN
        ? []
        : [
            {
              source: "/blogs",
              destination: `${OLD_SITE}/blogs`,
              permanent: false,
            },
            {
              source: "/blogs/:path*",
              destination: `${OLD_SITE}/blogs/:path*`,
              permanent: false,
            },
          ]),
    ];
  },
  async rewrites() {
    if (!BLOG_ORIGIN) return [];
    return [
      { source: "/blogs", destination: `${BLOG_ORIGIN}/blogs` },
      { source: "/blogs/:path*", destination: `${BLOG_ORIGIN}/blogs/:path*` },
    ];
  },
};

export default nextConfig;
