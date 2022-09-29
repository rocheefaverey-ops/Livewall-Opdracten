const ContentSecurityPolicy = `
  default-src 'none'; 
  media-src 'self'; 
  prefetch-src 'self'; 
  connect-src 'self'; 
  font-src 'self' 'unsafe-inline' https://fonts.gstatic.com; 
  img-src 'self' data: https://www.gravatar.com https://storage.googleapis.com; 
  script-src 'self'; 
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com/;
  frame-src 'self';
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
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'same-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
  }
];

// @type {import('next').NextConfig}
const nextConfig = {
  reactStrictMode: true,
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
  async headers() {
    return process.env.APP_ENV === 'development' ? [] : [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
  images: {
    domains: ['images.pexels.com', 'images.unsplash.com', 'images.ctfassets.net', 'd21buns5ku92am.cloudfront.net']
  },
  i18n: {
    locales: ['nl-NL', 'en-US'],
    defaultLocale: 'nl-NL',
  },

  // Enables scroll restoration when you go back to previous page
  experimental: {
    scrollRestoration: true
  },
}

module.exports = nextConfig;
