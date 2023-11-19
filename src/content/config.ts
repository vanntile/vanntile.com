import { defineCollection, z } from 'astro:content'

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    publishedAt: z.date(),
    summary: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    keywords: z.string().transform((str) => str.split(',')),
  }),
})

const iconCollection = defineCollection({
  type: 'data',
  schema: z.object({
    url: z.string().url(),
    alt: z.string(),
    path: z.string(),
    index: z.number(),
  }),
})

export const collections = {
  blog: blogCollection,
  icons: iconCollection,
}
