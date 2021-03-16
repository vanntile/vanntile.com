import Link from 'next/link'

const Header = (): JSX.Element => (
  <header className="w-full pb-8">
    <nav className="flex flex-row justify-center gap-5">
      <Link href="/">
        <a className="leading-6 underline text-black-600 hover:text-blue-600 visited:text-purple-600 transition-colors">
          Home
        </a>
      </Link>{' '}
      |{' '}
      <Link href="/blog">
        <a className="leading-6 underline text-black-600 hover:text-blue-600 visited:text-purple-600 transition-colors">
          Blog
        </a>
      </Link>
    </nav>
  </header>
)

export default Header
