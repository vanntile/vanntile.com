import Head from 'next/head'
import React from 'react'
import Header from '../components/Header'

const About = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>

      <Header />
      <h1 className="text-4xl">About page</h1>
      <p>Some boring content</p>
    </>
  )
}

export default About