import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  reactStrictMode: false,
  images: {
    domains: ["localhost", "www.paypalobjects.com", "files.team-crafter.com"],
  },
};

export default nextConfig;
