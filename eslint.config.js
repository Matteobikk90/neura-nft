import js from "@eslint/js";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import typescriptEslintParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import tailwindPlugin from "eslint-plugin-tailwindcss";
import globals from "globals";

export default [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      parser: typescriptEslintParser,
      globals: {
        ...globals.browser,
        ...globals.node,
        React: true,
        NodeJS: true,
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslintPlugin,
      "react-hooks": reactHooksPlugin,
      "unused-imports": unusedImportsPlugin,
      tailwindcss: tailwindPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...typescriptEslintPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      "tailwindcss/classnames-order": "warn",
      "no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    ignores: [
      "dist",
      "build",
      "node_modules",
      "contracts/**/*.sol",
      "backend/go-api",
    ],
  },
  {
    files: ["./apps/mobile/metro.config.js"],
    languageOptions: {
      sourceType: "commonjs",
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];
