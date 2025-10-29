// eslint.config.js
import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Resolve current file's directory for FlatCompat base
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create FlatCompat instance for extending old ESLint configs
const compat = new FlatCompat({
  baseDirectory: __dirname
});

// Export ESLint config
export default [
  ...compat.extends(
    'next',
    'next/core-web-vitals', // Next.js core web vitals rules
    'next/typescript' // Next.js + TypeScript recommended rules
  ),
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json' // Ensure TypeScript rules read from tsconfig
      }
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json' // Match import alias to tsconfig
        }
      }
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      'array-callback-return': 'error',
      'no-await-in-loop': 'error',
      'no-constructor-return': 'error',
      'no-duplicate-imports': 'error',
      'no-inner-declarations': 'error',
      'no-promise-executor-return': 'error',
      'no-self-compare': 'error',
      'no-template-curly-in-string': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-unreachable-loop': 'error',
      'no-use-before-define': 'error',
      'no-useless-assignment': 'error',
      'require-atomic-updates': 'error',
      // Styleistic linting rules
      'no-else-return': 'error',
      'no-implicit-coercion': 'error',
      'no-new-wrappers': 'error',
      'no-param-reassign': 'error',
      'no-return-assign': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'require-await': 'error',
      yoda: 'error'
    }
  }
];
