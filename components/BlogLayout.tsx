import { Date } from '@vcomponents'
import { MDXMeta } from '@vtypes/types'
import Head from 'next/head'
import utilStyles from '@vstyles/utils.module.css'

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
      <article className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className={utilStyles.headingXl}>{title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={publishedAt} />, {reading.text}
        </div>
        <div className="prose dark:prose-dark max-w-none w-full">{children}</div>
      </article>
    </>
  )
}

export default BlogLayout
