import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props): JSX.Element => (
  <div className="flex flex-row flex-wrap px-12 py-16">
    <Head>
      <title>{title}</title>
    </Head>
    <header className="w-full pb-8">
      <nav className="flex flex-row justify-center gap-5">
        <Link href="/">
          <a className="leading-6 underline text-black-600 hover:text-blue-600 visited:text-purple-600 transition-colors">
            Home
          </a>
        </Link>{' '}
        |{' '}
        <Link href="/about">
          <a className="leading-6 underline text-black-600 hover:text-blue-600 visited:text-purple-600 transition-colors">
            About
          </a>
        </Link>{' '}
        |{' '}
        <Link href="/users">
          <a className="leading-6 underline text-black-600 hover:text-blue-600 visited:text-purple-600 transition-colors">
            Users List
          </a>
        </Link>
      </nav>
    </header>
    {children}
    <footer className="w-full pt-12 text-center">
      <hr />
      <span>I'm here to stay</span>
    </footer>
  </div>
)

export default Layout
