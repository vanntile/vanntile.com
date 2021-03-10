import React from 'react'
import '../styles/globals.css'

type Props = {
  Component: React.ElementType
  pageProps: any
}

const App: React.FC<Props> = ({ Component, pageProps }): JSX.Element => {
  return <Component {...pageProps} />
}

export default App
