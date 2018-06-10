const execa = require('execa');
const ora = require('ora');

const commit = async () => {
  const spinner = ora('zen commit').start();
  try {
    await execa.shell('git-cz');
  } catch (e) {
    spinner.fail(`zen commit failed with ${e}`);
    return;
  }
  spinner.succeed(`zen commit finished in ${process.uptime().toFixed(2)}s`);
};

exports.commit = commit;
