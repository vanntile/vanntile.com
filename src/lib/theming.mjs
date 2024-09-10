import { readdir, readFile, writeFile } from 'node:fs/promises'
import { exit } from 'node:process'

const dirname = './themes/'
const dynamicThemeName = 'dynamic-shiki-material'
const stylePrefix = '--dynamic-shiki-'
const classPrefix = 'shiki-'
let themes = []

try {
  const files = await readdir(dirname)

  for (const file of files) {
    const content = await readFile(dirname + file, 'utf-8')
    themes.push(JSON.parse(content))
  }
} catch (err) {
  console.error(err)
  exit(1)
}

for (const theme of themes) {
  console.log(`\n${theme.name}`)

  const foregroundScope = new Map()
  const fontStyleScope = new Map()

  theme.tokenColors.forEach((x) => {
    if (!x.scope) {
      theme.default = x.settings
      return
    }
    const scopes = Array.isArray(x.scope) ? x.scope : [x.scope]
    scopes
      .flatMap((scope) => (scope.includes(',') ? scope.split(',').map((s) => s.trim()) : scope.trim()))
      .forEach((scope) => {
        if (x?.settings?.foreground) {
          if (foregroundScope.has(scope) && foregroundScope.get(scope) != x.settings.foreground) {
            console.log(
              `changed foreground scope ${scope} from ${foregroundScope.get(scope)} to ${x.settings.foreground}`,
            )
          }
          foregroundScope.set(scope, x.settings.foreground)
        }
        if (x?.settings.fontStyle) {
          if (fontStyleScope.has(scope)) {
            console.log(`changed fontStyle scope ${scope} from ${fontStyleScope.get(scope)} to ${x.settings.fontStyle}`)
          }
          fontStyleScope.set(scope, x.settings.fontStyle)
        }
        const remainingSettings = new Set(Object.keys(x.settings)).difference(
          new Set(['foreground', 'background', 'fontStyle']),
        )
        if (remainingSettings.size > 0) {
          console.log(`has extra settings ${JSON.stringify([...remainingSettings])}} for scope ${scope}`)
        }
      })
  })

  console.log(`> has ${foregroundScope.size} foreground, ${fontStyleScope.size} fontStyle scopes`)
  if (theme.default) {
    console.log(`> has defaults ${JSON.stringify(theme.default)}`)
  }

  theme.foregroundScope = foregroundScope
  theme.fontStyleScope = fontStyleScope
}

let allThemeScopes = new Set([])
let foregroundScopes = new Set([])
let fontStyleScopes = new Set([])
for (const theme of themes) {
  if (foregroundScopes.size) {
    foregroundScopes = foregroundScopes.intersection(new Set([...theme.foregroundScope.keys()]))
  } else {
    foregroundScopes = new Set([...theme.foregroundScope.keys()])
  }
  if (fontStyleScopes.size) {
    fontStyleScopes = fontStyleScopes.intersection(new Set([...theme.fontStyleScope.keys()]))
  } else {
    fontStyleScopes = new Set([...theme.fontStyleScope.keys()])
  }
  // foregroundScopes = foregroundScopes.union(new Set([...theme.foregroundScope.keys()]))
  // fontStyleScopes = fontStyleScopes.union(new Set([...theme.fontStyleScope.keys()]))
}
allThemeScopes = [...new Set([]).union(foregroundScopes).union(fontStyleScopes)]

console.log(`\n> ${allThemeScopes.length} total scopes`)

// Base scopes existing in the union of foreground and fontStyle scopes come first.
// Scope indices only make sense for a selected set of themes at a certain time.
// Base case: a scope has either only a fg or fs scope for all themes
// (meaning all themes that use it have only one of fg/fs scope). It gets an index and that one suffix.
// If themes use both fg and fs for a certain scope, it gets two tags with an index and either of the suffixes.

const scopes = new Map(allThemeScopes.map((scope, idx) => [scope, `${stylePrefix}${idx}`]))

const tokenColors = []
for (const [scope, value] of scopes) {
  const settings = {}
  if (foregroundScopes.has(scope)) settings['foreground'] = `${value}-fg`
  if (fontStyleScopes.has(scope)) settings['fontStyle'] = `${value}-fs`
  tokenColors.push({ scope, settings })
}

const dynamicShikiTheme = {
  displayName: 'Dynamic Shiki Theme',
  name: dynamicThemeName,
  type: 'css',
  semanticHighlighting: true,
  tokenColors: [
    {
      settings: {
        background: `${stylePrefix}background`,
        foreground: `${stylePrefix}foreground`,
      },
    },
    ...tokenColors,
  ],
}

try {
  await writeFile(`${dynamicThemeName}.json`, JSON.stringify(dynamicShikiTheme, null, '  '))

  const cssData = tokenColors.flatMap((tokenColor) => {
    const styles = []

    for (const key of ['foreground', 'fontStyle']) {
      if (tokenColor.settings[key]) {
        const className = tokenColor.settings[key].replace(stylePrefix, classPrefix)
        styles.push(
          `.${className} { ${key == 'foreground' ? 'color' : 'font-style'}: var(${tokenColor.settings[key]}) }`,
        )
      }
    }

    return styles
  })

  for (const theme of themes) {
    cssData.push(`.${theme.name} {`)
    for (const [scope, value] of theme.foregroundScope) {
      cssData.push(`  ${tokenColors.find((x) => x.scope == scope).settings.foreground}: ${value};`)
    }
    for (const [scope, value] of theme.fontStyleScope) {
      cssData.push(`  ${tokenColors.find((x) => x.scope == scope).settings.fontStyle}: ${value};`)
    }
    cssData.push('}')
  }

  await writeFile(`${dynamicThemeName}.css`, cssData.join('\n'))
} catch (err) {
  console.error(err)
  exit(1)
}
