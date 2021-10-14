import { BlogLayout, defaultComponents, heavyComponents } from '@vcomponents'
import { getFileBySlug, getSlugs } from '@vlib/mdx'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
// import dynamic from 'next/dynamic'
import { MDXRemote } from 'next-mdx-remote'
import { ParsedUrlQuery } from 'querystring'

interface Params extends ParsedUrlQuery {
  slug: string
}

const BlogPost: NextPage<MDXFile> = ({ contentMDX, frontMatter, componentNames }) => {
  const heavyComponentsPresent = Object.fromEntries(
    Object.entries(heavyComponents).filter((e: [string, any]) => componentNames.includes(e[0])),
  )

  return (
    <BlogLayout frontMatter={frontMatter}>
      <MDXRemote
        {...contentMDX}
        components={{
          ...defaultComponents,
          ...heavyComponentsPresent,
        }}
      />
    </BlogLayout>
  )
}

export const getStaticPaths: GetStaticPaths<Params> = async () =>
  await Promise.resolve({
    paths: getSlugs('posts'),
    fallback: false,
  })

export const getStaticProps: GetStaticProps<MDXFile, Params> = async (context) => {
  const params = context.params as Params
  return { props: await getFileBySlug(params.slug, 'posts') }
}

export default BlogPost
