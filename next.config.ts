import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    domains: [
      "end-point.team-crafter.com",
      "localhost",
      "www.paypalobjects.com",
    ],
  },
};

export default nextConfig;
