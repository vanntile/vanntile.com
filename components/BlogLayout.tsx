import { Container } from '@vcomponents'
import { ReadTimeResults } from 'reading-time'

interface Props {
  children: React.ReactNode
  meta: PageMeta
  reading: ReadTimeResults
}

const BlogLayout: React.FC<Props> = ({ children, meta: { title, summary, publishedAt, image }, reading }) => (
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
        <time dateTime={publishedAt}>
          {new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: '2-digit' }).format(
            new Date(publishedAt),
          )}
        </time>
        , {reading.text}
      </div>
      <div className="max-w-full">{children}</div>
    </article>
  </Container>
)

export default BlogLayout
