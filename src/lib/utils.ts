import type { AstroIntegration } from 'astro'
import type { CollectionEntry } from 'astro:content'
import { v2 as cloudinary } from 'cloudinary'
import { parse } from 'node-html-parser'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

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

const createCspHash = async (s: string) => {
  const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s))
  const hashBase64 = btoa(String.fromCharCode(...new Uint8Array(hashBuffer)))

  return `'sha256-${hashBase64}'`
}

export const astroCSPHashGenerator: AstroIntegration = {
  name: 'astro-csp-hash-generator',
  hooks: {
    'astro:build:done': async ({ dir, pages, logger }) => {
      const hashes = new Map()
      const paths = Array.from({ length: pages.length }, (_, i) =>
        fileURLToPath(`${dir.href}${pages[i].pathname}index.html`),
      )
      let files: string[] = []
      try {
        files = await Promise.all(paths.map(async (filePath) => readFile(filePath, { encoding: 'utf-8' })))
      } catch (e) {
        logger.error(`Cannot read files: ${e}`)
      }
      logger.info(`Found ${files.length} files`)

      for (const file of files) {
        if (!file.includes('<script')) continue
        const scripts = parse(file).querySelectorAll('script')

        for (let i = 0; i < scripts.length; i++) {
          hashes.set(await createCspHash(scripts[i].textContent), true)
        }
      }

      logger.info('CSP script hashes: `' + [...hashes.keys()].join(' ') + '`')
    },
  },
}
