const execa = require('execa');

const test = async () => {
  execa(`ava`, { stdio: 'inherit' });
};

exports.test = test;
