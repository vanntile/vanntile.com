import Link from 'next/link'
import React from 'react'

interface Props {
  theme: string | undefined
  onClick: React.MouseEventHandler
}

const Navigation: React.FC<Props> = ({ theme, onClick }): JSX.Element => (
  <nav className="sticky top-0 z-10 flex flex-row items-center justify-end w-full max-w-full gap-8 py-4 mx-auto bg-white md:max-w-3xl 2xl:max-w-6xl dark:bg-black">
    <Link href="/">Home</Link>
    <Link href="/blog">Blog</Link>
    <button
      className="px-4 py-2 font-bold border rounded-md focus:outline-none focus:ring-2 ring-inset ring-current"
      onClick={onClick}
    >
      {theme === 'light' ? 'Dark' : 'Light'}
    </button>
  </nav>
)

export default Navigation
