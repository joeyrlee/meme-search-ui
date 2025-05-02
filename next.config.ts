import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://**.giphy.com/**')],
  },
};

export default nextConfig;
