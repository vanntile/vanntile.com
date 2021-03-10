import Link from 'next/link'
import Layout from '../components/Layout'

const IndexPage = (): JSX.Element => (
  <Layout title="Portfolio">
    <div className="w-full">
      <h1 className="text-4xl">Hello Next.js 👋</h1>
      <p>
        <Link href="/about">
          <a className="leading-6 underline text-black-600 hover:text-blue-600 visited:text-purple-600 transition-colors">
            About again
          </a>
        </Link>
      </p>
    </div>
  </Layout>
)

export default IndexPage
