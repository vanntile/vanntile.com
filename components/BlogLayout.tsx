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
    <article className="flex flex-col items-start justify-center">
      <h1>{title}</h1>
      <div className="text-gray-400 dark:text-brand-secondary">
        <ArticleDate dateString={publishedAt} />, {reading.text}
      </div>
      {children}
    </article>
  </Container>
)

export default BlogLayout
