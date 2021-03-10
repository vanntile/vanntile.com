import Head from 'next/head'
import Date from '../../components/Date'
import { getAllPostIds, getPostData } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'
import { PostData, PostIdParams } from '../../types/types'

const Post = ({ postData }: { postData: PostData }): JSX.Element => {
  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date as string} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml as string }} />
      </article>
    </>
  )
}

export const getStaticPaths = (): { paths: PostIdParams[]; fallback: boolean } => ({
  paths: getAllPostIds(),
  fallback: false,
})

export const getStaticProps = async ({ params }: PostIdParams): Promise<{ props: { postData: PostData } }> => ({
  props: { postData: await getPostData(params.id) },
})

export default Post
