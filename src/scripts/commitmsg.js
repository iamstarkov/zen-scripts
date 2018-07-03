const execa = require('execa');
const ora = require('ora');

const commitmsg = async () => {
  // const spinner = ora('zen commitmsg').start();
  await execa.shell('commitlint', ['-e', '$GIT_PARAMS', `--config=${__dirname}/../configs/commitlint.config.js`]);
  // spinner.succeed(`zen commitmsg finished in ${process.uptime().toFixed(2)}s`);
};

exports.commitmsg = commitmsg;
