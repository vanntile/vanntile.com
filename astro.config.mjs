import markdoc from '@astrojs/markdoc'
import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeSortAttributes from 'rehype-sort-attributes'
import rehypeToc from 'rehype-toc'
import remarkHint from 'remark-hint'
import { getHighlighter } from 'shiki'
import {
  rehypePrettyCodeStyleToClass,
  remarkReadingTime,
  replaceCSSVariablesForShikiTheme,
} from './src/lib/plugins.mjs'
import moonlightColors from './src/styles/moonlight-ii-color-replacement.json'
import moonlightTheme from './src/styles/moonlight-ii.json'

const prettyCodeOptions = {
  // docs: https://rehype-pretty-code.netlify.app/
  theme: replaceCSSVariablesForShikiTheme(moonlightTheme, moonlightColors), // 'material-palenight'
  keepBackground: false,

  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode, and allow empty lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }]
    }
  },

  onVisitHighlightedLine(node) {
    node.properties.className.push('highlighted')
  },

  onVisitHighlightedWord(node) {
    node.properties.className = ['word']
  },

  getHighlighter: async (options) => {
    const highlighter = await getHighlighter(options)
    highlighter.setColorReplacements(
      Object.fromEntries(Object.entries(moonlightColors).map(([k, v]) => [k, `var(${v})`])),
    )
    return Promise.resolve(highlighter)
  },
}

// https://astro.build/config
export default defineConfig({
  site: 'https://vanntile.com',
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkHint, remarkReadingTime],
    rehypePlugins: [
      [rehypePrettyCode, prettyCodeOptions],
      [rehypePrettyCodeStyleToClass, { stylesMap: [['font-style: italic', 'italic']] }],
      [
        rehypeToc,
        {
          nav: false,
          cssClasses: {
            list: '',
            listItem: '',
            link: '',
          },
        },
      ],
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'prepend',
          properties: {
            ariaLabel: 'Anchor',
            tabIndex: -1,
            className: ['icon-link'],
          },
        },
      ],
      rehypeSortAttributes,
    ],
  },
  integrations: [tailwind({ config: { applyBaseStyles: false } }), mdx(), markdoc()],
})
