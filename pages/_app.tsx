import { MDXProvider } from '@mdx-js/react'
import { MDXComponents } from '@vcomponents'
import '@vstyles/globals.css'
import '@vstyles/nprogress.css'
import { ThemeProvider } from 'next-themes'
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

const App: React.FC<Props> = ({ Component, pageProps }): JSX.Element => (
  <ThemeProvider attribute="class">
    <MDXProvider components={MDXComponents}>
      <Component {...pageProps} />
    </MDXProvider>
  </ThemeProvider>
)

export default App
