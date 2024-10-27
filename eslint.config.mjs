import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import importPlugin from 'eslint-plugin-import'

export default [
  {
    // Global settings
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    ignores: ['dist/', 'node_modules/**', 'coverage/**', 'examples/**', '*-lock.{json,yml,yaml}', 'main.js', 'tsup.config.ts'],
  },
  {
    // Base config for all files
    files: ['**/*.{js,ts,mjs,cjs}'],
    plugins: {
      '@typescript-eslint': tsPlugin,
      'import': importPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
  },
  {
    // JavaScript-specific config
    files: ['**/*.{js,cjs}'],
    languageOptions: {
      sourceType: 'script',
      ecmaVersion: 'latest',
      globals: {
        node: true,
      },
    },
  },
  {
    // TypeScript-specific config
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.eslint.json',
      },
      globals: {
        browser: true,
        node: true,
      },
    },
  },
]
