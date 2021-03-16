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
      csp = `style-src 'self' 'unsafe-inline'; font-src 'self' data:; default-src 'self'; script-src 'unsafe-eval' 'self' ${cspHashOf(
        NextScript.getInlineScriptSource(this.props),
      )}`
    }

    return (
      <Html lang="en">
        <Head>
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
