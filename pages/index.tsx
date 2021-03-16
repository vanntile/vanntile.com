import { Container, Header } from '@vcomponents'
import Link from 'next/link'

const IndexPage = (): JSX.Element => (
  <Container>
    <Header />
    <h1 className="text-4xl">Hello Next.js 👋</h1>
    <p>
      <Link href="/about">
        <a className="leading-6 underline text-black-600 hover:text-blue-600 visited:text-purple-600 transition-colors">
          About again
        </a>
      </Link>
    </p>
  </Container>
)

export default IndexPage
