import { Container, ArticleDate } from '@vcomponents'
import { MDXMeta } from '@vtypes/types'

const BlogLayout = ({
  children,
  frontMatter: { title, summary, publishedAt, reading },
}: {
  children: React.ReactNode
  frontMatter: MDXMeta
}): JSX.Element => (
  <Container title={title} description={summary} date={new Date(publishedAt).toISOString()} type="article">
    <article className="prose prose-md dark:prose-dark flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
      <h1 className="text-4xl dark:text-gray-100">{title}</h1>
      <div className="text-gray-400">
        <ArticleDate dateString={publishedAt} />, {reading.text}
      </div>
      <div className="max-w-none w-full">{children}</div>
    </article>
  </Container>
)

export default BlogLayout
