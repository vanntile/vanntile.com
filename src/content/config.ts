import { defineCollection, z } from 'astro:content'

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    publishedAt: z.date(),
    summary: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    keywords: z.string().transform((str) => str.split(',')),
    nextArticle: z.string().optional(),
  }),
})

export const collections = {
  blog: blogCollection,
}
