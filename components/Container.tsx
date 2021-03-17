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
    title: `vanntile's portfolio - developer by choice and designer for fun`,
    description: `Frontend developer and graphic designer.`,
    image: 'https://vanntile.com/static/images/banner.png',
    type: 'website',
    ...customMeta,
  } as Record<string, string>

  return (
    <div className="max-w-none min-h-screen w-full px-6 bg-white dark:bg-black">
      <Head>
        <title>{meta.title}</title>
        <meta content="text/html; charset=utf-8" httpEquiv="content-type" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="follow, index" />
        <meta name="application-name" content={meta.title} />
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={`https://vanntile.com${router.asPath}`} />
        {meta.date && <meta property="article:published_time" content={meta.date} />}
        <meta property="og:url" content={`https://vanntile.com${router.asPath}`} />
        <meta property="og:site_name" content="vanntile's portfolio" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@vanntile" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
      </Head>
      {router.asPath === '/' ? (
        <main className="flex flex-col justify-center py-16">{children}</main>
      ) : (
        <div className="prose prose-sm md:prose 2xl:prose-2xl dark:prose-dark max-w-full md:max-w-3xl 2xl:max-w-6xl mx-auto">
          {mounted && <Navigation theme={theme} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />}
          <main className="pt-8 pb-32">{children}</main>
        </div>
      )}
    </div>
  )
}

export default Container
