import type { RehypePlugin, RemarkPlugin } from '@astrojs/markdown-remark'
import { toString } from 'mdast-util-to-string'
import { visit } from 'unist-util-visit'
import getReadingTime from 'reading-time'

export function remarkReadingTime(): RemarkPlugin {
  return function (tree, { data }: any) {
    const textOnPage = toString(tree)
    const readingTime = getReadingTime(textOnPage)

    data.astro.frontmatter.readingTime = readingTime.text
  }
}

export function rehypeShikiStylesToClasses(
  options = { stylePrefix: '', classPrefix: '', hardcodedStyles: [] },
): RehypePlugin {
  const colorPrefix = `color:${options.stylePrefix}`
  const fontStylePrefix = `fontStyle:${options.stylePrefix}`
  const hardcodedStyles = new Map<string, string>(options.hardcodedStyles)

  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      const isInsideLine = parent.tagName === 'span' && parent.properties['data-line'] == ''
      const isSpan = node.tagName === 'span'
      const style = node.properties.style

      if (isInsideLine && isSpan && style != undefined) {
        const className: string[] = []

        style.split('; ').forEach((k: string) => {
          if (k.endsWith('-fs')) console.log(k)
          if (k.startsWith(colorPrefix)) {
            className.push(`${options.classPrefix}${k.slice(colorPrefix.length)}`)
          } else if (k.startsWith(fontStylePrefix)) {
            className.push(`${options.classPrefix}${k.slice(fontStylePrefix.length)}`)
          } else if (hardcodedStyles.has(k)) {
            className.push(hardcodedStyles.get(k) as string)
          }
        })

        node.properties = { className }
      }
    })
  }
}
