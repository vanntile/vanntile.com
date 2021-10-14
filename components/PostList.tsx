import Link from 'next/link'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'

interface Props {
  posts: MDXFile[]
  readMore?: boolean
}

const PostList: React.FC<Props> = ({ posts, readMore }) => (
  <>
    {posts.map(({ frontMatter: { slug, title, summary, publishedAt } }) => (
      <div key={slug} className="py-4">
        <p className="my-0">
          <time dateTime={publishedAt}>{format(parseISO(publishedAt), 'LLLL d, yyyy')}</time>
        </p>
        <Link href={`/blog/${slug}`}>
          <a className="text-brand dark:text-brand-accent">{title}</a>
        </Link>
        <p className="my-1">{summary}</p>
        {readMore && (
          <Link href={`/blog/${slug}`}>
            <a className="inline-block mt-2 cta">Read more</a>
          </Link>
        )}
      </div>
    ))}
  </>
)

export default PostList
