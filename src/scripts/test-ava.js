const execa = require('execa');
const ora = require('ora');

const test = async () => {
  // const spinner = ora('zen test').start();
  try {
    await execa.shell(`ava`);
  } catch (e) {
    console.log(e)
    // spinner.fail(`zen test failed with ${e}`);
    return;
  }
  console.log('succ')
  // spinner.succeed(`zen test finished in ${process.uptime().toFixed(2)}s`);
};

exports.test = test;
