import { defineCollection, z } from 'astro:content'

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    publishedAt: z.date(),
    description: z.string().min(50).max(160),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    keywords: z.array(z.string()),
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
