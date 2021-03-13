import { BlogLayout } from '@vcomponents'
import { getFileBySlug, getSlugs } from '@vlib/mdx'
import { MDXFile, SlugParam } from '@vtypes/types'

const BlogPost = ({ contentMDX, frontMatter }: MDXFile): JSX.Element => {
  return (
    <BlogLayout frontMatter={frontMatter}>
      <div dangerouslySetInnerHTML={{ __html: contentMDX.renderedOutput }}></div>
    </BlogLayout>
  )
}

export const getStaticPaths = (): { paths: SlugParam[]; fallback: boolean } => ({
  paths: getSlugs('posts'),
  fallback: false,
})

export const getStaticProps = async ({ params: { slug } }: SlugParam): Promise<{ props: MDXFile }> => ({
  props: await getFileBySlug(slug, 'posts'),
})

export default BlogPost
