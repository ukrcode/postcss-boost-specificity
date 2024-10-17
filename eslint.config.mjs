import jest from "eslint-plugin-jest";
import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        ecmaVersion: 2022,
      },
    },
  },
  {
    files: ["*.test.js", "*.spec.js"],
    ...jest.configs["flat/recommended"],
  }
];
