import type { CollectionEntry } from 'astro:content'
import { v2 as cloudinary } from 'cloudinary'

export const READABLE_FORMAT = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: '2-digit' })

export const blogCompareFn = (a: CollectionEntry<'blog'>, b: CollectionEntry<'blog'>) =>
  b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf()

export const initializeCloudinary = (cloud_name: string, api_key: string, api_secret: string) => {
  cloudinary.config({ cloud_name, api_key, api_secret, secure: true })
}

const isDev = import.meta.env.DEV
const devHost = import.meta.env.PUBLIC_IMG_DEV_HOST

export const getImageURL = async (filepath: string): Promise<string> => {
  try {
    if (isDev) {
      return `${devHost}${filepath}`
    }

    const publicID = filepath.substring(0, filepath.lastIndexOf('.')) || filepath
    const res = await cloudinary.api.resource(publicID, { secure: true, sign_url: true, type: 'authenticated' })

    return res.secure_url
  } catch (e) {
    console.error(e)

    return ''
  }
}
