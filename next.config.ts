import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["via.placeholder.com", "web.amscorp.id", "www.google.com"],
  },
};

export default nextConfig;