module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier'],
  plugins: ['import', 'prettier', 'immutable', 'array-func'],
  rules: {
    'class-methods-use-this': 0,
    'no-console': 0,
  },
};
