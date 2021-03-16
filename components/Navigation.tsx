import Link from 'next/link'
import React from 'react'

interface Props {
  theme: string | undefined
  onClick: React.MouseEventHandler
}

const Navigation: React.FC<Props> = ({ theme, onClick }): JSX.Element => (
  <nav className="sticky top-0 z-10 flex flex-row justify-end items-center gap-8 max-w-3xl w-full mx-auto py-4 bg-white dark:bg-black">
    <Link href="/">Home</Link>
    <Link href="/blog">Blog</Link>
    <button
      className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ring-inset ring-current font-bold"
      onClick={onClick}
    >
      {theme === 'light' ? 'Dark' : 'Light'}
    </button>
  </nav>
)

export default Navigation
