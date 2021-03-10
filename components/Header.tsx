import Link from 'next/link'

const Header = (): JSX.Element => {
  return (
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
        <Link href="/blog">
          <a className="leading-6 underline text-black-600 hover:text-blue-600 visited:text-purple-600 transition-colors">
            Blog
          </a>
        </Link>{' '}
        |{' '}
        <Link href="/forever">
          <a className="leading-6 underline text-black-600 hover:text-blue-600 visited:text-purple-600 transition-colors">
            Forever
          </a>
        </Link>
      </nav>
    </header>
  )
}

export default Header
