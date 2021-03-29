export interface PageMeta {
  title: string
  publishedAt: string
  summary: string
  image: string
}

export interface IReadTimeResults {
  text: string
  time: number
  words: number
  minutes: number
}

export interface MDXMeta extends PageMeta {
  slug: string
  reading: IReadTimeResults
}
export interface MDXFile {
  contentMDX: import('next-mdx-remote/types').MdxRemote.Source
  frontMatter: MDXMeta
}
