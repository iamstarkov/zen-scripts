const execa = require('execa');
const ora = require('ora');

const commitmsg = async () => {
  const spinner = ora('zen commitmsg').start();
  try {
    await execa.shell(`commitlint -e $GIT_PARAMS --config=${__dirname}/../configs/commitlint.config.js`);
  } catch (e) {
    spinner.fail(`zen commitmsg failed with ${e}`);
    return;
  }
  spinner.succeed(`zen commitmsg finished in ${process.uptime().toFixed(2)}s`);
};

exports.commitmsg = commitmsg;
