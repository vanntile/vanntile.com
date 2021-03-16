import { MDXProvider } from '@mdx-js/react'
import { MDXComponents } from '@vcomponents'
import '@vstyles/globals.css'
import '@vstyles/nprogress.css'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import Router from 'next/router'
import { done, start } from 'nprogress'
import React from 'react'

type Props = {
  Component: React.ElementType
  pageProps: any
}

Router.events.on('routeChangeStart', () => start())
Router.events.on('routeChangeComplete', () => done())
Router.events.on('routeChangeError', () => done())

const App: React.FC<Props> = ({ Component, pageProps }): JSX.Element => {
  return (
    <ThemeProvider attribute="class">
      <MDXProvider components={MDXComponents}>
        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div className="px-12 py-16">
          <Component {...pageProps} />
        </div>
      </MDXProvider>
    </ThemeProvider>
  )
}

export default App
