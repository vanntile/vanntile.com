import Link from 'next/link'
import Image from 'next/image'
import ProsCard from './ProsCard'
import ConsCard from './ConsCard'

const CustomLink = (props: Record<string, any>): JSX.Element => {
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

const MDXComponents = {
  Image,
  a: CustomLink,
  ProsCard,
  ConsCard,
}

export default MDXComponents
