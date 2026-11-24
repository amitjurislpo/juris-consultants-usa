import type { NextConfig } from "next";
import { BLOG_URL } from "./src/lib/links";

const nextConfig: NextConfig = {
  transpilePackages: ["@juris/core", "@juris/db", "@juris/ui"],
  async redirects() {
    return [
      { source: "/blog", destination: BLOG_URL, permanent: false },
      { source: "/blog/:path*", destination: BLOG_URL, permanent: false },
    ];
  },
};

export default nextConfig;
