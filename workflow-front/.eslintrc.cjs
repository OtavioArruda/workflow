/* eslint-env node */

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  plugins: [
    '@stylistic/js'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    camelcase: 'error',
    curly: 'error',
    yoda: 'error',
    'prefer-const': 'error',
    'prefer-template': 'error',
    'no-useless-concat': 'error',
    '@stylistic/js/space-before-blocks': 'error',
    '@stylistic/js/semi-spacing': 'error',
    '@stylistic/js/quotes': ['error', 'single'],
    '@stylistic/js/brace-style': ['error', 'stroustrup'],
    '@stylistic/js/function-call-spacing': ['error', 'never'],
    '@stylistic/js/keyword-spacing': ['error', {'overrides': {
      'for': { 'after': false },
      'if': { 'after': false },
      'while': { 'after': false },
      'catch': { 'after': false },
      'switch': { 'after': false },
      'from': { 'after': false },
    }}]
  }
}
