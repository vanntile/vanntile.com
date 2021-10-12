import { AnimatedHeader, ContactForm, Container, ExperienceTabs, PostList, Tags, TriangleDivider } from '@vcomponents'
import { getSortedPostsData } from '@vlib/mdx'
import svg from '@vlib/svgPaths'
import useIntersection from '@vlib/useIntersection'
import styles from '@vstyles/home.module.css'
import { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import deckPage1 from '../public/images/deck/page.1.webp'

interface Props {
  blogPosts: MDXFile[]
}

interface ExternalSVG {
  href: string
  name: string
  d: string
}

const externals: ExternalSVG[] = [
  {
    href: 'https://github.com/vanntile',
    name: 'vanntile on GitHub',
    d: svg.github,
  },
  {
    href: 'https://gitlab.com/vanntile',
    name: 'vanntile on GitLab',
    d: svg.gitlab,
  },
  {
    href: 'https://stackoverflow.com/users/4679160/vanntile-ianito',
    name: 'vanntile on StackOverflow',
    d: svg.stackoverflow,
  },
  {
    href: 'https://dribbble.com/vanntile',
    name: 'vanntile on Dribbble',
    d: svg.dribbble,
  },
  {
    href: 'https://www.linkedin.com/in/valentin-ionita',
    name: 'vanntile on Linkedin',
    d: svg.linkedin,
  },
]

const IndexPage: NextPage<Props> = ({ blogPosts }) => {
  const techSectionRef = useRef(null)
  const ExperienceTabsRef = useRef(null)
  const logomarkInt = useIntersection(techSectionRef, { root: null, rootMargin: '0px', threshold: 0.4 })
  const logotypeInt = useIntersection(ExperienceTabsRef, { root: null, rootMargin: '0px', threshold: 0.4 })

  return (
    <Container>
      <section className={`${styles.hSection} flex flex-col justify-center px-6 py-16 text-left min-h-screen`}>
        <div>
          <header className="mb-16">
            <AnimatedHeader />
            <div className="text-xl font-semibold md:text-3xl">developer by choice and designer for fun</div>
          </header>
          <a className="visuallyhidden" href="#section-tech">
            Skip to main content
          </a>
          <p className="md:text-lg 2xl:text-2xl">
            Are you searching for a practical enthusiast for your <span className={styles.highlight}>project</span>?
          </p>
          <p className="max-w-2xl md:text-lg 2xl:max-w-5xl 2xl:text-2xl">
            I speak the languages of both <span className={styles.highlight}>engineering and aesthetics</span>, being
            <br className="hidden md:inline-block 2xl:hidden" /> perfectly positioned to formulate the path of a
            feasible product with customer experience in mind. My preferred work is{' '}
            <span className={styles.highlight}>fullstack development</span>. I&apos;m using the best tool for the job,
            be it a reliable framework or the latest web features.
          </p>
          <p className="max-w-2xl md:text-lg 2xl:max-w-5xl 2xl:text-2xl">
            Neither impressive interfaces nor blazing performance are the solution, but the{' '}
            <span className={styles.highlight}>balance</span> between a maintainable implementation and
            <br className="hidden md:inline-block 2xl:hidden" /> user-focused functionality.
          </p>
          <div className="flex flex-row flex-wrap mt-8 space-x-2">
            <a className="cta" href="#section-tech">
              techstack
            </a>
            <a className="cta" href="#section-experience">
              experience
            </a>
            <a className="cta" href="#section-design">
              design
            </a>
            <a className="cta" href="#section-blog">
              blog
            </a>
            <a className="cta" href="#section-contact">
              contact
            </a>
          </div>
        </div>
        <TriangleDivider color="text-brand-accent" />
      </section>
      <section
        id="section-tech"
        className={`${styles.hSection} pt-12 text-gray-800 font-bold bg-brand-accent`}
        ref={techSectionRef}
      >
        <div className="flex flex-col items-center justify-center w-full -my-12">
          <svg
            aria-hidden="true"
            focusable="false"
            className={logomarkInt && logomarkInt.intersectionRatio >= 0.4 ? styles.active : ''}
            width="210"
            height="210"
            viewBox="0 0 500 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d={svg.logomark}
              className={`text-gray-900 stroke-current will-change ${styles.logoSvg}`}
            ></path>
          </svg>
        </div>
        <h2 className="text-gray-900 md:text-4xl dark:text-gray-900">./about/tech</h2>
        <p>
          I am an in-progress computer engineer with a deep passion for the worlds of frontend, design and deployment.
          Keep scrolling if you wanna know why, how and what I work on!
        </p>
        <h3>What is my tech stack?</h3>
        <span className="block font-bold">Languages</span>
        <Tags
          tags={['JavaScript', 'TypeScript', 'CSS3', 'Python 3', 'C++', 'Haskell']}
          additionalClasses="text-brand-accent bg-gray-800"
        />
        <span className="block font-bold">Standards &amp; paradigms</span>
        <Tags tags={['OpenAPI', 'REST', 'GraphQL']} additionalClasses="text-brand-accent bg-gray-800" />
        <span className="block font-bold">Frameworks &amp; tools</span>
        <Tags
          tags={['React', 'NextJS', 'Angular', 'NodeJS', 'FastAPI', 'Docker', 'Heroku', 'git']}
          additionalClasses="text-brand-accent bg-gray-800"
        />
        <span className="block font-bold">Design tools &amp; knowledge</span>
        <Tags
          tags={['Figma', 'Inkscape', 'SVG', 'Typography', 'Layout', 'Visual idenitities']}
          additionalClasses="text-brand-accent bg-gray-800"
        />
        <span className="block font-bold">Other snappy stuff</span>
        <Tags
          tags={['Linux (Debian)', 'VSCode', 'Notion', 'Prettier', 'Jupyter', 'Markdown']}
          additionalClasses="text-brand-accent bg-gray-800"
        />
        <TriangleDivider color="text-brand" />
      </section>
      <section id="section-experience" className={`${styles.hSection} bg-brand text-gray-200`} ref={ExperienceTabsRef}>
        <div className="flex flex-col items-center justify-center w-full mt-12">
          <svg
            aria-hidden="true"
            focusable="false"
            className={logotypeInt && logotypeInt.intersectionRatio >= 0.4 ? styles.active : ''}
            width="520"
            height="60"
            viewBox="480 0 800 168"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d={svg.logotype}
              fill="currentColor"
              className={`text-gray-200 stroke-current will-change ${styles.logoSvg} ${styles.logotypeSvg}`}
            />
          </svg>
        </div>
        <h2 className="text-gray-100 md:text-4xl dark:text-gray-100">./about/experience</h2>
        <ExperienceTabs />
        <TriangleDivider color="text-gray-900" />
      </section>
      <section className={`${styles.hSection} pb-2 mb-16`}>
        <h2 id="section-blog" className="text-current md:text-4xl">
          ./blog/coding/latest
        </h2>
        <PostList posts={blogPosts.slice(0, 3)} />
        <div className="my-6">
          <span className="pr-4 md:text-xl">...or </span>
          <Link href={`/blog`}>
            <a className="cta">Check all blog posts</a>
          </Link>
        </div>
      </section>
      <section className={`${styles.hSection} pb-2 mb-16`}>
        <h2 id="section-design" className="text-current md:text-4xl">
          ./blog/design/featured
        </h2>
        <Link href={`/design/brand-book`} passHref={true}>
          <div className="relative cursor-pointer md:-mx-6 group bg-brand">
            <div className="transition transform scale-100 blur-none group-hover:blur-sm group-hover:scale-90 group-hover:mix-blend-lighten">
              <Image src={deckPage1} alt="vanntile brand deck cover page" />
            </div>
            <div className="absolute top-0 left-0 grid items-center justify-center w-full h-full">
              <h3 className="pt-2 pl-4 my-0 text-2xl text-gray-100 border-l-8 opacity-0 md:text-5xl group-hover:opacity-100 border-brand-accent">
                Brand book
              </h3>
            </div>
          </div>
        </Link>
      </section>
      <section className={`${styles.hSection} mb-16`}>
        <h2 id="section-contact" className="text-current md:text-4xl">
          ./public/contact
        </h2>
        <p>You can find me here and there.</p>
        <div className="flex flex-row flex-wrap mb-8 space-x-4 md:space-x-8">
          {externals.map((e) => (
            <a
              key={e.href}
              href={e.href}
              target="_blank"
              rel="noreferrer"
              title={e.name}
              className={`${styles.rotateScaleUp} pseudo-none bg-gray-900 rounded-full h-12 w-12 focus:outline-none focus:ring-8 ring-brand-accent will-change`}
            >
              <svg
                aria-hidden="true"
                focusable="false"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d={e.d} fill="currentColor" className="text-gray-200" />
              </svg>
            </a>
          ))}
        </div>
        <ContactForm />
      </section>
      <footer className={`${styles.hSection} py-14 border-t-2 border-brand-accent`}>
        Designed &amp; built by vanntile
      </footer>
    </Container>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: { blogPosts: await getSortedPostsData('posts') },
})

export default IndexPage
