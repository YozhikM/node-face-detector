module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'plugin:flowtype/recommended'],
  plugins: ['import', 'flowtype', 'prettier', 'immutable', 'array-func'],
  rules: {
    'class-methods-use-this': 0,
  },
};
