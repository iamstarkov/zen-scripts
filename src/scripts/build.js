const execa = require("execa");
const ora = require("ora");

const build = async () => {
  const spinner = ora("zen build").start();
  const { cwd } = process;
  const cmd = env => ([
    `BABEL_ENV=${env}`,
    `babel src -d dist/${env}`,
    `--config-file ${__dirname}/.babelrc.js`,
  ].join(" "));

  console.log('BUILDUILDUILUILD')
  try {
    await execa.shell(`rimraf dist`);
    await execa.shell(`mkdirp dist/cjs dist/esm`);
    await Promise.all([execa.shell(cmd("cjs")), execa.shell(cmd("esm"))]);
  } catch (e) {
    spinner.fail(`zen build failed with ${e}`);
    return;
  }
  spinner.succeed(`zen build finished in ${process.uptime().toFixed(2)}s`);
};

exports.build = build;
