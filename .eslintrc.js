module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/interface-name-prefix": [
      "error",
      { prefixWithI: "always" },
    ],
    "@typescript-eslint/explicit-function-return-type": "off",
    "prettier/prettier": "error",
    "no-case-declarations": "off",
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
  },
};
