import { BlogLayout, MDXComponents } from '@vcomponents'
import { getFileBySlug, getSlugs } from '@vlib/mdx'
import { MDXFile, SlugParam } from '@vtypes/types'
import hydrate from 'next-mdx-remote/hydrate'

const BlogPost = ({ contentMDX, frontMatter }: MDXFile): JSX.Element => {
  const content = hydrate(contentMDX, {
    components: MDXComponents,
  })

  return <BlogLayout frontMatter={frontMatter}>{content}</BlogLayout>
}

export const getStaticPaths = (): { paths: SlugParam[]; fallback: boolean } => ({
  paths: getSlugs('posts'),
  fallback: false,
})

export const getStaticProps = async ({ params: { slug } }: SlugParam): Promise<{ props: MDXFile }> => ({
  props: await getFileBySlug(slug, 'posts'),
})

export default BlogPost
