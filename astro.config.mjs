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
import { remarkReadingTime } from './src/lib/plugins'
import shikiThemes from './src/lib/shikiThemes'
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
          keepBackground: true,
          transformers: [
            transformerNotationDiff(),
            transformerNotationHighlight(),
            transformerNotationFocus(),
            transformerNotationErrorLevel({
              classActivePre: 'has-error',
            }),
          ],
          getHighlighter: async (options) => {
            const highlighter = await createHighlighter({ ...options })
            const codeToHtml = highlighter.codeToHtml
            highlighter.codeToHtml = (code, options) =>
              codeToHtml(code, {
                ...options,
                themes: {
                  0: shikiThemes.andromeedaTheme,
                  1: shikiThemes.darkPlusTheme,
                  2: shikiThemes.materialLighterTheme,
                  3: shikiThemes.materialOceanTheme,
                  4: shikiThemes.materialPalenightTheme,
                  5: shikiThemes.minLightTheme,
                  6: shikiThemes.moonlightIITheme,
                  7: shikiThemes.myEyesPleaseTheme,
                  8: shikiThemes.oneDarkProTheme,
                  9: shikiThemes.redTheme,
                  10: shikiThemes.solarizedLightTheme,
                  11: shikiThemes.synthwave84Theme,
                },
                defaultColor: '6',
                cssVariablePrefix: '--st',
              })

            return highlighter
          },
        },
      ],
      // [rehypeShikiStylesToClasses, { stylePrefix: '--dynamic-shiki-', classPrefix: 'shiki-' }],
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
