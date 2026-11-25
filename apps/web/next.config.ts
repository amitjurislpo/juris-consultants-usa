import type { NextConfig } from "next";
import { BLOG_ORIGIN, OLD_SITE } from "./src/lib/links";

const nextConfig: NextConfig = {
  transpilePackages: ["@juris/core", "@juris/db", "@juris/ui"],
  devIndicators: false, // hides the round "N" badge that covers the sidebar in dev
  async redirects() {
    return [
      // Same URLs as the old website, so search engines keep what they indexed.
      // These only catch addresses that may have been typed or shared by mistake.
      { source: "/contact", destination: "/contacts", permanent: true },
      { source: "/legal/privacy", destination: "/privacy", permanent: true },
      { source: "/legal/terms", destination: "/terms", permanent: true },
      { source: "/legal/refund", destination: "/refund", permanent: true },
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
    return [
      // The old sign-up address now shows the login / create-account page.
      { source: "/signup", destination: "/login" },
      ...(BLOG_ORIGIN
        ? [
            { source: "/blogs", destination: `${BLOG_ORIGIN}/blogs` },
            {
              source: "/blogs/:path*",
              destination: `${BLOG_ORIGIN}/blogs/:path*`,
            },
          ]
        : []),
    ];
  },
};

export default nextConfig;
