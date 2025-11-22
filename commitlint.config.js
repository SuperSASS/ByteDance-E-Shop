export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [1, 'always', ['web', 'admin']], // (scope) 限定
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'test',
        'perf',
        'chore',
        'ci',
        'build',
        'revert',
      ],
    ], // (type) 限定
  },
}
