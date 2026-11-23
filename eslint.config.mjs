import { defineConfig, globalIgnores } from "eslint/config";
import next from "@next/eslint-plugin-next";
import tsParser from "@typescript-eslint/parser";

export default defineConfig([
  globalIgnores(["**/.next/**", "**/node_modules/**", "**/dist/**"]),
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: { sourceType: "module", ecmaVersion: "latest" },
    },
    plugins: { "@next/next": next },
    rules: {
      ...next.configs.recommended.rules,
      "@next/next/no-html-link-for-pages": "off",
    },
  },
]);
