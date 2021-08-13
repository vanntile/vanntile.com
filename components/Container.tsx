import { Navigation } from '@vcomponents'
import { useTheme } from 'next-themes'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

interface Props {
  children: React.ReactNode
  [key: string]: any
}

const Container: React.FC<Props> = ({ children, ...customMeta }): JSX.Element => {
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
        <meta content="text/html; charset=utf-8" httpEquiv="content-type" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="follow, index" />
        <meta name="application-name" content={meta.title} />
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={`https://vanntile.com${router.asPath}`} />
        {meta.date && <meta property="article:published_time" content={meta.date} />}
        {meta.tags && <meta name="keywords" content={meta.tags} />}
        <meta property="og:url" content={`https://vanntile.com${router.asPath}`} />
        <meta property="og:site_name" content="vanntile's portfolio" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={`https://vanntile.com/images/${meta.image}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@vanntile" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={`https://vanntile.com/images/${meta.image}`} />
      </Head>
      {router.asPath === '/' ? (
        <main className="flex flex-col justify-center bg-gray-900 text-brand-tint home">{children}</main>
      ) : (
        <div className="max-w-full px-6 mx-auto md:max-w-2xl 2xl:max-w-6xl">
          {mounted && <Navigation theme={theme} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />}
          <main className="pt-8 pb-32">{children}</main>
        </div>
      )}
    </div>
  )
}

export default Container
