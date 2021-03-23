import { Container } from '@vcomponents'
import Link from 'next/link'

const IndexPage = (): JSX.Element => (
  <Container>
    <h1 className="text-4xl text-black dark:text-white">Hello Next.js 👋</h1>
    <div>
      <Link href="/blog">
        <a className="leading-6">Blog again</a>
      </Link>
    </div>
  </Container>
)

export default IndexPage
