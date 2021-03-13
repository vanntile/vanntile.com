import Link from 'next/link'
import Image from 'next/image'
import ProsCard from './ProsCard'
import ConsCard from './ConsCard'

const CustomLink = (props: Record<string, any>): JSX.Element => {
  const { href } = props as { href: string }
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...props} />
      </Link>
    )
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

// export default function MDXCompProvider(props) {
//   const state = {
//     h1: props => <Heading as="h1" sx={{ mt: '3', mb: '2' }} {...props} />,
//     h2: props => <Heading as="h2" sx={{ mt: '3', mb: '2' }} {...props} />,
//     h3: props => <Heading as="h3" sx={{ mt: '3', mb: '2' }} {...props} />,
//     h4: props => <Heading as="h4" sx={{ mt: '3', mb: '2' }} {...props} />,
//     p: props => <Text as="p" sx={{ mb: '2', lineHeight: '2' }} {...props} />,
//     a: props => <Link as="a" sx={{ color: 'secondary', fontWeight: 'bold' }} {...props} />,
//   }

//   return (
//     <MDXProvider components={state}>
//       <Box {...props} />
//     </MDXProvider>
//   )
// }

const MDXComponents = {
  Image,
  a: CustomLink,
  ProsCard,
  ConsCard,
}

export default MDXComponents
