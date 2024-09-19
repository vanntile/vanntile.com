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

const FONT_STYLE_SUFFIX_LEN = 11 // 11 = '-font-style'.length

export function rehypeShikiStylesToClasses({
  propertyPrefix = '--shiki-',
  classPrefix = '',
  themeNames = [],
}: {
  propertyPrefix?: string
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
        typeof node.properties['data-theme'] == 'string' &&
        node.properties['data-theme'].length > 0 &&
        node.children.length > 0
      ) {
        node.properties.className = ['st-fg', 'st-bg', ...((node.properties.className as string[]) || [])]
        node.properties['data-theme'] = undefined
        node.properties.style = undefined

        if (node.children[0].type == 'element') {
          node.children[0].properties['data-theme'] = undefined
          node.children[0].properties.style = undefined
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
        let [property, value] = mapping.split(':')
        if (value.startsWith(classPrefix)) className.add(value)
        else if (property.endsWith('-font-style')) {
          className.add(`${classPrefix}${property.slice(propertyPrefix.length, -1 * FONT_STYLE_SUFFIX_LEN)}-${value}`)
        }
      }

      // Final classes
      if (className.size > 0)
        node.properties = { className: [...((node.properties.className as string[]) || []), ...className] }
    })
  }
}
