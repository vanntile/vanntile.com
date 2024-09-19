import type { RehypePlugin, RemarkPlugin } from '@astrojs/markdown-remark'
import type { Element } from 'hast'
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

export function rehypeShikiStylesToClasses({
  classPrefix = '',
  themeNames = [],
}: {
  classPrefix?: string
  themeNames?: string[]
}): RehypePlugin {
  return (tree) => {
    visit(tree, 'element', (node: Element, _index, parent: Element) => {
      // remove classes of all themes from the pre element (why are they even there?)
      // add classes for styles
      if (
        node.tagName === 'pre' &&
        themeNames.length > 0 &&
        Array.isArray(node.properties.className) &&
        node.properties.className.length > 0
      ) {
        if ((node.properties.className as string[]).some((x: string) => themeNames.includes(x))) {
          node.properties.className = 'st-fg st-bg'
          node.properties.style = undefined
        }

        return
      }

      // all spans with styles inside data-lines
      if (node.tagName !== 'span') return
      if (node.properties.style == undefined || typeof node.properties.style != 'string') return
      if (parent.tagName !== 'span' || parent.properties['data-line'] != '') return

      // turn known styles into theme-specific classes
      const className: Set<string> = new Set()
      for (const mapping of node.properties.style.split(';')) {
        let color = mapping.split(':')[1]
        if (color.startsWith(classPrefix)) className.add(color)
      }

      // Final classes
      if (className.size > 0) node.properties = { className: [...className] }
    })
  }
}
