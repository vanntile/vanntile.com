const { createSecureHeaders } = require('next-secure-headers')

const isProd = process.env.NODE_ENV === 'production'

// TODO: HTTPS redirect

module.exports = {
  experimental: {
    esmExternals: true,
  },
  pageExtensions: ['mdx', 'tsx'],
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: createSecureHeaders({
          contentSecurityPolicy: {
            directives: {
              defaultSrc: "'self'",
              scriptSrc: [
                "'self'",
                isProd ? "'sha256-4b6neOQEfz/94vH7nVjqnqWI8K3KNB/U9aK4wMD5oYA='" : "'unsafe-inline'",
                "'unsafe-eval'", // TODO: find a way to MDX without this
              ],
              styleSrc: ["'self'", "'unsafe-inline'", isProd ? null : "'unsafe-eval'"],
              fontSrc: "'self'",
              objectSrc: "'none'",
              frameAncestors: "'none'",
              formAction: "'none'",
              baseURI: "'self'",
            },
          },
          forceHTTPSRedirect: [true, { maxAge: 60 * 60 * 24 * 30 * 6, includeSubDomains: true, preload: true }],
          referrerPolicy: 'same-origin',
        }),
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
}
