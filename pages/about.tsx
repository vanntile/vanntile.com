import React from 'react'
import Layout from '../components/Layout'

const About = (): JSX.Element => {
  return (
    <Layout title="About">
      <div className="w-full">
        <h1 className="text-4xl">About page</h1>
        <p>Some boring content</p>
      </div>
    </Layout>
  )
}

export default About
