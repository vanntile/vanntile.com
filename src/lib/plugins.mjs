import getReadingTime from 'reading-time'
import { toString } from 'mdast-util-to-string'

export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree)
    const readingTime = getReadingTime(textOnPage)

    data.astro.frontmatter.readingTime = readingTime.text
  }
}

export function replaceCSSVariablesForShikiTheme(theme, colors) {
  let themeStr = JSON.stringify(theme)

  Object.entries(colors).forEach(([k, v]) => {
    themeStr = themeStr.replaceAll(v, k)
  })

  return JSON.parse(themeStr)
}
