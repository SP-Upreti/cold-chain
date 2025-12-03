import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pub-969c218ddb2f4a29bbe25940c8760402.r2.dev',
        port: '',
        pathname: '/**',
      }
    ]
  },
  // Reduce concurrent API calls during build to avoid rate limiting
  experimental: {
    workerThreads: false,
    cpus: 1
  },
};

export default nextConfig;
