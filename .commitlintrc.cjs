module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [0, 'always', []],
    'type-enum': [
      2,
      'always',
      [
        'wip',
        'feat',
        'fix',
        'refactor',
        'chore',
        'test',
        'uiux',
        'config',
        'ci',
        'assets',
        'docs',
        'review',
        'revert',
        'init',
      ],
    ],
  },
}
