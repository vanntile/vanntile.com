import { Container } from '@vcomponents'
import { getSortedPostsData } from '@vlib/mdx'
import { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'

interface Props {
  allPosts: MDXFile[]
}

const Blog: NextPage<Props> = ({ allPosts }) => (
  <Container
    title="Blog - vanntile's words"
    description="Articles on tech, software development, design and case studies."
  >
    <h1>Blog posts</h1>
    {allPosts.map(({ frontMatter: { slug, title, summary, publishedAt } }) => (
      <div key={slug} className="pt-2 pb-4">
        <p className="mb-0">{publishedAt}</p>
        <Link href={`/blog/${slug}`}>{title}</Link>
        <p className="pl-2">{summary}</p>
        <Link href={`/blog/${slug}`}>
          <a className="cta">Read more</a>
        </Link>
      </div>
    ))}
  </Container>
)

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: { allPosts: await getSortedPostsData('posts') },
})

export default Blog
