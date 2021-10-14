interface PageMeta {
  title: string
  publishedAt: string
  summary: string
  image: string
  tags?: string[]
}

interface IReadTimeResults {
  text: string
  time: number
  words: number
  minutes: number
}

interface MDXMeta extends PageMeta {
  slug: string
  reading: IReadTimeResults
}
interface MDXFile {
  contentMDX: import('next-mdx-remote/types').MDXRemoteSerializeResult
  frontMatter: MDXMeta
  componentNames: string[]
}
