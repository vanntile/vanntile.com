interface PageMeta {
  title: string
  publishedAt: string
  summary: string
  image: string
  imageAlt: string
  keywords: string
  nextArticle?: string
}

interface ExternalSVG {
  href: string
  name: string
  d: string
}
