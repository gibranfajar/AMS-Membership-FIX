import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'web.amscorp.id',  // Domain pertama
        pathname: '/imagestorage/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',  // Domain kedua
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
