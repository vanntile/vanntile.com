import { Container, Header } from '@vcomponents'
import { getSortedPostsData } from '@vlib/mdx'
import { MDXFile } from '@vtypes/types'
import Link from 'next/link'

const Blog = ({ allPosts }: { allPosts: MDXFile[] }): JSX.Element => (
  <Container
    title="Blog - vanntile's words"
    description="Articles on tech, software development, design and case studies."
  >
    <Header />
    <h1 className="text-4xl">Blog posts</h1>
    {allPosts.map(({ frontMatter: { slug, title, summary } }) => (
      <div key={slug} className="py-2">
        <Link href={`/blog/${slug}`}>
          <a className="text-lg leading-6 underline text-black-600 hover:text-blue-600 visited:text-purple-600 transition-colors">
            {title}
          </a>
        </Link>
        <p className="pl-2">{summary}</p>
      </div>
    ))}
  </Container>
)

export const getStaticProps = async (): Promise<{ props: { allPosts: MDXFile[] } }> => ({
  props: { allPosts: await getSortedPostsData('posts') },
})

export default Blog
