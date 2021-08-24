import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class CustomDocument extends Document {
  render(): JSX.Element {
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
            href="/fonts/Objectivity-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Objectivity-Bold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        </Head>
        <body className="selection:bg-brand selection:text-gray-50 dark:selection:bg-gray-100 dark:selection:text-brand">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
