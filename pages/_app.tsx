import React from 'react'
import '../styles/global.css'

type Props = {
  Component: React.ElementType
  pageProps: any
}

const App: React.FC<Props> = ({ Component, pageProps }): JSX.Element => {
  return <Component {...pageProps} />
}

export default App
