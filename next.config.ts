import type { NextConfig } from 'next';
import path from 'node:path';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'ohotaktiv.ru', pathname: '/upload/**' }],
  },
  sassOptions: {
    loadPaths: [path.join(process.cwd(), 'src/shared/styles')],
  },
};

export default nextConfig;
