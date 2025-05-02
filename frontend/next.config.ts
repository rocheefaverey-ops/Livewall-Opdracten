import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
];

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [],
  },
  async headers() {
    return process.env.APP_ENV === "development"
      ? []
      : [
          {
            // Apply these headers to all routes in your application.
            source: "/:path*",
            headers: securityHeaders,
          },
        ];
  }
};

export default nextConfig;
