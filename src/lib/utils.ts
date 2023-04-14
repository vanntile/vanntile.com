import type { CollectionEntry } from 'astro:content'
import svg from './svgPaths.json'

export const READABLE_FORMAT = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: '2-digit' })

interface ExternalSVG {
  href: string
  name: string
  d: string
}

export const socialMedia: ExternalSVG[] = [
  {
    href: 'https://github.com/vanntile',
    name: 'vanntile on GitHub',
    d: svg.github,
  },
  {
    href: 'https://www.linkedin.com/in/valentin-ionita',
    name: 'vanntile on LinkedIn',
    d: svg.linkedin,
  },
  {
    href: 'https://fosstodon.org/@vanntile',
    name: 'vanntile on Mastodon',
    d: svg.mastodon,
  },
  {
    href: 'https://stackoverflow.com/users/4679160/vanntile-ianito',
    name: 'vanntile on StackOverflow',
    d: svg.stackoverflow,
  },
  {
    href: 'https://gitlab.com/vanntile',
    name: 'vanntile on GitLab',
    d: svg.gitlab,
  },
  {
    href: 'https://dribbble.com/vanntile',
    name: 'vanntile on Dribbble',
    d: svg.dribbble,
  },
]

export const blogCompareFn = (a: CollectionEntry<'blog'>, b: CollectionEntry<'blog'>) =>
  b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf()
