import globals from 'globals'
import { defineConfig } from 'eslint/config'


export default defineConfig([
  { files: ['**/*.{js,mjs,cjs}'], languageOptions: { globals: globals.browser },
    'rules': {
      'semi': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'no-trailing-spaces': 'error',
      'no-multi-spaces': 'error',
      'space-in-parens': ['error', 'never'],
      'array-bracket-spacing': ['error', 'never'],
      'space-before-function-paren': ['error', 'never'],
      'quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }]
    } },
])