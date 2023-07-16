import type { RehypePlugin, RemarkPlugin } from '@astrojs/markdown-remark'
import { toString } from 'mdast-util-to-string'
import getReadingTime from 'reading-time'
import { visit } from 'unist-util-visit'

export function remarkReadingTime(): RemarkPlugin {
  return function (tree, { data }: any) {
    const textOnPage = toString(tree)
    const readingTime = getReadingTime(textOnPage)

    data.astro.frontmatter.readingTime = readingTime.text
  }
}

export function replaceCSSVariablesForShikiTheme(theme: Record<string, any>, colors: Record<string, string>) {
  let themeStr = JSON.stringify(theme)

  Object.entries(colors).forEach(([k, v]) => {
    themeStr = themeStr.replaceAll(v, k)
  })

  return JSON.parse(themeStr)
}

export function rehypePrettyCodeStyleToClass(options = { stylesMap: [] }): RehypePlugin {
  const MOONLIGHT_COLOR = 'color: var(--moonlight-'
  const hardcodedStyles = new Map<string, string>(options.stylesMap)

  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      const isInsideLine = parent.tagName === 'span' && parent.properties['data-line'] == ''
      const isSpan = node.tagName === 'span'
      const style = node.properties.style

      if (isInsideLine && isSpan && style != undefined) {
        const className: string[] = []

        style.split('; ').forEach((k: string) => {
          if (k.startsWith(MOONLIGHT_COLOR)) {
            className.push(`moonlight-${k.slice(MOONLIGHT_COLOR.length, -1)}`)
          } else if (hardcodedStyles.has(k)) {
            className.push(hardcodedStyles.get(k) as string)
          }
        })

        node.properties = { className }
      }
    })
  }
}
