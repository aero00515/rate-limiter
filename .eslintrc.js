module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'typescript',
    'typescript/prettier',
    'prettier',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier', '@typescript-eslint'],
  ignorePatterns: ['*.lua'],
  // add your custom rules here
  rules: {},
};
