import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@juris/core", "@juris/db", "@juris/ui"],
};

export default nextConfig;
