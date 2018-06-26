module.exports = {
  files: ["src/**/*.test.js"],
  require: ["esm", "@babel/register", "@babel/polyfill"],
  babel: {
    testOptions: {
      presets: [
        [
          "@babel/preset-env",
          {
            targets: {
              node: "current",
            },
          }
        ]
      ],
    }
  }
};
