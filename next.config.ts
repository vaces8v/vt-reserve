import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  reactCompiler: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  headers: async () => [
    {
      source: '/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
    {
      source: '/_next/static/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
  ],
};

export default nextConfig;
