module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  overrides: [
    {
      env: { node: true },
      files: ['.eslintrc.{js,cjs}', 'jest.config.js', '*.js'],
      parserOptions: { sourceType: 'script' },
    },
    {
      env: { browser: true, node: true },
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.eslint.json',
        sourceType: 'module',
      },
    },
  ],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
  },
  root: true,
};
