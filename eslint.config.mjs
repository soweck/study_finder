import path from "node:path";

import { includeIgnoreFile } from "@eslint/compat";
import { defineConfig } from "eslint/config";
import neostandard from "neostandard";
import importX from "eslint-plugin-import-x";
import stylistic from "@stylistic/eslint-plugin";
import globals from "globals";

const gitignorePath = path.resolve(".", ".gitignore");

export default defineConfig([
  // Ignore files and folders listed in .gitignore
  includeIgnoreFile(gitignorePath),

  // neostandard: correctness + logic rules only.
  ...neostandard({ noStyle: true, noJsx: true }),

  // Import correctness rules (apply everywhere)
  {
    name: "import-x/config",
    files: ["src/**/*.js"],
    plugins: { "import-x": importX },
    rules: {
      "import-x/no-unresolved": "error",
      "import-x/named": "error",
      "import-x/default": "error",
      "import-x/export": "error",
      "import-x/no-duplicates": "error",
    },
  },

  // Export convention: UI components/pages ARE the default export.
  // A component file's whole reason to exist is "this is the one
  // component," so default export is the right fit here, and we
  // actively encourage it when there's exactly one export.
  {
    name: "import-x/component-exports",
    files: ["src/component/**/*.js", "src/pages/**/*.js"],
    plugins: { "import-x": importX },
    rules: {
      "import-x/no-default-export": "off",
      "import-x/prefer-default-export": "error",
    },
  },

  // Export convention: everything else (models, store, utils, services,
  // data) must use named exports only. These files often export more
  // than one thing, and named exports keep every import explicit and
  // renamed-safe, matching CONTRIBUTING.md.
  {
    name: "import-x/non-component-exports",
    files: [
      "src/model/**/*.js",
      "src/store/**/*.js",
      "src/utils/**/*.js",
      "src/service/**/*.js",
      "src/data/**/*.js",
    ],
    plugins: { "import-x": importX },
    rules: {
      "import-x/no-default-export": "error",
    },
  },

  // Browser source: your actual app code
  {
    name: "js/browser-source",
    files: ["src/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
    },
  },

  // Scoped stylistic exceptions: Prettier owns formatting (noStyle: true
  // above), but these few rules cover things Prettier deliberately does
  // NOT touch — blank-line spacing between logical units, and comment
  // formatting. Kept minimal and separate from Prettier's job on purpose.
  {
    name: "js/stylistic-exceptions",
    files: ["src/**/*.js"],
    plugins: { "@stylistic": stylistic },
    rules: {
      // Blank line before/after every function declaration (what you asked for)
      "@stylistic/padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "function" },
        { blankLine: "always", prev: "function", next: "*" },
        { blankLine: "always", prev: "*", next: "return" },
      ],
      // Blank line between class methods — directly relevant to your
      // User/StudySession classes, which stack several methods together.
      // Prettier does not enforce this on its own.
      "@stylistic/lines-between-class-members": [
        "error",
        "always",
        { exceptAfterSingleLine: true },
      ],
      // Requires a space after // and /* — Prettier doesn't touch comment
      // content, only code, so this is a real gap it leaves open.
      "@stylistic/spaced-comment": ["error", "always"],
    },
  },

  // Architecture safeguards
  {
    name: "js/safeguards",
    files: ["src/**/*.js"],
    rules: {
      "no-unused-vars": [
        "error",
        { vars: "all", args: "after-used", ignoreRestSiblings: true },
      ],
      "no-const-assign": "error",
      "no-undef": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-param-reassign": ["error", { props: true }],
      "no-unused-private-class-members": "error",
      "no-useless-constructor": "error",
    },
  },

  // Build/tooling config files: these run in Node, not the browser
  {
    name: "js/node-config-files",
    files: [
      "*.config.js",
      "*.config.mjs",
      "vite.config.js",
      "eslint.config.mjs",
    ],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
]);
