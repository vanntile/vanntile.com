const mdx = require('@next/mdx')
const mdxPrism = require('mdx-prism')
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')
const { createSecureHeaders } = require('next-secure-headers')
const reHeadings = require('remark-autolink-headings')
const reCodeTitles = require('remark-code-titles')
const reHint = require('remark-hint')
const reHtml = require('remark-html')
const reSlug = require('remark-slug')
const reTOC = require('remark-toc')

const isProd = process.env.NODE_ENV === 'production'

const withMDX = mdx({
  options: {
    remarkPlugins: [reTOC, reCodeTitles, reSlug, reHeadings, reHint, reHtml],
    rehypePlugins: [mdxPrism],
  },
})

// TODO: HTTPS redirect

module.exports = withMDX({
  future: {
    webpack5: true,
  },
  pageExtensions: ['mdx', 'ts', 'tsx'],
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
})
