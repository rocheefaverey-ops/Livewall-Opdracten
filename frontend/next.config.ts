import type { NextConfig } from 'next';

const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }
];

const cacheBustIndexHeaders = [
  { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
  { key: 'Pragma', value: 'no-cache' },
  { key: 'Expires', value: '0' }
];

const longCacheAssetHeaders = [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }];

const nextConfig: NextConfig = {
  images: { domains: [] },

  async headers() {
    return process.env.APP_ENV === 'development'
      ? []
      : [
          {
            source: '/',
            headers: [...securityHeaders, ...cacheBustIndexHeaders]
          },
          {
            source: '/_next/static/:path*',
            headers: longCacheAssetHeaders
          },
          {
            // Apply these headers to all routes in your application.
            source: '/:path*',
            headers: securityHeaders
          }
        ];
  }
};

export default nextConfig;
