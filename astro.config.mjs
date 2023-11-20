import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import rehypeToc from '@jsdevtools/rehype-toc'
import { defineConfig } from 'astro/config'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeSortAttributes from 'rehype-sort-attributes'
import remarkHint from 'remark-hint'
import { getHighlighter } from 'shiki'
import { rehypePrettyCodeStyleToClass, remarkReadingTime, replaceCSSVariablesForShikiTheme } from './src/lib/plugins'
import moonlightColors from './src/styles/moonlight-ii-color-replacement.json'
import moonlightTheme from './src/styles/moonlight-ii.json'

const prettyCodeOptions = {
  // 'material-palenight'
  theme: replaceCSSVariablesForShikiTheme(moonlightTheme, moonlightColors),
  keepBackground: false,
  // docs: https://rehype-pretty-code.netlify.app/
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
      [
        rehypePrettyCodeStyleToClass,
        {
          stylesMap: [['font-style: italic', 'italic']],
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
            className: ['icon-link-anchor'],
          },
        },
      ],
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
      rehypeSortAttributes,
    ],
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
    sitemap(),
  ],
})
