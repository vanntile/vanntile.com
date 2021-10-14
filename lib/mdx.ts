import { heavyComponents } from '@vcomponents'
import fs from 'fs'
import matter from 'gray-matter'
import mdxPrism from 'mdx-prism'
import { serialize } from 'next-mdx-remote/serialize'
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

export const getSlugs = (subfolder?: string): { params: { slug: string } }[] =>
  getFiles(subfolder).map((fileName) => ({ params: { slug: fileName.replace(/\.mdx$/, '') } }))

export const getFileBySlug = async (slug: string, subfolder?: string): Promise<MDXFile> => {
  const sourceFile = fs.readFileSync(
    path.join(root, 'data', ...(subfolder ? [subfolder, `${slug}.mdx`] : [`${slug}.mdx`])),
    'utf8',
  )

  // Use gray-matter to parse the post metadata section
  const { data, content } = matter(sourceFile)

  const tocOptions = {
    tight: true,
    ordered: true,
  }
  const autolinkOptions = {
    linkProperties: { ariaLabel: 'Anchor', tabIndex: -1, className: ['icon-link'] },
    content: {},
  }

  // Use remark to convert markdown into HTML string
  const contentMDX = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [[reTOC, tocOptions], reCodeTitles, reSlug, [reHeadings, autolinkOptions], reHint, reHtml],
      rehypePlugins: [mdxPrism],
    },
  })

  const componentNames = Object.keys(heavyComponents)
    .map((e) => (new RegExp(e).test(content) ? e : null))
    .filter(Boolean) as string[]

  return {
    contentMDX,
    frontMatter: {
      slug,
      ...(data as PageMeta),
      reading: readingTime(content),
    },
    componentNames,
  }
}

export const getSortedPostsData = async (subfolder?: string): Promise<MDXFile[]> =>
  (
    await Promise.all(
      getFiles(subfolder).map(async (fileName) => await getFileBySlug(fileName.replace(/\.mdx$/, ''), subfolder)),
    )
  ).sort((a, b) => (a.frontMatter.publishedAt < b.frontMatter.publishedAt ? 1 : -1))
