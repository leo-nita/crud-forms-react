import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import globals from 'globals';
import { fixupPluginRules } from '@eslint/compat'; // <--- Import this

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      // Wrap the plugin here to fix the "getFilename" error
      react: fixupPluginRules(reactPlugin),
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'no-console': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
);
