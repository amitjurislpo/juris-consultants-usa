import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  transpilePackages: ["@juris/core", "@juris/db", "@juris/ui"],
};

export default nextConfig;
