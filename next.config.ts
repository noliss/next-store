import type { NextConfig } from 'next';
import path from 'node:path';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: process.env.DISABLE_IMAGE_OPTIMIZATION === 'true',
    remotePatterns: [{ protocol: 'https', hostname: 'ohotaktiv.ru', pathname: '/upload/**' }],
  },
  sassOptions: {
    loadPaths: [path.join(process.cwd(), 'src/shared/styles')],
  },
};

export default nextConfig;
