# vanntile.com

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![npm type definitions](https://img.shields.io/npm/types/typescript)](https://github.com/Microsoft/TypeScript)

A personal [site](https://vanntile.com) built with [Astro 🚀](https://astro.build/).

## Contains

It currently integrates the following:

- commitizen, cz-emoji, commitlint
- standard-version
- husky, lint-staged
- Prettier
- TypeScript
- MDX, remark, rehype, mdast, shikiji

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Installs dependencies                        |
| `npm run dev`     | Starts local dev server at `localhost:4321`  |
| `npm run build`   | Build your production site to `./dist/`      |
| `npm run preview` | Preview your build locally, before deploying |
| `npm run format`  | Format code using prettier                   |
| `npm run release` | Release using standard-version               |

## License

The content of this project itself is licensed under the
[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/),
and the underlying source code used to format and display that content is
licensed under the [MIT license](LICENSE.md).
