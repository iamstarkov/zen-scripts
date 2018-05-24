module.exports = {
  comments: false,
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: 6,
          browsers: ["last 2 versions"]
        },
        modules: process.env.BABEL_ENV === "esm" ? false : undefined
        // debug: true,
      }
    ]
  ],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
  ],
  ignore: ["**/*.test.js"]
};
