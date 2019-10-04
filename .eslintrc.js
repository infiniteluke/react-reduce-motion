module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  extends: ['problems'],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 2,
    strict: 0,
  },
};
