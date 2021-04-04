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
- Module alias
- NextJS (React framework)
- React tabs (accessible and usable)
- TailwindCSS & PostCSS
- MDX, remark, rehype, mdx-prism (and @next/mdx)
- restrictive CSP
- Next API
- Mailgun.js & rate limiting (with lru-cache)

## How to release

```sh
# 1. Commit
npm run commit
# 2. Relase
npm run release
# 3. Push the tags
git push --follow-tags
```

## TODO

- [x]: styles: em visual tests, code size reduction
- [x]: styles: color no-overrrides
- [x]: styles: check accessibilty on colors and
- [x]: styles: 360px not rendered correctly
- [x]: security: CSP fix for ThemeProvider (maybe PR)
- [ ]: content: add 1 article
- [ ]: content: add brand book in the 'Design deck'
- [x]: SEO: images, images, images
- [x]: homepage: li non accessible on homepage
- [x]: homepage: add sections links above the fold (and blog link)
- [x]: homepage: check if content-visibility is useful
- [x]: ~~performance: worker thread?~~
- [x]: performance: slow loading (idk how to fix?)
- [x]: heroku: mailgun and contact form
