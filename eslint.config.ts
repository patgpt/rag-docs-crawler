import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import type { Linter } from "eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import prettier from "eslint-plugin-prettier";
import globals from "globals";

export default [
  {
    ignores: ["node_modules/**", "dist/**", "**/*.d.ts"],
  },

  js.configs.recommended,
  tseslint.configs.recommended,

  // Global and environment settings
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },

  // Custom rules
  {
    rules: {
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "error",
      "prettier/prettier": "error",
    },
  },

  // Prettier config (must be last)
  {
    plugins: {
      prettier,
    },
    rules: {
      ...eslintConfigPrettier.rules,
    },
  },
] as Linter.Config[];
