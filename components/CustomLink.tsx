import Link from 'next/link'

const CustomLink: React.FC<Record<string, any>> = (props) => {
  const { href } = props as { href: string }
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))

  return isInternalLink ? (
    <Link href={href}>
      <a {...props} />
    </Link>
  ) : (
    <a target="_blank" rel="noopener noreferrer" {...props} />
  )
}

export default CustomLink
