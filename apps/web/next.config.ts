import type { NextConfig } from "next";
import { BLOG_ORIGIN } from "./src/lib/links";

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
      { source: "/blog/:path*", destination: "/blogs", permanent: false },
    ];
  },
  async rewrites() {
    return {
      // Live site: the existing blog is served at /blogs and takes priority over the sample
      // blog pages in this app (which are only for the test site).
      beforeFiles: BLOG_ORIGIN
        ? [
            { source: "/blogs", destination: `${BLOG_ORIGIN}/blogs` },
            {
              source: "/blogs/:path*",
              destination: `${BLOG_ORIGIN}/blogs/:path*`,
            },
          ]
        : [],
      // The old sign-up address now shows the login / create-account page.
      afterFiles: [{ source: "/signup", destination: "/login" }],
      fallback: [],
    };
  },
};

export default nextConfig;
