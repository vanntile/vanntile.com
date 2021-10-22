import React from 'react'

const AnimatedHeader: React.FC = () => (
  <h1 className="mb-2 font-mono text-4xl text-gray-100 md:text-6xl">
    hi, I&apos;m <br className="block md:hidden" />
    <span className="relative">
      <span className="pt-2 overflow-x-hidden whitespace-nowrap text-brand-accent">
        vanntile <span className="text-3xl md:text-5xl">👋</span>
      </span>
      <span className="after:content-[''] after:block after:absolute after:w-2 after:h-full after:bg-gray-100 after:animate-cursor absolute left-0 inline-block w-full bg-gray-900 -bottom-0 -top-1 animate-type will-change"></span>
    </span>
  </h1>
)

export default AnimatedHeader
