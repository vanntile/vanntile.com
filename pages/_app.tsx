import Head from 'next/head'
import Router from 'next/router'
import { done, start } from 'nprogress'
import React from 'react'
import '../styles/globals.css'
import '../styles/nprogress.css'

type Props = {
  Component: React.ElementType
  pageProps: any
}

Router.events.on('routeChangeStart', () => start())
Router.events.on('routeChangeComplete', () => done())
Router.events.on('routeChangeError', () => done())

const App: React.FC<Props> = ({ Component, pageProps }): JSX.Element => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="px-12 py-16">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default App
