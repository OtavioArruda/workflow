/* eslint-env node */
module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    camelcase: "error",
    curly: "error",
    yoda: "error",
    "prefer-const": "error",
    "prefer-template": "error",
    "no-useless-concat": "error"
  }
}
