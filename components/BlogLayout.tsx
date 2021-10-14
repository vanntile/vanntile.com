import { Container } from '@vcomponents'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'

interface Props {
  children: React.ReactNode
  frontMatter: MDXMeta
}

const BlogLayout: React.FC<Props> = ({ children, frontMatter: { title, summary, publishedAt, image, reading } }) => (
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
        <time dateTime={publishedAt}>{format(parseISO(publishedAt), 'LLLL d, yyyy')}</time>, {reading.text}
      </div>
      <div className="max-w-full">{children}</div>
    </article>
  </Container>
)

export default BlogLayout
