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

export enum Status {
  Sent = 'Message sent',
  Error = 'Sending error',
  RateLimited = 'Rate limit exceeded',
}
