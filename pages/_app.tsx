import Head from 'next/head'
import React from 'react'
import '../styles/globals.css'

type Props = {
  Component: React.ElementType
  pageProps: any
}

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
