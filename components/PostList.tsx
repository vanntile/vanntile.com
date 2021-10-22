import Link from 'next/link'

interface Props {
  posts: PageMeta[]
  readMore?: boolean
}

const PostList: React.FC<Props> = ({ posts, readMore }) => (
  <>
    {posts.map(({ slug, title, summary, publishedAt }) => (
      <div key={slug} className="py-4">
        <p className="my-0">
          <time dateTime={publishedAt}>
            {new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: '2-digit' }).format(
              new Date(publishedAt),
            )}
          </time>
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
