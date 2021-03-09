module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        'client',
        'server',
        'db',
        'release',
        'ci',
        'security',
        'performance',
        'a11y',
        'i18n',
        'typos',
        'literals',
        'analytics',
        'seo',
        'android',
        'linux',
        'windows',
        'osx',
        'ios',
      ],
    ],
    'type-enum': [
      2,
      'always',
      ['wip', 'feature', 'fix', 'refactoring', 'config', 'chore', 'uiux', 'assets', 'test', 'docs', 'init'],
    ],
  },
}
