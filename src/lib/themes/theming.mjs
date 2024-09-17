import { readFile, readdir, stat, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { exit } from 'node:process'

const getThemes = async (sourceDir = 'sources') => {
  try {
    const themeDirs = (
      await Promise.all((await readdir(sourceDir)).map((x) => join(sourceDir, x)).map(async (x) => [x, await stat(x)]))
    )
      .filter(([_, stats]) => stats.isDirectory())
      .map(([x, _]) => x)

    const themesFiles = await Promise.all(
      themeDirs.map(async (x) => {
        const dirFiles = await readdir(x)
        for (const filename of dirFiles) {
          if (filename.endsWith('.json')) return join(x, filename)
        }
      }),
    )
    const themes = (await Promise.all(themesFiles.map((x) => readFile(x)))).map((x) => JSON.parse(x))

    return themes
  } catch (err) {
    console.error(err)
    exit(1)
  }
}

const convertThemes = (themes = [], classPrefix = 'st') => {
  let idx = 0 // use a single index for all output shiki variables
  for (const theme of themes) {
    theme.colorMap = new Map()
    theme.fontStyleMap = new Map()
    theme.colorAndFontMap = new Map()

    for (const x of theme.tokenColors) {
      // debatably, this should be removed from output
      if (!x.scope) {
        theme.default = { ...x.settings }

        // use a single class for foreground and background
        if (x.settings.background) {
          x.settings.background = `${classPrefix}-bg`
        }
        if (x.settings.foreground) {
          x.settings.foreground = `${classPrefix}-fg`
        }
        continue
      }

      if (x.settings.foreground && x.settings.fontStyle) {
        const key = `${x.settings.foreground}-${x.settings.fontStyle}`
        if (theme.colorAndFontMap.has(key)) {
          // exiting foreground && fontStyle combination
          x.settings.foreground = `${classPrefix}-${theme.colorAndFontMap.get(key)}`
        } else {
          // new foreground && fontStyle combination
          x.settings.foreground = `${classPrefix}-${idx}`
          theme.colorAndFontMap.set(key, idx)
          idx += 1
        }
      } else if (x.settings.foreground) {
        const key = x.settings.foreground
        if (theme.colorMap.has(key)) {
          x.settings.foreground = `${classPrefix}-${theme.colorMap.get(key)}`
        } else {
          x.settings.foreground = `${classPrefix}-${idx}`
          theme.colorMap.set(key, idx)
          idx += 1
        }
      } else if (x.settings.fontStyle) {
        // using foreground because we can't use unknown values for fontStyle in textmate themes
        const key = x.settings.fontStyle
        x.settings.fontStyle = undefined
        if (theme.fontStyleMap.has(key)) {
          x.settings.foreground = `${classPrefix}-${theme.fontStyleMap.get(key)}`
        } else {
          x.settings.foreground = `${classPrefix}-${idx}`
          theme.fontStyleMap.set(key, idx)
          idx += 1
        }
      }
    }
  }
}

const writeThemes = async (themes = [], destDir = 'compiled') => {
  try {
    themes = themes.map((t) => ({
      displayName: t.displayName || t.name || '',
      name: t.name,
      type: t.type || 'css',
      semanticHighlighting: t.semanticHighlighting || false,
      tokenColors: t.tokenColors || [],
    }))

    for (const theme of themes) {
      await writeFile(join(destDir, `${theme.name}.json`), JSON.stringify(theme, null, '  '))
    }
  } catch (err) {
    console.error(err)
    exit(1)
  }
}

const writeStylesheet = async (themes = [], file = 'shikiThemes.css', classPrefix = 'st') => {
  try {
    let out = []
    for (const theme of themes) {
      out.push(`/*** ${theme.name} styles ***/`)

      // default fg and bg styles from shiki
      let background = theme.type === 'light' ? '#fffffe' : '#1e1e1e'
      let foreground = theme.type === 'light' ? '#333333' : '#bbbbbb'
      if (theme.default) {
        if (theme.default.background) background = theme.default.background
        if (theme.default.foreground) foreground = theme.default.foreground
      }
      out.push(`.${theme.name} .${classPrefix}-bg {\n  background-color: ${background};\n}`)
      out.push(`.${theme.name} .${classPrefix}-fg {\n  color: ${foreground};\n}`)

      // classes using these variables
      let temp = []
      for (const [v, k] of theme.colorAndFontMap.entries()) {
        const [color, font] = v.split('-')
        temp.push([k, `.${theme.name} .${classPrefix}-${k} {\n  color: ${color};\n  font-style: ${font};\n}`])
      }
      for (const [v, k] of theme.colorMap.entries()) {
        temp.push([k, `.${theme.name} .${classPrefix}-${k} {\n  color: ${v};\n}`])
      }
      for (const [v, k] of theme.fontStyleMap.entries()) {
        temp.push([k, `.${theme.name} .${classPrefix}-${k} {\n  font-style: ${v};\n}`])
      }

      // the sorting is unnecessary, but aesthetic
      out = out.concat(temp.sort((a, b) => a[0] - b[0]).map(([_, x]) => x))
    }

    await writeFile(file, out.join('\n'))
  } catch (err) {
    console.error(err)
    exit(1)
  }
}

const themes = await getThemes()
convertThemes(themes)
await writeThemes(themes)
await writeStylesheet(themes, '../../styles/shikiThemesDynamicVariables.css')

console.log(
  'Compiled themes: ',
  themes.map((x) => x.name),
)
