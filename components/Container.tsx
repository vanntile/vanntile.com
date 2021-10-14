import { Navigation } from '@vcomponents'
import { useTheme } from 'next-themes'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface Props {
  children: React.ReactNode
  [key: string]: any
}

const Container: React.FC<Props> = ({ children, ...customMeta }: Props) => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  useEffect(() => setMounted(true), [])

  const meta = {
    title: `vanntile - frontend developer and graphic designer`,
    description: `Developer by choice and designer for fun. I speak the languages of both engineering and aesthetics and can help with your next project.`,
    image: 'banner.png',
    type: 'website',
    ...customMeta,
  } as Record<string, string>

  return (
    <div className="w-full min-h-screen bg-white max-w-none dark:bg-gray-900">
      <Head>
        <title>{meta.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="follow, index" />
        <meta name="application-name" content={meta.title} />
        <meta name="author" content="vanntile" />
        <meta name="description" content={meta.description} />
        {meta.tags && <meta name="keywords" content={meta.tags} />}
        <link rel="canonical" href={`https://vanntile.com${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        {meta.type === 'article' && (
          <>
            <meta property="article:author" content="https://www.facebook.com/vanntile/" />
            {meta.date && <meta property="article:published_time" content={meta.date} />}
          </>
        )}
        <meta property="og:url" content={`https://vanntile.com${router.asPath}`} />
        <meta property="og:site_name" content="vanntile's portfolio" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={`https://vanntile.com/images/${meta.image}`} />
        <meta property="og:image:width" content="1600" />
        <meta property="og:image:height" content="800" />
        <meta property="og:locale" content="en_US" />
        <meta property="twitter:domain" content="vanntile.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@vanntile" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={`https://vanntile.com/images/${meta.image}`} />
        {meta.type === 'article' && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'BlogPosting',
                headline: meta.title,
                image: meta.image,
                author: {
                  '@type': 'Person',
                  name: 'vanntile',
                  url: 'https://vanntile.com',
                },
                keywords: meta.tags ? meta.tags.replace(',', '') : undefined,
                wordcount: meta.wordcount ? meta.wordcount : undefined,
                url: `https://vanntile.com${router.asPath}`,
                mainEntityOfPage: {
                  '@type': 'WebPage',
                  '@id': 'https://google.com/article',
                },
                datePublished: meta.date ? meta.date : undefined,
                description: meta.description,
              }),
            }}
          />
        )}
      </Head>
      {router.asPath === '/' ? (
        <main className="flex flex-col justify-center bg-gray-900 text-brand-tint home">{children}</main>
      ) : (
        <div className="max-w-full px-6 mx-auto md:max-w-2xl xl:max-w-3xl 2xl:max-w-6xl">
          {mounted && <Navigation theme={theme} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />}
          <main className="pt-8 pb-32">{children}</main>
        </div>
      )}
    </div>
  )
}

export default Container
