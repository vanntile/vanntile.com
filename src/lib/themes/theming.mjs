import { join } from 'node:path'
import { stat, readdir, readFile, writeFile } from 'node:fs/promises'
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
    const compiled = {}

    const foregroundColors = new Set()
    const fontStyles = new Set()
    for (const x of theme.tokenColors) {
      if (!x.scope) {
        compiled.default = { ...x.settings }
        continue
      }

      if (x.settings.foreground) foregroundColors.add(x.settings.foreground)
      if (x.settings.fontStyle) fontStyles.add(x.settings.fontStyle)
    }

    compiled.colorMapping = new Map([...foregroundColors].map((x, i) => [x, `${theme.name}-fg-${i}`]))
    compiled.styleMapping = new Map([...fontStyles].map((x, i) => [x, `${theme.name}-fs-${i}`]))

    for (const x of theme.tokenColors) {
      if (!x.scope) {
        if (x.settings.background) {
          x.settings.background = `${classPrefix}-bg`
        }
        if (x.settings.foreground) {
          x.settings.foreground = `${classPrefix}-fg`
        }
        continue
      }

      if (x.settings.foreground) {
        x.settings.foreground = `${classPrefix}-${compiled.colorMapping.get(x.settings.foreground)}`
      }
      if (x.settings.fontStyle) {
        x.settings.fontStyle = `${classPrefix}-${compiled.styleMapping.get(x.settings.fontStyle)}`
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
      // default fg and background styles
      if (theme.compiled.default) {
        if (theme.compiled.default.background) {
          out.push(`.${theme.name} .${classPrefix}-bg {\n  background-color: ${theme.compiled.default.background};\n}`)
        }
        if (theme.compiled.default.foreground) {
          out.push(`.${theme.name} .${classPrefix}-fg {\n  color: ${theme.compiled.default.foreground};\n}`)
        }
      }

      // classes using these variables
      for (const [v, k] of theme.compiled.colorMapping.entries()) {
        out.push(`.${theme.name} .${classPrefix}-${k} {\n  color: ${v};\n}`)
      }
      for (const [v, k] of theme.compiled.styleMapping.entries()) {
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
