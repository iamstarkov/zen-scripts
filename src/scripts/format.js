const execa = require('execa');
const ora = require('ora');

const format = async () => {
  const spinner = ora('zen format').start();
  try {
    await execa.shell(`prettier --write 'src/**/*.js'`);
  } catch (e) {
    spinner.fail(`zen format failed with ${e}`);
    return;
  }
  spinner.succeed(`zen format finished in ${process.uptime().toFixed(2)}s`);
};

exports.format = format;
