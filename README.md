# vanntile.com portfolio


[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![npm type definitions](https://img.shields.io/npm/types/typescript)](https://github.com/Microsoft/TypeScript)

Nothing to say. Here's a cookie 🍪.

## Contains

It currently integrates the following:

- commitizen, cz-emoji, commitlint
- standard-version
- husky
- Prettier configuration
- TypeScript

## How to release

```sh
# 1. Commit
npm run commit
# 2. Relase
npm run release
# 3. Push the tags
git push --tags
```

## TODO

- [ ]: styles: em visual tests, code size reduction
- [ ]: styles: color no-overrrides
- [x]: styles: check accessibilty on colors and
- [x]: styles: 360px not rendered correctly
- [ ]: security: CSP fix for ThemeProvider (maybe PR)
- [ ]: content: add 1 article
- [ ]: content: add brand book in the 'Design deck'
- [ ]: SEO: images, images, images
- [x]: homepage: li non accessible on homepage
- [x]: homepage: add sections links above the fold (and blog link)
- [x]: homepage: check if content-visibility is useful
- [ ]: performance: worker thread?
- [ ]: performance: slow loading (idk how to fix?)
- [x]: heroku: mailgun and contact form
