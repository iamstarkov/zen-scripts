module.exports = {
  extends: ["airbnb", "prettier", "prettier/react"],
  // parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true
    }
  },
  plugins: [
    "react",
    "require-path-exists",
  ],
  env: {
    node: true,
    browser: true,
    es6: true
  }
};
