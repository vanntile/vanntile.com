import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import rehypeToc from '@jsdevtools/rehype-toc'
import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
} from '@shikijs/transformers'
import purgecss from 'astro-purgecss'
import { defineConfig } from 'astro/config'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeSortAttributes from 'rehype-sort-attributes'
import remarkHint from 'remark-hint'
import { createHighlighter } from 'shiki'
import { loadEnv } from 'vite'
import dynamicShikiTheme from './src/lib/dynamic-shiki-material.json'
import { rehypeShikiStylesToClasses, remarkReadingTime } from './src/lib/plugins'
import { astroCSPHashGenerator, initializeCloudinary } from './src/lib/utils'

const { IMG_CLOUD_NAME, IMG_API_KEY, IMG_API_SECRET } = loadEnv(process.env.NODE_ENV, process.cwd(), '')
initializeCloudinary(IMG_CLOUD_NAME, IMG_API_KEY, IMG_API_SECRET)

export default defineConfig({
  site: 'https://vanntile.com',
  vite: {
    assetsInclude: ['**/*.asc'],
  },
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkHint, remarkReadingTime],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: 'dynamic-shiki-material',
          keepBackground: false,
          transformers: [
            transformerNotationDiff(),
            transformerNotationHighlight(),
            transformerNotationFocus(),
            transformerNotationErrorLevel({
              classActivePre: 'has-error',
            }),
          ],
          getHighlighter: async (options) => createHighlighter({ ...options, themes: [dynamicShikiTheme] }),
        },
      ],
      [rehypeShikiStylesToClasses, { stylePrefix: '--dynamic-shiki-', classPrefix: 'shiki-' }],
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'prepend',
          properties: {
            ariaHidden: 'true',
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
  image: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: `/${IMG_CLOUD_NAME}/image/authenticated/**`,
      },
    ],
  },
  integrations: [
    mdx(),
    purgecss({
      fontFace: false,
      content: [process.cwd() + '/src/**/*.{astro,mdx,md}'],
    }),
    astroCSPHashGenerator,
    sitemap(),
  ],
})
