import type { CollectionEntry } from 'astro:content'

export const READABLE_FORMAT = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: '2-digit' })

export const blogCompareFn = (a: CollectionEntry<'blog'>, b: CollectionEntry<'blog'>) =>
  b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf()
