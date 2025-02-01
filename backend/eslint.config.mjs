import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier";
import pluginDrizzle from "eslint-plugin-drizzle";
/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },

  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parser: "@typescript-eslint/parser",
      parserOptions: { project: "./tsconfig.json" },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  prettierPlugin.configs.recommended,
  pluginDrizzle.configs.recommended,
];
