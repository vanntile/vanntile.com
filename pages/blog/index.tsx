import { Container, PostList } from '@vcomponents'
import { getPostsMeta } from '@vlib/mdx'
import { GetStaticProps, NextPage } from 'next'

interface Props {
  blogPosts: PageMeta[]
}

const Blog: NextPage<Props> = ({ blogPosts }) => (
  <Container
    title="Blog - vanntile's words"
    description="Articles on tech, software development, design and case studies."
  >
    <h1>Blog posts</h1>
    <PostList posts={blogPosts} readMore={true} />
  </Container>
)

export const getStaticProps: GetStaticProps<Props> = () => ({ props: { blogPosts: getPostsMeta('posts') } })

export default Blog
