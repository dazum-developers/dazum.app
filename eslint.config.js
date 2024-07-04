import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import pluginJs from '@eslint/js'
import browser from 'eslint-config-canonical/configurations/browser.js'
import jsdoc from 'eslint-config-canonical/configurations/jsdoc.js'
import jsxa11y from 'eslint-config-canonical/configurations/jsx-a11y.js'
import module from 'eslint-config-canonical/configurations/module.js'
import node from 'eslint-config-canonical/configurations/node.js'
import prettier from 'eslint-config-canonical/configurations/prettier.js'
import react from 'eslint-config-canonical/configurations/react.js'
import regexp from 'eslint-config-canonical/configurations/regexp.js'
import typescript from 'eslint-config-canonical/configurations/typescript.js'
import github from 'eslint-plugin-github'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'
import globals from 'globals'
import tseslint from 'typescript-eslint'

import eslintPluginAlly from 'eslint-plugin-jsx-a11y'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'

import eslintPluginImport from 'eslint-plugin-import'
import eslintPluginJest from 'eslint-plugin-jest'

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
  { ignores: ['.husky', '.vscode', 'prisma', '.next', 'node_modules', 'eslint.config.js', '.env*'] },
  browser,
  jsdoc,
  jsxa11y,
  module,
  node,
  prettier,
  react,
  regexp,
  typescript,
  github,
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    plugins: [
      fixupPluginRules(eslintPluginAlly),
      fixupPluginRules(eslintPluginReact),
      fixupPluginRules(eslintPluginReactHooks),
      fixupPluginRules(eslintPluginImport),
      fixupPluginRules(eslintPluginJest),
    ],
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/member-delimiter-style': 'off',
      '@typescript-eslint/semi': 'off',
      '@typescript-eslint/space-before-function-paren': 'off',
      'canonical/prefer-inline-type-import': 'off',
      'jsdoc/tag-lines': 'off',
      'prettier/prettier': 'off',
      'react/forbid-component-props': 'off',
      'react/function-component-definition': 'off',
      'react/jsx-closing-bracket-location': 'off',
      'react/jsx-newline': 'off',
    },
  },
]
