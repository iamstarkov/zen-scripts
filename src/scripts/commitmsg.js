const execa = require('execa');
const ora = require('ora');

const commitmsg = async () => {
  // const spinner = ora('zen commitmsg').start();
  try {
    const { stdout, stderr } = await execa.shell(`commitlint -e $GIT_PARAMS --config=${__dirname}/../configs/commitlint.config.js`);
    console.log('\n\n\nstdout=====')
    console.log(stdout)
    console.log('\n\n\nstderr=====')
    console.log(stderr)
  } catch (e) {
    // spinner.fail(`zen commitmsg failed with ${e}`);
    console.log(e);
    return;
  }
  // spinner.succeed(`zen commitmsg finished in ${process.uptime().toFixed(2)}s`);
};

exports.commitmsg = commitmsg;
