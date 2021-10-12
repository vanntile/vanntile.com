import { Container, PostList } from '@vcomponents'
import { getSortedPostsData } from '@vlib/mdx'
import { GetStaticProps, NextPage } from 'next'

interface Props {
  blogPosts: MDXFile[]
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

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: { blogPosts: await getSortedPostsData('posts') },
})

export default Blog
