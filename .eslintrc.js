module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react", "react-hooks", "@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "@typescript-eslint/no-unused-vars": ["warn"],
    "@typescript-eslint/no-empty-function": "off",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-namespace": "off",
  },
  overrides: [
    {
      files: ["*.stories.tsx"],
      rules: {
        "react-hooks/rules-of-hooks": "off",
      },
    },
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
};
