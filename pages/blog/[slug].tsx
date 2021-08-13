import { BlogLayout, MDXComponents } from '@vcomponents'
import { getFileBySlug, getSlugs } from '@vlib/mdx'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { MDXRemote } from 'next-mdx-remote'
import { ParsedUrlQuery } from 'querystring'

interface Params extends ParsedUrlQuery {
  slug: string
}

const BlogPost: NextPage<MDXFile> = ({ contentMDX, frontMatter }) => (
  <BlogLayout frontMatter={frontMatter}>
    <MDXRemote {...contentMDX} components={MDXComponents} />
  </BlogLayout>
)

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
