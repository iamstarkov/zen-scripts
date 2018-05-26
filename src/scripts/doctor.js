const execa = require("execa");
const ora = require("ora");
const path = require("path");

const errorMessages = {
  MAIN: (pkg) => `invalid "main" field: expected "dist/cjs", got: "${pkg.main}"`,
  MODULE: (pkg) => `invalid "module" field: expected "dist/esm", got: "${pkg.module}"`,
}

const validateEntrypoints = (spinner, pkg) => {
  const issues = [];
  if (!pkg.main || pkg.main !== 'dist/cjs') {
    issues.push('MAIN')
  }
  if (!pkg.module || pkg.module !== 'dist/module') {
    issues.push('MODULE')
  }
  return issues;
};

const doctor = async () => {
  const spinner = ora("zen doctor").start();

  const pkgPath = path.join(process.cwd(), `package.json`)
  const pkg = require(pkgPath);

  const issues = validateEntrypoints(spinner, pkg);
  issues.map(x => errorMessages[x](pkg)).forEach(x => spinner.warn(x))

  if (issues.length > 0) {
    await spinner.fail(`zen doctor failed in ${process.uptime().toFixed(2)}s`);
  } else {
    await spinner.succeed(`zen doctor finished in ${process.uptime().toFixed(2)}s`);
  }
  return;
};

exports.doctor = doctor;
