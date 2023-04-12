/// <reference types="astro/client" />

interface PageMeta {
  title: string
  publishedAt: string
  summary: string
  image: string
  imageAlt: string
  keywords: string
  readingTime?: string
  nextArticle?: string
}

interface ExternalSVG {
  href: string
  name: string
  d: string
}
