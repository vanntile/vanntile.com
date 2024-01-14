import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import rehypeToc from '@jsdevtools/rehype-toc'
import purgecss from 'astro-purgecss'
import { defineConfig } from 'astro/config'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeSortAttributes from 'rehype-sort-attributes'
import remarkHint from 'remark-hint'
import { loadEnv } from 'vite'
import { remarkReadingTime } from './src/lib/plugins'
import { initializeCloudinary } from './src/lib/utils'

const { IMG_CLOUD_NAME, IMG_API_KEY, IMG_API_SECRET } = loadEnv(process.env.NODE_ENV, process.cwd(), '')
initializeCloudinary(IMG_CLOUD_NAME, IMG_API_KEY, IMG_API_SECRET)

// https://astro.build/config
export default defineConfig({
  site: 'https://vanntile.com',
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkHint, remarkReadingTime],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: 'material-theme-ocean',
          keepBackground: false,
        },
      ],
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
    sitemap(),
  ],
})
