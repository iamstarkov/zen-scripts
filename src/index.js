// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", err => {
  console.log("💥 ERR");
  throw err;
});

const { argv } = process;

const args = argv.slice(2);

const [script] = args;

const main = async () => {
  if (script === "build") {
    const { build } = require("./scripts/build");
    await build();
    return;
  }

  if (script === "watch") {
    const { watch } = require("./scripts/watch");
    await watch();
    return;
  }

  if (script === "lint") {
    const { lint } = require("./scripts/lint");
    await lint();
    return;
  }

  if (script === "format") {
    const { format } = require("./scripts/format");
    await format();
    return;
  }

  if (script === "commit") {
    const { commit } = require("./scripts/commit");
    await commit();
    return;
  }

  if (script === "commitmsg") {
    const { commitmsg } = require("./scripts/commitmsg");
    await commitmsg();
    return;
  }

  if (script === "test" && args[1] === 'ava') {
    const { test } = require("./scripts/test-ava");
    await test();
    return;
  }

  if (script === "tdd" && args[1] === 'ava') {
    const { test } = require("./scripts/tdd-ava");
    await test();
    return;
  }
};


main();
