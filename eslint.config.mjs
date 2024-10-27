import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import importPlugin from 'eslint-plugin-import'

const ignoreList = {
  ignores: [
    'dist/**',
    'node_modules/**',
    'coverage/**',
    'examples/**',
    '*-lock.{json,yml,yaml}',
    'main.js',
    'tsup.config.ts',
    'eslint.config.mjs',
  ]
}

export default [
  {
    // Global settings
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    ...ignoreList,
  },
  {
    // Base config for all files
    files: ['**/*.{js,ts,mjs,cjs}'],
    ...ignoreList,
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
    ...ignoreList,
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
    ...ignoreList,
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.eslint.json'],
        tsconfigRootDir: process.cwd(),
      },
      globals: {
        browser: true,
        node: true,
      },
    },
  },
]
