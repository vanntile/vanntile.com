import { BlogLayout } from '@vcomponents'
import { getFileBySlug, getSlugs } from '@vlib/mdx'
import { MDXFile } from '@vtypes/types'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'

interface Params extends ParsedUrlQuery {
  slug: string
}

const BlogPost: React.FC<MDXFile> = ({ contentMDX, frontMatter }): JSX.Element => (
  <BlogLayout frontMatter={frontMatter}>
    <div className="max-w-full" dangerouslySetInnerHTML={{ __html: contentMDX.renderedOutput }}></div>
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
