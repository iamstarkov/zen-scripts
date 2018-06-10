const execa = require("execa");
const ora = require("ora");

const build = async () => {
  const spinner = ora("zen lint").start();
  try {
    await execa.shell(`eslint --config=${__dirname}/../configs/eslint.js src`);
  } catch (e) {
    spinner.fail(`zen lint failed with ${e}`);
    return;
  }
  spinner.succeed(`zen lint finished in ${process.uptime().toFixed(2)}s`);
};

exports.build = build;
