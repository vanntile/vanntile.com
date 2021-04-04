const mdx = require('@next/mdx')
const mdxPrism = require('mdx-prism')
const reHeadings = require('remark-autolink-headings')
const reCodeTitles = require('remark-code-titles')
const reHint = require('remark-hint')
const reHtml = require('remark-html')
const reSlug = require('remark-slug')
const reTOC = require('remark-toc')

const withMDX = mdx({
  options: {
    remarkPlugins: [reTOC, reCodeTitles, reSlug, reHeadings, reHint, reHtml],
    rehypePlugins: [mdxPrism],
  },
})

module.exports = withMDX({
  future: {
    webpack5: true,
  },
  pageExtensions: ['mdx', 'ts', 'tsx'],
})
