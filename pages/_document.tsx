/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import crypto from 'crypto'
import Document, { Head, Html, Main, NextScript } from 'next/document'

const cspHashOf = (text: string) => {
  const hash = crypto.createHash('sha256')
  hash.update(text)
  return `'sha256-${hash.digest('base64')}'`
}
export default class MyDocument extends Document {
  render() {
    let csp = `default-src 'self'; script-src 'self' ${cspHashOf(NextScript.getInlineScriptSource(this.props))}`
    if (process.env.NODE_ENV !== 'production') {
      csp = `style-src 'self' 'unsafe-inline'; font-src 'self' data:; default-src 'self'; script-src 'unsafe-inline' 'unsafe-eval' 'self'`
    }

    return (
      <Html lang="en" className="dark">
        <Head>
          <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
          <link rel="manifest" href="/favicons/manifest.json" />
          <link rel="shortcut icon" href="/favicons/favicon.ico" />
          <meta name="apple-mobile-web-app-title" content="vanntile's portfolio" />
          <meta name="application-name" content="vanntile's portfolio" />
          <meta name="theme-color" content="#3429aa" />
          <link
            rel="preload"
            href="./fonts/Objectivity-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="./fonts/Objectivity-Bold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <meta httpEquiv="Content-Security-Policy" content={csp} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
