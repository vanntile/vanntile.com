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
  contentMDX: MdxRemote.Source
  frontMatter: MDXMeta
}

export type SlugParam = { params: { slug: string } }
