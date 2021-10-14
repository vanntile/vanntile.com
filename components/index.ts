import dynamic from 'next/dynamic'
import Image from 'next/image'
import CustomLink from './CustomLink'

const defaultComponents = {
  Image,
  a: CustomLink,
}

const heavyComponents = {
  ProsCard: dynamic(() => import('./ProsCard')),
  ConsCard: dynamic(() => import('./ConsCard')),
  NextArticleSection: dynamic(() => import('./NextArticleSection')),
}

export { CustomLink, defaultComponents, heavyComponents }

export { default as AnimatedHeader } from './AnimatedHeader'
export { default as BlogLayout } from './BlogLayout'
export { default as ConsCard } from './ConsCard'
export { default as ContactForm } from './ContactForm'
export { default as Container } from './Container'
export { default as ExperienceTabs } from './ExperienceTabs'
export { default as Navigation } from './Navigation'
export { default as NextArticleSection } from './NextArticleSection'
export { default as PostList } from './PostList'
export { default as ProsCard } from './ProsCard'
export { default as Tags } from './Tags'
export { default as TriangleDivider } from './TriangleDivider'
