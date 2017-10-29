module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  globals: {
    afterAll: true,
    jest: true,
    describe: true,
    test: true,
    expect: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    sourceType: 'module'
    ecmaVersion: 8,
  },
  rules: {
    indent: [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    quotes: [
      'error',
      'single'
    ],
    semi: [
      'error',
      'never'
    ]
  }
}
