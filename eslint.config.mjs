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
  // noStyle: true means Prettier owns 100% of formatting —
  // no double-managed style rules, no possible conflicts.
  ...neostandard({ noStyle: true, noJsx: true }),

  // Import correctness rules (the thing we actually wanted from
  // Airbnb in the first place — catches broken/mismatched imports
  // like the ../models/User.js vs ../model/User.js bug).
  // neostandard dropped this from its own bundle to stay lean;
  // this is their documented way to add it back.
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
