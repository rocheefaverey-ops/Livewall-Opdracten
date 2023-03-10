/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
const crypto = require('crypto');
const { i18n } = require('./next-i18next.config');

const allowedNonce = crypto.randomBytes(16).toString('base64');

const ContentSecurityPolicy = `
  default-src 'none'; 
  frame-ancestors 'none'; 
  frame-src https://consentcdn.cookiebot.com; 
  media-src 'self'; 
  prefetch-src 'self';
  connect-src 'self' https://www.google-analytics.com https://consentcdn.cookiebot.com; 
  font-src 'self' 'unsafe-inline' data: https://use.typekit.net https://fonts.gstatic.com; 
  img-src 'self' data: blob:; 
  script-src 'self' 'nonce-${allowedNonce}' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net/en_US/fbevents.js https://consent.cookiebot.com https://consentcdn.cookiebot.com https://googleads.g.doubleclick.net; 
  style-src 'self' 'unsafe-inline' https://p.typekit.net https://use.typekit.net;
`;

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
  }
];

let nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });
    const rules = config.module.rules.find((rule) => typeof rule.oneOf === 'object').oneOf.filter((rule) => Array.isArray(rule.use));

    rules.forEach((rule) => {
      rule.use.forEach((moduleLoader) => {
        if (/css-loader[/\\](?:cjs|dist|src)/.test(moduleLoader.loader)) {
          if (typeof moduleLoader.options.modules === 'object') {
            // eslint-disable-next-line no-param-reassign
            moduleLoader.options.modules = {
              ...moduleLoader.options.modules,
              exportLocalsConvention: 'camelCase' // https://github.com/webpack-contrib/css-loader#exportlocalsconvention
            };
          }
        }
      });
    });

    return config;
  },
  i18n,
  reactStrictMode: true,

  images: {
    domains: ['c.tenor.com']
  },

  async headers() {
    return process.env.APP_ENV === 'development'
      ? []
      : [
          {
            // Apply these headers to all routes in your application.
            source: '/:path*',
            headers: securityHeaders
          }
        ];
  },

  // Enables scroll restoration when you go back to previous page
  experimental: {
    scrollRestoration: true
  }
};

// Check if ANALYZE env is set en if true start bundle-analyzer
const analyzeBundles = process.env.ANALYZE;

if (analyzeBundles) {
  const withNextBundleAnalyzer =
    // eslint-disable-next-line import/no-extraneous-dependencies
    require('@next/bundle-analyzer')();
  nextConfig = withNextBundleAnalyzer(nextConfig);
}

module.exports = { ...nextConfig, allowedNonce };
