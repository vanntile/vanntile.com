import getReadingTime from 'reading-time'
import { toString } from 'mdast-util-to-string'
import { visit } from 'unist-util-visit'

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

export function rehypePrettyCodeStyleToClass(options = { stylesMap: [] }) {
  const MOONLIGHT_COLOR = 'color: var(--moonlight-'
  const hardcodedStyles = new Map(options.stylesMap)

  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      const isInsideLine = parent.tagName === 'span' && parent.properties.className.includes('line')
      const isSpan = node.tagName === 'span'
      const style = node.properties.style

      if (isInsideLine && isSpan && style != undefined) {
        const className = []

        style.split('; ').forEach((k) => {
          if (k.startsWith(MOONLIGHT_COLOR)) {
            className.push(`moonlight-${k.slice(MOONLIGHT_COLOR.length, -1)}`)
          } else if (hardcodedStyles.has(k)) {
            className.push(hardcodedStyles.get(k))
          }
        })

        node.properties = { className }
      }
    })
  }
}
