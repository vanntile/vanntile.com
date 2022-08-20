import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'
import remarkAutolinkHeadings from 'rehype-autolink-headings'
import remarkCodeTitles from 'remark-code-titles'
import remarkHint from 'remark-hint'
import remarkHtml from 'remark-html'
import remarkSlug from 'remark-slug'
import remarkToc from 'remark-toc'
import { remarkReadingTime } from './src/lib/plugins.mjs'

// https://astro.build/config
export default defineConfig({
  site: 'https://vanntile.com',
  markdown: {
    syntaxHighlight: 'prism',
  },
  integrations: [
    tailwind({ config: { applyBaseStyles: false } }),
    mdx({
      remarkPlugins: {
        extends: [
          [
            remarkToc,
            {
              tight: true,
              ordered: true,
            },
          ],
          remarkCodeTitles,
          remarkSlug,
          remarkHint,
          remarkHtml,
          remarkReadingTime,
        ],
      },
      rehypePlugins: [
        [
          remarkAutolinkHeadings,
          {
            behavior: 'prepend',
            properties: {
              ariaLabel: 'Anchor',
              tabIndex: -1,
              className: ['icon-link'],
            },
          },
        ],
      ],
    }),
  ],
})
