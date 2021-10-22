import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

const root = process.cwd()

const getFilenames = (dir: string): string[] =>
  fs.readdirSync(path.join(root, 'data', dir)).map((n) => n.replace(/\.mdx$/, ''))

export const getSlugs = (dir: string): { params: { slug: string } }[] =>
  getFilenames(dir).map((fileName) => ({ params: { slug: fileName } }))

export const getPostsMeta = (dir: string): PageMeta[] =>
  getFilenames(dir)
    .map((slug: string) => ({ ...matter.read(`./data/${dir}/${slug}.mdx`).data, slug } as PageMeta))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
