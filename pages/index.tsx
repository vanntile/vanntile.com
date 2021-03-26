import { Container, Tags, TriangleDivider } from '@vcomponents'
import useIntersection from '@vlib/useIntersection'
import { useRef, useState } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import styles from '../styles/home.module.css'

const IndexPage = (): JSX.Element => {
  const aboutSectionRef = useRef(null)
  const logoIntersection = useIntersection(aboutSectionRef, {
    root: null,
    rootMargin: '0px',
    threshold: 0.4,
  })

  const [selectedTab, setSelectedTab] = useState(3)
  const tabs = [
    {
      idx: 0,
      name: 'Education',
      header: 'One',
      children: (
        <>
          <h3 className="my-0">University Politehnica of Bucharest, Romania</h3>
          <p className="mt-0 mb-2 text-sm font-semibold text-indigo-300">
            Bachelor of Computer Engineering, <span className="ml-2 font-mono tracking-wide">Sep 2017 - Jul 2021</span>
          </p>
          <p className="mt-0 text-sm font-semibold text-indigo-300">GPA: 9.77/10</p>
          <h3 className="mb-0">Åbo Akademi University, Turku, Finland</h3>
          <p className="mt-0 mb-2 text-sm font-semibold text-indigo-300">
            Erasmus+ Exchange Student in Computer Science,{' '}
            <span className="ml-2 font-mono tracking-wide">Aug 2019 - May 2020</span>
          </p>
          <p className="mt-0 text-sm font-semibold text-indigo-300">GPA: 5/5</p>
        </>
      ),
    },
    {
      idx: 1,
      name: 'Volunteering',
      children: (
        <>
          <h3 className="my-0">Codette</h3>
          <p className="mt-0 mb-2 text-sm font-semibold text-indigo-300">
            Technical Trainer, <span className="ml-2 font-mono tracking-wide">Sep 2018 - Jun 2020</span>
          </p>
          <p>
            Developer for <strong>Inkscape</strong>, a vector design desktop application that follows the{' '}
            <strong>SVG</strong> standards. Worked on a <strong>C++</strong> dialog system refactoring project, with
            over 120 commits, <strong>6000 lines changed</strong>, reducing code length by 10%. The resulting change
            eliminated more than 12 active UX issues. Implementing the new dialog system consisted of removing old
            dependencies, standardising a design pattern and propagating document state. Specifically, this included{' '}
            <strong>over 20 features</strong>.
          </p>
          <Tags tags={['designing', 'training', 'documenting']} additionalClasses="bg-indigo-900" />
          <h3 className="mb-0">LSAC - Automatics and Computing Student League</h3>
          <p className="mt-0 mb-2 text-sm font-semibold text-indigo-300">
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
          <p className="mt-0 mb-2 text-sm font-semibold text-indigo-300">
            Trainer, <span className="ml-2 font-mono tracking-wide">Sep 2018 - Jun 2019</span>
          </p>
          <p>
            Participated twice a month as a trainer at workshops for primary-school chil- dren where we taught basic
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
          <p className="mt-0 mb-2 text-sm font-semibold text-indigo-300">
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
          <p className="mt-0 mb-2 text-sm font-semibold text-indigo-300">
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
          <p className="mt-0 mb-2 text-sm font-semibold text-indigo-300">
            Junior Software Engineer, <span className="ml-2 font-mono tracking-wide">Sep 2020 - Present</span>
          </p>
          <p>Current position</p>
          <Tags tags={['AngularJS', 'Svelte', 'NLP', 'Python']} additionalClasses="bg-indigo-900" />
          <p className="mt-10 mb-2 text-sm font-semibold text-indigo-300">
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
          <p className="mt-0 mb-2 text-sm font-semibold text-indigo-300">
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
          <header className="mb-16 group">
            <h1 className="mb-1 font-mono text-6xl">
              hi, I'm{' '}
              <span className="inline-flex h-20 max-w-xl pt-2 overflow-x-hidden overflow-y-visible animate-type group-hover:animate-type-reverse whitespace-nowrap text-brand-accent">
                vanntile 👋
              </span>
              <span className="box-border inline-block w-1 h-16 ml-2 -mb-4 bg-white animate-cursor"></span>
            </h1>
            <div className="text-3xl font-semibold">developer by choice and designer for fun</div>
          </header>
          <p className="max-w-lg">
            Are you searching for a practical enthusiast for your <span className={styles.highlight}>project</span>?
          </p>
          <p className="max-w-lg">
            I speak the languages of both <span className={styles.highlight}>engineering and aesthetics</span>, being
            perfectly positioned to formulate the path of a feasible product with customer experience in mind. My
            preferred work is <span className={styles.highlight}>fullstack development</span>. I'm using the best tool
            for the job, <br className="hidden md:inline-block" /> be it a reliable framework or the latest web
            features.
          </p>
          <p className="max-w-lg">
            Neither impressive interfaces nor blazing performance are <br className="hidden md:inline-block" /> the
            solution, but the <span className={styles.highlight}>balance</span> between a maintainable implementation
            and user-focused functionality.
          </p>
        </div>
        <TriangleDivider color="text-brand-accent" />
      </section>
      <section className={`${styles.hSection} pt-12 text-gray-800 font-bold bg-brand-accent`} ref={aboutSectionRef}>
        <div className="flex flex-col items-center justify-center w-full -my-12">
          <svg
            className={logoIntersection && logoIntersection.intersectionRatio >= 0.4 ? styles.active : ''}
            width="210"
            height="210"
            viewBox="0 0 500 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M336.02 141.274L407.454 141.274L316.718 276.505C327.367 282.143 334.915 293.153 334.915 306.746V343.057C334.915 358.963 347.808 371.856 363.713 371.858L377.891 371.855L377.891 268.804C377.891 255.263 368.546 243.905 355.954 240.826L367.833 223.122C385.802 230.502 398.455 248.175 398.455 268.804L398.455 392.415L363.715 392.422C336.452 392.422 314.35 370.321 314.35 343.057V306.746C314.35 300.663 310.551 295.686 305.119 293.792L238.918 392.455L70.3828 141.274H171.759L255.855 266.608C258.389 270.138 262.498 272.404 267.135 272.404L279.402 272.404L265.625 292.935C254.613 292.46 244.945 286.805 238.998 278.388L238.926 278.287L160.793 161.839H108.945L238.918 355.546L318.589 236.808C299.968 229.743 286.733 211.737 286.733 190.639C286.733 163.402 308.792 141.317 336.02 141.274ZM307.298 190.639C307.298 204.663 317.322 216.347 330.595 218.914L368.892 161.839H336.045C320.163 161.867 307.298 174.751 307.298 190.639Z"
              className={`text-gray-900 stroke-current ${styles.logomarkSvg}`}
            ></path>
          </svg>
        </div>
        <h2 className="text-4xl text-gray-900 dark:text-gray-900">./about/tech</h2>
        <p>
          I am an in-progress computer engineer with a deep passion for the worlds of frontend, design and deployment.
          Keep scrolling if you wanna know why, how and what I work on!
        </p>
        <h3 className="text-gray-900 dark:text-gray-900">What is my tech stack?</h3>
        <ol>
          <li>Languages</li>
          <Tags
            tags={['JavaScript', 'TypeScript', 'CSS3', 'Python 3', 'C++', 'Haskell']}
            additionalClasses="text-brand-accent bg-gray-800 px-3"
            className="py-1 ml-6"
          />
          <li>Frameworks &amp; tools</li>
          <Tags
            tags={['Angular', 'React', 'NextJS', 'NodeJS', 'Docker', 'Heroku', 'git']}
            additionalClasses="text-brand-accent bg-gray-800 px-3"
            className="py-1 ml-6"
          />
          <li>Design tools &amp; knowledge</li>
          <Tags
            tags={['Figma', 'Inkscape', 'SVG', 'Typography', 'Layout', 'Visual idenitities']}
            additionalClasses="text-brand-accent bg-gray-800 px-3"
            className="py-1 ml-6"
          />
          <li>Other snappy stuff</li>
          <Tags
            tags={['Linux (Debian)', 'VSCode', 'Notion', 'Prettier', 'Jupyter', 'Markdown']}
            additionalClasses="text-brand-accent bg-gray-800 px-3"
            className="py-1 ml-6"
          />
        </ol>
        <TriangleDivider color="text-brand" />
      </section>
      <section className={`${styles.hSection} bg-brand text-gray-200`}>
        <h2 className="text-4xl text-gray-100 dark:text-gray-100">./about/experience</h2>
        <Tabs selectedIndex={selectedTab} onSelect={(idx: number) => setSelectedTab(idx)}>
          <TabList className="flex m-0 overflow-hidden text-gray-100 bg-indigo-900 border-2 border-b-0 rounded-t-lg cursor-pointer">
            {tabs.map((tab) => (
              <Tab
                key={tab.idx}
                className={`${
                  selectedTab === tab.idx ? 'bg-brand' : 'border-b-2'
                } before-none p-2 px-5 font-bold focus:outline-white mt-0`}
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
      <section className={styles.hSection}>
        <h2>Latest Case Study + check the list link</h2>
      </section>
      <section className={styles.hSection}>
        <h2>Latest blog article + check the list link</h2>
      </section>
      <section className={`${styles.hSection} pb-72`}>
        <h2>Contact (question, call to action to email)</h2>
      </section>
      <footer className={`${styles.hSection} py-20 border-t-2 border-brand-accent`}>
        Designed &amp; built by vanntile, 2021
      </footer>
    </Container>
  )
}

export default IndexPage
