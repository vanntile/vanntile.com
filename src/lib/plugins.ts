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
  const COUNTER_STYLE_PREFIX_LEN = 18 // 'counter-set: line '.length

  return (tree) => {
    visit(tree, 'element', (node: Element, _index, parent: Element) => {
      if (
        node.tagName === 'figcaption' &&
        typeof node.properties['data-theme'] == 'string' &&
        node.properties['data-theme'].length > 0
      ) {
        node.properties['data-theme'] = undefined
        node.properties.style = undefined
      }
      // remove classes of all themes from the pre element (why are they even there?)
      // add classes for styles
      if (
        node.tagName === 'pre' &&
        themeNames.length > 0 &&
        typeof node.properties['data-theme'] == 'string' &&
        node.properties['data-theme'].length > 0 &&
        node.children.length > 0
      ) {
        // manage pre element properties
        node.properties.className = ['st-fg', 'st-bg', ...((node.properties.className as string[]) || [])]
        node.properties['data-theme'] = undefined
        node.properties.style = undefined

        // manage code element properties
        if (node.children[0].type == 'element' && node.children[0].tagName == 'code') {
          if (typeof node.children[0].properties.style == 'string') {
            for (const style of node.children[0].properties.style.split(';')) {
              if (!style.startsWith('counter-set: line ')) continue
              node.children[0].properties['data-line-counter'] = style.slice(COUNTER_STYLE_PREFIX_LEN)
              break
            }
          }
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
        else if (property.endsWith('-font-style') || property.endsWith('-font-weight')) {
          for (const v of value.split(' ')) {
            className.add(`${classPrefix}${property.split('-').slice(3, -2).join('-')}-${v}`)
          }
        } else if (property.endsWith('-text-decoration')) {
          className.add(
            `${classPrefix}${property.split('-').slice(3, -2).join('-')}-${value.split(' ').sort().join('-')}`,
          )
        }
      }
      node.properties.style = undefined

      // Final classes
      if (className.size > 0)
        node.properties.className = [...((node.properties.className as string[]) || []), ...className]
    })
  }
}
