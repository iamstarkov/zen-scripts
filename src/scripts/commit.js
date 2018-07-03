const execa = require('execa');
const ora = require('ora');
const path = require('path');
const bootstrap = require('commitizen/dist/cli/git-cz').bootstrap;

const commit = () => {
  bootstrap({
    cliPath: path.join(process.cwd(), 'node_modules', 'commitizen'),
    config: { path: 'cz-conventional-changelog' } 
  });
};

exports.commit = commit;
