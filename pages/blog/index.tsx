import Head from 'next/head'
import Link from 'next/link'
import Header from '../../components/Header'
import { getSortedPostsData } from '../../lib/posts'
import { PostData } from '../../types/types'

const Blog = ({ allPosts }: { allPosts: PostData[] }): JSX.Element => (
  <>
    <Head>
      <title>Blog</title>
    </Head>

    <Header />
    <h1 className="text-4xl">Blog posts</h1>
    {allPosts.map(({ id, title }) => (
      <p key={id}>
        <Link href={`/blog/${id}`}>
          <a className="leading-6 underline text-black-600 hover:text-blue-600 visited:text-purple-600 transition-colors">
            {title}
          </a>
        </Link>
      </p>
    ))}
  </>
)

export const getStaticProps = (): { props: { allPosts: PostData[] } } => ({ props: { allPosts: getSortedPostsData() } })

export default Blog
