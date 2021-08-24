import { ArticleDate, Container } from '@vcomponents'

const BlogLayout = ({
  children,
  frontMatter: { title, summary, publishedAt, image, reading },
}: {
  children: React.ReactNode
  frontMatter: MDXMeta
}): JSX.Element => (
  <Container
    title={title}
    description={summary}
    date={new Date(publishedAt).toISOString()}
    image={image}
    type="article"
    wordcount={reading.words}
  >
    <article className="flex flex-col items-start justify-center">
      <h1>{title}</h1>
      <div className="text-gray-400 dark:text-brand-secondary">
        <ArticleDate dateString={publishedAt} />, {reading.text}
      </div>
      <div className="max-w-full">{children}</div>
    </article>
  </Container>
)

export default BlogLayout
