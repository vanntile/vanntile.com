import { ContactForm, Container, Tags, TriangleDivider } from '@vcomponents'
import svg from '@vlib/svgPaths'
import useIntersection from '@vlib/useIntersection'
import styles from '@vstyles/home.module.css'
import { NextPage } from 'next'
import { useRef, useState } from 'react'
import { resetIdCounter, Tab, TabList, TabPanel, Tabs } from 'react-tabs'

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

const IndexPage: NextPage = () => {
  const techSectionRef = useRef(null)
  const experienceSectionRef = useRef(null)
  const logomarkInt = useIntersection(techSectionRef, { root: null, rootMargin: '0px', threshold: 0.4 })
  const logotypeInt = useIntersection(experienceSectionRef, { root: null, rootMargin: '0px', threshold: 0.4 })
  const [selectedTab, setSelectedTab] = useState(3)

  resetIdCounter()

  const tabs = [
    {
      idx: 0,
      name: 'Education',
      header: 'One',
      children: (
        <>
          <h3 className="my-0">University Politehnica of Bucharest, Romania</h3>
          <p className={styles.pExp}>
            Bachelor of Computer Engineering, <span className="ml-2 font-mono tracking-wide">Sep 2017 - Jul 2021</span>
          </p>
          <p className={styles.pExp}>GPA: 9.77/10</p>
          <h3 className="mb-0">Åbo Akademi University, Turku, Finland</h3>
          <p className={styles.pExp}>
            Erasmus+ Exchange Student in Computer Science,{' '}
            <span className="ml-2 font-mono tracking-wide">Aug 2019 - May 2020</span>
          </p>
          <p className={styles.pExp}>GPA: 5/5</p>
        </>
      ),
    },
    {
      idx: 1,
      name: 'Volunteering',
      children: (
        <>
          <h3 className="my-0">Codette</h3>
          <p className={styles.pExp}>
            Technical Trainer, <span className="ml-2 font-mono tracking-wide">Sep 2018 - Jun 2020</span>
          </p>
          <ul>
            <li>
              Contributed as a technical trainer by creating resources and delivering presentations at{' '}
              <strong>four editions of a web-technologies workshop</strong>, based on Angular, with a total of 80
              participants.
            </li>
            <li>
              Contributed as a designer by creating the branding, designing and implementing the website and creating
              the social media posts of a <strong>mentorship program</strong> for university students called Techtor.
            </li>
            <li>Contributed as a technical trainer at a mobile development workshop for 20 young children.</li>
          </ul>
          <Tags tags={['designing', 'training', 'documenting']} additionalClasses="bg-indigo-900" />
          <h3 className="mb-0">LSAC - Automatics and Computing Student League</h3>
          <p className={styles.pExp}>
            Graphic Designer, <span className="ml-2 font-mono tracking-wide">Feb 2018 - Feb 2019</span>
          </p>
          <ul>
            <li>
              Created posters and graphics for the student association events, with a{' '}
              <strong>reach of 3000 people</strong> and set the creative direction to a LSAC organised hackathon.
            </li>
            <li>
              Managed the fifth HackITAll edition, a student hackathon supported by Amazon, in the position of the{' '}
              <strong>Design Project Manager</strong>.
            </li>
            <li>Mentored new members and trained them through an Introduction to design workshop.</li>
          </ul>
          <Tags tags={['designing', 'managing', 'mentoring']} additionalClasses="bg-indigo-900" />
          <h3 className="mb-0">Coder Dojo</h3>
          <p className={styles.pExp}>
            Trainer, <span className="ml-2 font-mono tracking-wide">Sep 2018 - Jun 2019</span>
          </p>
          <p>
            Participated twice a month as a trainer at workshops for primary-school children where we taught basic
            programming using online tools, mainly Scratch.
          </p>
        </>
      ),
    },
    {
      idx: 2,
      name: 'GSoC',
      children: (
        <>
          <h3 className="my-0">Inkscape, Google Summer of Code 2020</h3>
          <p className={styles.pExp}>
            Remote Software Developer, <span className="ml-2 font-mono tracking-wide">Jun 2020 - Aug 2020</span>
          </p>
          <p>
            Developer for <strong>Inkscape</strong>, a vector design desktop application that follows the{' '}
            <strong>SVG</strong> standards. Worked on a <strong>C++</strong> dialog system refactoring project, with
            over 120 commits, <strong>6000 lines changed</strong>, reducing code length by 10%. The resulting change
            eliminated more than 12 active UX issues. Implementing the new dialog system consisted of removing old
            dependencies, standardising a design pattern and propagating document state. Specifically, this included{' '}
            <strong>over 20 features</strong>.
          </p>
          <Tags tags={['C++', 'GTK+', 'gtkmm', 'UX', 'refactoring']} additionalClasses="bg-indigo-900" />
          <h3 className="mb-0">Inkscape, Google Summer of Code 2019</h3>
          <p className={styles.pExp}>
            Remote Software Developer, <span className="ml-2 font-mono tracking-wide">May 2020 - Aug 2020</span>
          </p>
          <p>
            Implemented <strong>JavaScript polyfills</strong> that reproduce, in browsers, SVG functionality which
            exists in Inkscape but has been dropped by the <strong>SVG2 specification</strong> draft. Had over 60
            commits in 4 feature branches over 4 months, using JavaScript and the GTK+ toolkit. Implemented new
            functionality (paint servers preview dialog) as a starter point for future fill and stroke paint servers
            unification.
          </p>
          <Tags
            tags={['JavaScript', 'polyfills', 'SVG', 'GTK+', 'standardisation']}
            additionalClasses="bg-indigo-900"
          />
        </>
      ),
    },
    {
      idx: 3,
      name: 'Postis',
      children: (
        <>
          <h3 className="my-0">Postis, Bucharest, Romania</h3>
          <p className={styles.pExp}>
            Junior Software Engineer, <span className="ml-2 font-mono tracking-wide">Sep 2020 - Present</span>
          </p>
          <p>Current position</p>
          <Tags tags={['AngularJS', 'Svelte', 'NLP', 'Python']} additionalClasses="bg-indigo-900" />
          <p className={styles.pExp}>
            Frontend Developer Intern, <span className="ml-2 font-mono tracking-wide">Jul 2018 - Sep 2018</span>
          </p>
          <p>
            Managed a delivery tracking web application of over <strong>50 000 orders</strong>, using Git versioning,
            AngularJS, Bootstrap, Grunt and proprietary REST APIs. Fixed interface bugs,{' '}
            <strong>shortened the load time </strong> by removing 7 unused dependencies and added 5 new client
            functionalities while pushing over 75 commits. <strong>Reduced main app size by 20%</strong> and an order
            tracking page by 90% by using ES6 instead of jQuery.
          </p>
          <Tags tags={['AngularJS', 'Bootstrap', 'REST APIs', 'ES6']} additionalClasses="bg-indigo-900" />
        </>
      ),
    },
    {
      idx: 4,
      name: 'Etsimo',
      children: (
        <>
          <h3 className="mt-0">Etsimo Healthcare Oy, Turku, Finland</h3>
          <p className={styles.pExp}>
            Junior Software Engineer, <span className="ml-2 font-mono tracking-wide">Jan 2020 - Jun 2020</span>
          </p>
          <p>
            Worked on improving RxJS state in an Angular user-facing app of the cer- tified Diagnosis Engine. Integrated
            dynamic translations with an existing Flask REST backend, <strong>reducing load time by 20%</strong>.
            Created, in a team of two, over 12 iterations, an intended-use <strong>conversational workflow</strong> demo
            of the Etsimo service capabilities, deployed from a <strong>Node.js server</strong> with a Preact chat
            interface. Written from the bottom up a new <strong>TypeScript library</strong> that exposes Etsimo’s API
            for developer use, helps with type checking for JavaScript apps and has automated{' '}
            <strong>unit tests</strong>.
          </p>
          <Tags
            tags={['API', 'Angular', 'RxJS', 'Preact', 'Flask', 'NodeJS', 'TypeScript']}
            additionalClasses="bg-indigo-900"
          />
        </>
      ),
    },
  ]

  return (
    <Container>
      <section className={`${styles.hSection} flex flex-col justify-center px-6 py-16 text-left min-h-screen`}>
        <div>
          <header className="mb-16">
            <h1 className="mb-2 font-mono text-4xl text-gray-100 md:text-6xl">
              hi, I'm <br className="block md:hidden" />
              <span className="relative">
                <span className="h-20 pt-2 overflow-x-hidden whitespace-nowrap text-brand-accent">
                  vanntile <span className="text-3xl md:text-5xl">👋</span>
                </span>
                <span
                  className={`${styles.cursor} absolute -bottom-0 left-0 -top-1 inline-block bg-gray-900 w-full animate-type will-change`}
                ></span>
              </span>
            </h1>
            <div className="text-xl font-semibold md:text-3xl">developer by choice and designer for fun</div>
          </header>
          <a className="visuallyhidden" href="#section-tech">
            Skip to main content
          </a>
          <p>
            Are you searching for a practical enthusiast for your <span className={styles.highlight}>project</span>?
          </p>
          <p className="max-w-lg 2xl:max-w-5xl">
            I speak the languages of both <span className={styles.highlight}>engineering and aesthetics</span>, being
            perfectly positioned to formulate the path of a feasible product with customer experience in mind. My
            preferred work is <span className={styles.highlight}>fullstack development</span>. I'm using the best tool
            for the job, <br className="hidden md:inline-block 2xl:hidden" /> be it a reliable framework or the latest
            web features.
          </p>
          <p className="max-w-lg 2xl:max-w-5xl">
            Neither impressive interfaces nor blazing performance are{' '}
            <br className="hidden md:inline-block 2xl:hidden" /> the solution, but the{' '}
            <span className={styles.highlight}>balance</span> between a maintainable implementation and user-focused
            functionality.
          </p>
          <div className="flex flex-row mt-8 space-x-2">
            <a
              className="px-4 py-2 border-2 border-current text-brand-accent hover:text-brand-accent"
              href="#section-tech"
            >
              techstack
            </a>
            <a
              className="px-4 py-2 border-2 border-current text-brand-accent hover:text-brand-accent"
              href="#section-experience"
            >
              experience
            </a>
            <a
              className="px-4 py-2 border-2 border-current text-brand-accent hover:text-brand-accent"
              href="#section-contact"
            >
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
        <span className="block font-bold">Frameworks &amp; tools</span>
        <Tags
          tags={['Angular', 'React', 'NextJS', 'NodeJS', 'Docker', 'Heroku', 'git']}
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
      <section
        id="section-experience"
        className={`${styles.hSection} bg-brand text-gray-200`}
        ref={experienceSectionRef}
      >
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
        <Tabs selectedIndex={selectedTab} onSelect={(idx: number) => setSelectedTab(idx)}>
          <TabList className="flex m-0 overflow-x-scroll text-gray-100 bg-indigo-900 border-2 border-b-0 cursor-pointer md:overflow-hidden">
            {tabs.map((tab) => (
              <Tab
                key={tab.idx}
                className={`${
                  selectedTab === tab.idx ? 'bg-brand' : 'border-b-2'
                } list-none ml-0 mb-0 py-2 px-5 font-bold focus:outline-white mt-0`}
              >
                {tab.name}
              </Tab>
            ))}
            <div className="flex-grow block border-b-2"></div>
          </TabList>
          {tabs.map((tab) => (
            <TabPanel
              key={tab.idx}
              className={`w-full p-4 pt-8 border-2 border-t-0 ${selectedTab === tab.idx ? 'block' : 'hidden'}`}
            >
              {tab.children}
            </TabPanel>
          ))}
        </Tabs>
        <TriangleDivider color="text-gray-900" />
      </section>
      <section id="section-contact" className={`${styles.hSection} mb-32`}>
        <h2 className="text-current md:text-4xl">Contact</h2>
        <p>You can find me here and there.</p>
        <div className="flex flex-row mb-8 space-x-8">
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
      <footer className={`${styles.hSection} py-20 border-t-2 border-brand-accent`}>
        Designed &amp; built by vanntile
      </footer>
    </Container>
  )
}

export default IndexPage
