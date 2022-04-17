import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://vanntile.com',
  markdown: {
    mode: 'mdx',
    syntaxHighlight: 'prism',
    remarkPlugins: [
      [
        'remark-toc',
        {
          tight: true,
          ordered: true,
        },
      ],
      'remark-code-titles',
      'remark-slug',
      'remark-hint',
      'remark-html',
    ],
    rehypePlugins: [
      [
        'rehype-autolink-headings',
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
  },
  integrations: [tailwind({ config: { applyBaseStyles: false } })],
})
