# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.1.0](https://github.com/vanntile/vanntile.com/compare/v2.0.1...v2.1.0) (2021-05-07)


### Features

* **security:** :star2: update headers ([792965c](https://github.com/vanntile/vanntile.com/commit/792965cc55a3e57c078b2f8936c9ca11d83f0090))

### [2.0.1](https://github.com/vanntile/vanntile.com/compare/v2.0.0...v2.0.1) (2021-05-06)

### ⚠ BREAKING CHANGES

* **security:** - Changed email sending dependencies and functions
* **security:** - removed hash from production CSP due to compatibility issues
* - changed from React static + express to NextJS

* config(release): :wrench: added commitizen

* docs: :pencil: Updated README

* chore(release): 0.10.0

* feature(security): :star2: Added CSP header

* feature: :star2: Added proper linting
* - Added ESLINT proper configs

* feature: :star2: Added TailwingCSS for UI styling

Using preprocessed tailwind seems like an efficient choice
* - Learning tailwind

* fix: :bug: Next viewport warning

* refactoring: :fire: Remade markup

* feature: :star2: Added loading progress bar
* - new stylesheet added

* feature: :star2: Added Markdown dynamic content generation
* - remark and grey-matter

* chore(release): 0.11.0

* refactoring(client): :fire: Changed paths to aliased modules

Added tsconfig and eslint resolvers and settings

* feature: :star2: added MDX rendering and rendering

- Added MDXProvider for idirect rendering of
- Refactor lib/posts to lib/mdx for remote rendering (with local data source for now)
- Changed tailwind styles and css (TODO: customise them)
- Added reading time to posts
- Reworked aliased modules as default exports for components

* config: :wrench: Updated dependencies

Removed some deps, added stylelint

* feature: :star2: MDX setup completed

* chore(release): 0.11.1

* feature: :star2: added header link hashes styling

* wip(client): :construction: added basic type and color styling"

* feature: :star2: Added Container component
* - Container contains major logic in meta tags and theming.

* refactoring: :fire: Removed unused snippets to their own folder

* refactoring: :fire: Syntax refactor

* refactoring: :fire: rework on container and navbar

* refactoring: :fire: reorganised global styles

* fix: :bug: Sizing contents

* wip: :construction: Tailwind size styling

* refactoring: :fire: Added headwind class order and css base layer
* - edited tsconfig to ignore old snippets

* fix: :bug: Dark mode

* config: :wrench: removed tailwind/typography and added css
* - Using tailwindcss/jit compiler for faster development

* chore(release): 0.12.0

* feature: :star2: updated styling

- Completed dark theme for blog

* chore(release): 0.12.1

* refactoring: :fire: removed prose
* - refactores the styles

* config: :wrench: added dependency

* feature: :star2: added components

* feature: :star2: added useIntersection hook

* feature: :star2: created homepage
* - major homepage changes

* chore: :nut_and_bolt: removed not own content

* chore(release): 1.0.0

### Features

* :star2: contact form ([ca8794a](https://github.com/vanntile/vanntile.com/commit/ca8794addcc5ede01499ba00aab0099eaf891716))


### Bug Fixes

* **uiux:** :bug: small spacing issues ([8eefb21](https://github.com/vanntile/vanntile.com/commit/8eefb2141823cac20ab0fdcfd0c7571eb612843a))
* **uiux:** :bug: tags spacing ([1eb81e7](https://github.com/vanntile/vanntile.com/commit/1eb81e7d787905b15831c5d51422bbee74745caf))
* :bug: accessibility and animation improvements ([86c373d](https://github.com/vanntile/vanntile.com/commit/86c373d463413e2736594262e81d44d21451e4c2))
* :bug: broken animation visibility ([077dc95](https://github.com/vanntile/vanntile.com/commit/077dc955e964947f7944991b419f515f61dfed3a))
* :bug: content deploy fixes ([1d820cb](https://github.com/vanntile/vanntile.com/commit/1d820cb377ac2fba880934084b22f6d898b1851d))
* :bug: heroku fixes ([ef915e1](https://github.com/vanntile/vanntile.com/commit/ef915e1a30e020590ea5f4d4224b46bbbf5bc424))
* :bug: improved accessibility ([d2b2742](https://github.com/vanntile/vanntile.com/commit/d2b274246f1813f5d13e56a03e2f490f12369d7c))
* :bug: initial deploy fixes ([b44dcd9](https://github.com/vanntile/vanntile.com/commit/b44dcd92de9e5a9e244d59461afa40b15e6e15d5))
* :bug: missing tags keys ([870c0c9](https://github.com/vanntile/vanntile.com/commit/870c0c98b00f1118dbc689a0a5a1e0d3c2ccc98a))
* :bug: user submitted bug ([c721592](https://github.com/vanntile/vanntile.com/commit/c721592d3c54b05f7e06f5fbf173a5dca20fb302))
* upgrades and fixes ([#3](https://github.com/vanntile/vanntile.com/issues/3)) ([357c24b](https://github.com/vanntile/vanntile.com/commit/357c24be93b7a28fc465cea12c519957a7162b42))
* **security:** :bug: Changed email packages to remove security issue ([65a6f8e](https://github.com/vanntile/vanntile.com/commit/65a6f8ecd54554eb7ebbb6b5043fcedb1554f8e7))
* **security:** :bug: updated CSP headers ([7b6733b](https://github.com/vanntile/vanntile.com/commit/7b6733bbcef514bae496d34ed3a9fc951250cc66))


* NextJS rewrite (#1) ([03f5f36](https://github.com/vanntile/vanntile.com/commit/03f5f365c9124886b093ef71fe7ab7440bc6522e)), closes [#1](https://github.com/vanntile/vanntile.com/issues/1)

## [1.0.0](https://github.com/vanntile/vanntile.com/compare/v0.12.1...v1.0.0) (2021-03-26)


### ⚠ BREAKING CHANGES

* - major homepage changes
* - refactores the styles

### refactoring

* :fire: removed prose ([9a9de75](https://github.com/vanntile/vanntile.com/commit/9a9de75727c04b6af3187935a09a3edaace8a234))


### feature

* :star2: created homepage ([5ad0c24](https://github.com/vanntile/vanntile.com/commit/5ad0c246cb49fa503fc864fb95b61b2b98bbf2ac))

### [0.12.1](https://github.com/vanntile/vanntile.com/compare/v0.12.0...v0.12.1) (2021-03-22)

## [0.12.0](https://github.com/vanntile/vanntile.com/compare/v0.11.1...v0.12.0) (2021-03-20)


### ⚠ BREAKING CHANGES

* - Using tailwindcss/jit compiler for faster development
* - edited tsconfig to ignore old snippets
* - Container contains major logic in meta tags and theming.

### Bug Fixes

* :bug: Dark mode ([813f58d](https://github.com/vanntile/vanntile.com/commit/813f58df60997a463a99cc7a51fd4833eb8e795c))
* :bug: Sizing contents ([b1e9790](https://github.com/vanntile/vanntile.com/commit/b1e97902873d30039dfff4f1f9128bf29ddbe8a7))


### feature

* :star2: Added Container component ([4eca814](https://github.com/vanntile/vanntile.com/commit/4eca81462586d18d168e8d5e02f91c43214972b3))


### refactoring

* :fire: Added headwind class order and css base layer ([fde4aca](https://github.com/vanntile/vanntile.com/commit/fde4acaf0926b0f199224be155dfe77e9564c50b))


### config

* :wrench: removed tailwind/typography and added css ([b22f742](https://github.com/vanntile/vanntile.com/commit/b22f742ae0b96b81a258aa27c5f60add7fec8edc))

### [0.11.1](https://github.com/vanntile/vanntile.com/compare/v0.11.0...v0.11.1) (2021-03-13)

## [0.11.0](https://github.com/vanntile/vanntile.com/compare/v0.10.0...v0.11.0) (2021-03-10)


### ⚠ BREAKING CHANGES

* - remark and grey-matter
* - new stylesheet added
* - Learning tailwind
* - Added ESLINT proper configs

### Bug Fixes

* :bug: Next viewport warning ([23e3dab](https://github.com/vanntile/vanntile.com/commit/23e3daba2a67f719c5fea7dd39de2a2b5b614568))


### feature

* :star2: Added loading progress bar ([c388aa3](https://github.com/vanntile/vanntile.com/commit/c388aa36dcfc10105fed972a17b48674fcc34ec2))
* :star2: Added Markdown dynamic content generation ([29cd33c](https://github.com/vanntile/vanntile.com/commit/29cd33cec63e7314909450d000452012abd04721))
* :star2: Added proper linting ([52dfa0c](https://github.com/vanntile/vanntile.com/commit/52dfa0ceb71c104e4c1c8fc18a686a34230c389a))
* :star2: Added TailwingCSS for UI styling ([5b27409](https://github.com/vanntile/vanntile.com/commit/5b274091e2f0ff2e0439446837db0014a9a2f1a5))

## 0.10.0 (2021-03-09)


### ⚠ BREAKING CHANGES

* **client:** - changed from React static + express to NextJS

### refactoring

* **client:** :fire: Changed architecture to NextJS ([7623747](https://github.com/vanntile/vanntile.com/commit/76237478d6b4063194d30c435c452dea74445285))
