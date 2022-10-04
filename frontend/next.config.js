/* eslint-disable @typescript-eslint/no-var-requires */
const { createSecureHeaders } = require('next-secure-headers');
const { i18n } = require('./next-i18next.config');

module.exports = {
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
    if (process.env.NODE_ENV !== 'development') {
      const whitelistedDomains = [
        'self', // always allow from same domain
        '*.googleapis.com', // for fonts and assets
        '*.gstatic.com' // google cdn
      ];

      return [
        {
          source: '/(.*)',
          headers: createSecureHeaders({
            contentSecurityPolicy: {
              directives: {
                defaultSrc: "'self'",
                frameAncestors: "'self'",
                mediaSrc: ['self'], // for <audio> and <video>
                connectSrc: whitelistedDomains,
                frameSrc: whitelistedDomains,
                scriptSrc: [...whitelistedDomains],
                styleSrc: [...whitelistedDomains],
                fontSrc: ['data:', ...whitelistedDomains],
                imgSrc: [
                  'data:', // for <svg> and other base64 encoded images
                  ...whitelistedDomains
                ]
              }
            },
            forceHTTPSRedirect: [true, { maxAge: 60 * 60 * 24 * 4, includeSubDomains: true }],
            referrerPolicy: 'same-origin'
          })
        }
      ];
    }
    return [];
  },

  // Enables scroll restoration when you go back to previous page
  experimental: {
    scrollRestoration: true
  }
};
