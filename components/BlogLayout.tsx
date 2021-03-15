import { Date } from '@vcomponents'
import { MDXMeta } from '@vtypes/types'
import Head from 'next/head'

const BlogLayout = ({
  children,
  frontMatter: { title, publishedAt, reading },
}: {
  children: React.ReactNode
  frontMatter: MDXMeta
}): JSX.Element => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <article className="prose prose-md dark:prose-dark flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl dark:text-gray-100">{title}</h1>
        <div className="text-gray-400">
          <Date dateString={publishedAt} />, {reading.text}
        </div>
        <div className="max-w-none w-full">{children}</div>
      </article>
    </>
  )
}

export default BlogLayout
