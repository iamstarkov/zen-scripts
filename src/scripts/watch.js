const execa = require("execa");
const ora = require("ora");

const watch = async () => {
  const spinner = ora("zen watch").start();
  process.on("SIGINT", function() {
    // console.log('on SIGINT');
    spinner.succeed(`zen watch stopped after ${process.uptime().toFixed(2)}s`);
    process.exit(0);
  });
  const cmd = env =>
    [
      `BABEL_ENV=${env}`,
      `babel src -d dist/${env}`,
      `--config-file ${__dirname}/.babelrc.js`,
      `--copy-files`,
      `--ignore test.js,.md`,
      `--watch`
    ].join(" ");
  try {
    await execa.shell(`rimraf dist`);
    const cjs = execa.shell(cmd("cjs"));
    const esm = execa.shell(cmd("esm"));
    // TODO: update spinner with latest changed file
    await Promise.all([cjs, esm]);
  } catch (e) {
    if (e.signal !== "SIGINT") {
      spinner.fail(`zen watch failed with ${e}`);
    }
    return;
  }
  spinner.succeed(`zen watch finished in ${process.uptime().toFixed(2)}s`);
};

exports.watch = watch;
