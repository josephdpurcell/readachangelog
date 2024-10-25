import love from "eslint-config-love";

export default [
  {
    ...love,
    files: ["**/*.js", "**/*.ts"],
  },
  {
    files: ["**/*.js", "**/*.ts"],
    rules: {
      "@typescript-eslint/class-methods-use-this": "off",
      "@typescript-eslint/strict-boolean-expressions": "off",
      "@typescript-eslint/no-unnecessary-condition": "off",
      "@typescript-eslint/consistent-type-imports": "off",
      "@typescript-eslint/no-magic-numbers": [
        "error",
        { ignore: [0, 1, 2, 3] },
      ],
    },
  },
];
