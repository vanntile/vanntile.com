import { MDXComponents } from '@vcomponents'
import { MDXFile, PageMeta, SlugParam } from '@vtypes/types'
import fs from 'fs'
import matter from 'gray-matter'
import mdxPrism from 'mdx-prism'
import renderToString from 'next-mdx-remote/render-to-string'
import path from 'path'
import readingTime from 'reading-time'
import reHeadings from 'remark-autolink-headings'
import reCodeTitles from 'remark-code-titles'
import reHint from 'remark-hint'
import reHtml from 'remark-html'
import reSlug from 'remark-slug'
import reTOC from 'remark-toc'

const root = process.cwd()

export const getFiles = (subfolder?: string): string[] =>
  fs.readdirSync(subfolder ? path.join(root, 'data', subfolder) : path.join(root, 'data'))

export const getSlugs = (subfolder?: string): SlugParam[] =>
  getFiles(subfolder).map((fileName) => ({ params: { slug: fileName.replace(/\.mdx$/, '') } }))

export const getFileBySlug = async (slug: string, subfolder?: string): Promise<MDXFile> => {
  const sourceFile = fs.readFileSync(
    path.join(root, 'data', ...(subfolder ? [subfolder, `${slug}.mdx`] : [`${slug}.mdx`])),
    'utf8',
  )

  // Use gray-matter to parse the post metadata section
  const { data, content } = matter(sourceFile)

  const autolinkOptions = {
    linkProperties: { ariaLabel: 'Anchor', tabIndex: -1, className: ['icon-link'] },
    content: {},
  }

  // Use remark to convert markdown into HTML string
  const contentMDX = await renderToString(content, {
    components: MDXComponents,
    mdxOptions: {
      remarkPlugins: [reTOC, reCodeTitles, reSlug, [reHeadings, autolinkOptions], reHint, reHtml],
      rehypePlugins: [mdxPrism],
    },
  })

  return {
    contentMDX,
    frontMatter: {
      slug,
      ...(data as PageMeta),
      reading: readingTime(content),
    },
  }
}

export const getSortedPostsData = async (subfolder?: string): Promise<MDXFile[]> =>
  (
    await Promise.all(
      getFiles(subfolder).map(async (fileName) => await getFileBySlug(fileName.replace(/\.mdx$/, ''), subfolder)),
    )
  ).sort((a, b) => (a.frontMatter.publishedAt < b.frontMatter.publishedAt ? 1 : -1))
