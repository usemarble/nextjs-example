import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.marblecms.com",
      },
    ],
  },
};

export default nextConfig;
