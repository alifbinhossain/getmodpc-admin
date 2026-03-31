import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.eu-west-3.idrivee2.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
