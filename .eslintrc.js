module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', "plugin:flowtype/recommended"],
  plugins: ['import', 'prettier', 'immutable', 'array-func', 'flowtype'],
  rules: {
    'class-methods-use-this': 0,
    'no-console': 0,
  },
};
