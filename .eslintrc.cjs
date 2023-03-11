/** @type {import("eslint").Linter.Config} */
const config = {
  overrides: [
    {
      extends: [
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project: "tsconfig.json",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint"],
  extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
  ignorePatterns: [
    "react-hooks/exhaustive-deps",
    "@typescript-eslint/no-floating-promises",
    "@typescript-eslint/restrict-template-expressions",
    "@typescript-eslint/no-unused-vars",
    "@typescript-eslint/no-non-null-assertion",
    "@typescript-eslint/no-empty-interface",
    "@typescript-eslint/no-misused-promises",
    "jsx-a11y/alt-text",
  ],
  rules: {
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
  },
};

module.exports = config;
