const mdx = require('@next/mdx')
const headings = require('remark-autolink-headings')
const codeTitle = require('remark-code-titles')
const html = require('remark-html')
const remarkSlug = require('remark-slug')

const withMDX = mdx({
  options: {
    remarkPlugins: [codeTitle, remarkSlug, headings, html],
    rehypePlugins: [],
  },
})

module.exports = withMDX({
  pageExtensions: ['mdx', 'jsx', 'js', 'ts', 'tsx'],
})
