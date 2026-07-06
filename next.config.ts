import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://res.cloudinary.com/dvpkp0u9u/image/upload/**'),
    ],
  },
};

export default nextConfig;
