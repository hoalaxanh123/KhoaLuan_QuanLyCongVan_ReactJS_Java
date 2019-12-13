module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    // semi: ["error"],
    // quotes: ["error", "single"],
    'prettier/prettier': 'error'
  },
  plugins: ['prettier'],
  extends: ['plugin:prettier/recommended']
}
