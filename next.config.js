const { createSecureHeaders } = require('next-secure-headers')

const isProd = process.env.NODE_ENV === 'production'

// TODO: HTTPS redirect

module.exports = {
  experimental: {
    esmExternals: true,
  },
  pageExtensions: ['tsx'],
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
                isProd ? "'sha256-g2oW2Dny7QAk7D0xY1C8Kxov7kkFB5GX6bWOAvf8nuc='" : "'unsafe-inline'",
                "'unsafe-eval'", // TODO: find a way to MDX without this
              ],
              styleSrc: ["'self'", "'unsafe-inline'", isProd ? null : "'unsafe-eval'"],
              fontSrc: "'self'",
              objectSrc: "'none'",
              mediaSrc: "'none'",
              imgSrc: ["'self'", 'data:'],
              frameAncestors: "'none'",
              formAction: "'none'",
              workerSrc: "'none'",
              baseURI: "'self'",
            },
          },
          forceHTTPSRedirect: [true, { maxAge: 60 * 60 * 24 * 365, includeSubDomains: true, preload: true }],
          referrerPolicy: 'same-origin',
        }),
      },
      {
        source: '/(.*)',
        headers: [
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
          // Opt-out of Google FLoC: https://amifloced.org/
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ]
  },
}
