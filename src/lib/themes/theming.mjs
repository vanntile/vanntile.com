import { readFile, readdir, stat, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { exit } from 'node:process'
import * as prettier from 'prettier'

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
    theme.ansiColorsMap = new Map() // Map of colorName and color
    theme.colorMap = new Map() // Map of color and index

    if (theme.colors != undefined) {
      const colors = {
        'editor.background': theme.colors['editor.background'],
        'editor.foreground': theme.colors['editor.foreground'],
      }
      for (const [k, v] of Object.entries(theme.colors)) {
        if (!k.startsWith('terminal.ansi')) continue
        colors[k] = `${classPrefix}-${k.slice('terminal.'.length)}`
        theme.ansiColorsMap.set(colors[k], v)
      }

      // only use ansi colors from the dynamic colors in the compiled them
      theme.colors = colors
    }

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

      if (x.settings.fontStyle == '') {
        x.settings.fontStyle = undefined
      }

      if (x.settings.foreground != undefined) {
        const key = x.settings.foreground
        if (theme.colorMap.has(key)) {
          x.settings.foreground = `${classPrefix}-${theme.colorMap.get(key)}`
        } else {
          x.settings.foreground = `${classPrefix}-${idx}`
          theme.colorMap.set(key, idx)
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
      colors: t.colors || {},
      tokenColors: t.tokenColors || [],
    }))

    for (const theme of themes) {
      await writeFile(
        join(destDir, `${theme.name}.json`),
        await prettier.format(JSON.stringify(theme), { printWidth: 120, parser: 'json' }),
      )
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
      let background, foreground
      if (theme.default) {
        if (theme.default.background) background = theme.default.background
        if (theme.default.foreground) foreground = theme.default.foreground
      }
      if (background == undefined && theme.colors['editor.background']) {
        background = theme.colors['editor.background']
      }
      if (foreground == undefined && theme.colors['editor.foreground']) {
        foreground = theme.colors['editor.foreground']
      }
      if (background === undefined) background = theme.type === 'light' ? '#fffffe' : '#1e1e1e'
      if (foreground === undefined) foreground = theme.type === 'light' ? '#333333' : '#bbbbbb'
      out.push(`.${theme.name} .${classPrefix}-bg {\n  background-color: ${background};\n}`)
      out.push(`.${theme.name} .${classPrefix}-fg {\n  color: ${foreground};\n}`)

      for (const [k, v] of theme.ansiColorsMap.entries()) {
        out.push(`.${theme.name} .${k} {\n  color: ${v};\n}`)
      }

      out.push(`.${theme.name} .${classPrefix}-${theme.name}-italic {\n  font-style: italic;\n}`)
      out.push(`.${theme.name} .${classPrefix}-${theme.name}-bold {\n  font-weight: bold;\n}`)
      out.push(`.${theme.name} .${classPrefix}-${theme.name}-underline {\n  text-decoration: underline;\n}`)

      // classes using these variables
      let temp = []
      for (const [v, k] of theme.colorMap.entries()) {
        temp.push([k, `.${theme.name} .${classPrefix}-${k} {\n  color: ${v};\n}`])
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
  themes
    .sort((a, b) => {
      if (a.type == b.type) return 0
      if (a.type == 'light' && b.type == 'dark') return -1
      if (a.type == 'dark' && b.type == 'light') return 2
    })
    .map((x) => `${x.name}: ${x.type}`),
)
