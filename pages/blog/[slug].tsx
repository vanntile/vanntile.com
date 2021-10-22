import { BlogLayout, CustomLink } from '@vcomponents'
import { getSlugs } from '@vlib/mdx'
import matter from 'gray-matter'
import mdxPrism from 'mdx-prism'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { ParsedUrlQuery } from 'querystring'
import readingTime, { ReadTimeResults } from 'reading-time'
import reHeadings from 'remark-autolink-headings'
import reCodeTitles from 'remark-code-titles'
import reHint from 'remark-hint'
import reHtml from 'remark-html'
import reSlug from 'remark-slug'
import reTOC from 'remark-toc'

interface Params extends ParsedUrlQuery {
  slug: string
}

interface MDXFile {
  source: MDXRemoteSerializeResult
  componentNames: string[]
  meta: PageMeta
  reading: ReadTimeResults
}

const heavyComponents = {
  AnimatedHeader: dynamic(() => import('../../components/AnimatedHeader')),
  NextArticleSection: dynamic(() => import('../../components/NextArticleSection')),
}

const BlogPost: NextPage<MDXFile> = ({ source, componentNames, meta, reading }) => (
  <BlogLayout meta={meta} reading={reading}>
    <MDXRemote
      {...source}
      components={{
        ...Object.fromEntries(
          Object.entries(heavyComponents).filter((e: [string, any]) => componentNames.includes(e[0])),
        ),
        Image,
        a: CustomLink,
      }}
    />
  </BlogLayout>
)

export const getStaticPaths: GetStaticPaths<Params> = async () =>
  await Promise.resolve({
    paths: getSlugs('posts'),
    fallback: false,
  })

export const getStaticProps: GetStaticProps<MDXFile, Params> = async (context) => {
  const params = context.params as Params
  const slug = params.slug

  // Plugin settings
  const tocOptions = {
    tight: true,
    ordered: true,
  }
  const autolinkOptions = {
    linkProperties: { ariaLabel: 'Anchor', tabIndex: -1, className: ['icon-link'] },
    content: {},
  }

  // Use gray-matter to parse the post metadata section
  const { data, content } = matter.read(`./data/posts/${slug}.mdx`)

  // Use remark to convert markdown into HTML string
  const source = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [[reTOC, tocOptions], reCodeTitles, reSlug, [reHeadings, autolinkOptions], reHint, reHtml],
      rehypePlugins: [mdxPrism],
    },
  })

  const componentNames = Object.keys(heavyComponents)
    .map((e) => (new RegExp(e).test(content) ? e : null))
    .filter(Boolean) as string[]

  return {
    props: {
      source,
      componentNames,
      meta: { ...(data as Omit<PageMeta, 'slug'>), slug },
      reading: readingTime(content),
    },
  }
}

export default BlogPost
