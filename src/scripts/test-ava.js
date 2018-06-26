const execa = require('execa');

const test = async () => {
  execa(`ava`, ['--watch'], { stdio: 'inherit' });
};

exports.test = test;
