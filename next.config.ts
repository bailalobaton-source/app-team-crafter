import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    domains: [
      "end-point.team-crafter.com",
      "localhost",
      "www.paypalobjects.com",
      "server-image-team-crafter-production.up.railway.app",
    ],
  },
};

export default nextConfig;
