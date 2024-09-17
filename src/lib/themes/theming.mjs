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
  for (const theme of themes) {
    theme.foregroundColors = new Set()
    theme.fontStyles = new Set()
    for (const x of theme.tokenColors) {
      if (x.settings.foreground) theme.foregroundColors.add(x.settings.foreground)
      if (x.settings.fontStyle) theme.fontStyles.add(x.settings.fontStyle)
    }
  }

  let styleIdx = 0
  for (const theme of themes) {
    const compiled = {
      colorMap: new Map(),
      styleMap: new Map(),
    }

    // use a single index for all output shiki variables
    for (const x of [...theme.foregroundColors]) {
      compiled.colorMap.set(x, styleIdx)
      styleIdx += 1
    }
    for (const x of [...theme.fontStyles]) {
      compiled.styleMap.set(x, styleIdx)
      styleIdx += 1
    }

    for (const x of theme.tokenColors) {
      // debatably, this should be removed from output
      if (!x.scope) {
        compiled.default = { ...x.settings }

        // use a single class for foreground and background
        if (x.settings.background) {
          x.settings.background = `${classPrefix}-bg`
        }
        if (x.settings.foreground) {
          x.settings.foreground = `${classPrefix}-fg`
        }
        continue
      }

      if (x.settings.foreground) {
        x.settings.foreground = `${classPrefix}-${compiled.colorMap.get(x.settings.foreground)}`
      }
      if (x.settings.fontStyle) {
        x.settings.fontStyle = `${classPrefix}-${compiled.styleMap.get(x.settings.fontStyle)}`
      }
    }

    theme.compiled = compiled
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
    const out = []
    for (const theme of themes) {
      out.push(`/*** ${theme.name} styles ***/`)

      // default fg and bg styles from shiki
      let background = theme.type === 'light' ? '#fffffe' : '#1e1e1e'
      let foreground = theme.type === 'light' ? '#333333' : '#bbbbbb'
      if (theme.compiled.default) {
        if (theme.compiled.default.background) {
          background = theme.compiled.default.background
        }
        if (theme.compiled.default.foreground) {
          foreground = theme.compiled.default.foreground
        }
      }
      out.push(`.${theme.name} .${classPrefix}-bg {\n  background-color: ${background};\n}`)
      out.push(`.${theme.name} .${classPrefix}-fg {\n  color: ${foreground};\n}`)

      // classes using these variables
      for (const [v, k] of theme.compiled.colorMap.entries()) {
        out.push(`.${theme.name} .${classPrefix}-${k} {\n  color: ${v};\n}`)
      }
      for (const [v, k] of theme.compiled.styleMap.entries()) {
        out.push(`.${theme.name} .${classPrefix}-${k} {\n  font-style: ${v};\n}`)
      }
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
