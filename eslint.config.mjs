import path from "node:path";

import { includeIgnoreFile } from "@eslint/compat";
import { defineConfig } from "eslint/config";
import neostandard from "neostandard";
import importX from "eslint-plugin-import-x";
import globals from "globals";

const gitignorePath = path.resolve(".", ".gitignore");

export default defineConfig([
  // Ignore files and folders listed in .gitignore
  includeIgnoreFile(gitignorePath),

  // neostandard: correctness + logic rules only.
  ...neostandard({ noStyle: true, noJsx: true }),

  // Import correctness rules
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
      "import-x/no-default-export": "error", // Enforces strict named exports uniform layout
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

  // Corporate Architecture Safeguards
  {
    name: "js/architecture-safeguards",
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
