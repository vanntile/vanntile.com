import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'

const IndexPage = (): JSX.Element => (
  <>
    <Head>
      <title>Portfolio</title>
    </Head>

    <Header />
    <h1 className="text-4xl">Hello Next.js 👋</h1>
    <p>
      <Link href="/about">
        <a className="leading-6 underline text-black-600 hover:text-blue-600 visited:text-purple-600 transition-colors">
          About again
        </a>
      </Link>
    </p>
  </>
)

export default IndexPage
