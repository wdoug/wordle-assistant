/* eslint-env node */
module.exports = {
  env: {
    browser: false,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:jest/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: true,
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint", "jest"],
  rules: {},
  // root: true is a generally good ESLint practice to indicate this file is the root-level one used by the project and ESLint should not search beyond this directory for config files. --source: https://typescript-eslint.io/getting-started
  root: true,
  overrides: [
    {
      files: ["*.js"],
      extends: ["plugin:@typescript-eslint/disable-type-checked"],
    },
  ],
};
