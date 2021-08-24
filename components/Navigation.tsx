import Link from 'next/link'
import React from 'react'

interface Props {
  theme: string | undefined
  onClick: React.MouseEventHandler
}

const Navigation: React.FC<Props> = ({ theme, onClick }): JSX.Element => (
  <nav className="sticky top-0 z-10 flex flex-row items-center justify-end w-full max-w-full gap-8 py-4 mx-auto bg-white md:max-w-3xl 2xl:max-w-6xl dark:bg-gray-900">
    <Link href="/">Home</Link>
    <Link href="/blog">Blog</Link>
    <div className="flex items-center justify-center px-4 py-2" onClick={onClick}>
      <span className="">
        <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </span>
      <button
        role="switch"
        aria-checked={theme === 'light' ? 'false' : 'true'}
        aria-label="Toggle dark mode"
        className={`flex items-center px-1 mx-3 rounded-full w-14 h-7 focus:outline-none focus:ring-2 ring-gray-700 dark:ring-gray-100 dark:ring-offset-2 ${
          theme === 'light' ? 'bg-gray-300' : 'bg-brand-tint'
        }`}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
            theme === 'light' ? '' : 'translate-x-7'
          }`}
        ></div>
      </button>
      <span className="">
        <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </span>
    </div>
  </nav>
)

export default Navigation
