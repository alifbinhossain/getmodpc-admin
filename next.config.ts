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
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'play-lh.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'liteapks.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'getmodpc.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
