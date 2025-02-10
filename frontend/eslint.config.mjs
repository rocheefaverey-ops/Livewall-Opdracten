import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
  },
  {
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  
  {
    plugins: {
      "jsx-a11y": jsxA11y,  // Voeg de plugin toe als object
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      'import/prefer-default-export': 'off',
      '@typescript-eslint/naming-convention': 'off',
      'react/function-component-definition': 'off',
      'react/require-default-props': 'off',
      'jsx-a11y/click-events-have-key-events': 'error',
      'jsx-a11y/no-static-element-interactions': 'error',
      'jsx-a11y/no-noninteractive-element-interactions': 'error',
      'jsx-a11y/anchor-is-valid': 'error',
      'import/order': 'off',
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    } // Disable all rules for next.config.js
  },
  {
    files: ["next.config.js"],
    rules: {}  // Geen regels toepassen op next.config.js
  },
];
