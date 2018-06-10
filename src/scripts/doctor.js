const execa = require("execa");
const ora = require("ora");
const path = require("path");
const inquirer = require("inquirer");

const issues = {
  MAIN: {
    detect: (pkg, issues) => {
      if (!pkg.main || pkg.main !== "dist/cjs") {
        return [...issues, "MAIN"];
      }
      return issues;
    },
    report: pkg => `"pkg.main": expected "dist/cjs", got: "${pkg.main}"`
  },
  MODULE: {
    detect: (pkg, issues) => {
      if (!pkg.module || pkg.module !== "dist/module") {
        return [...issues, "MODULE"];
      }
      return issues;
    },
    report: pkg => `"pkg.module": expected "dist/esm", got: "${pkg.module}"`
  },
  DIST: {
    detect: (pkg, issues) => {
      if (!pkg.dist) {
        return [...issues, "DIST"];
      }
      if (!( Array.isArray(pkg.dist) && pkg.dist.length === 1 && pkg.dist[0] === "dist" )) {
        return [...issues, "DIST"];
      }
      return issues;
    },
    report: pkg => `"pkg.files": expected '["dist"]', got: "${pkg.dist}"`
  }
};

const doctor = async () => {
  const spinner = ora("zen doctor").start();

  const pkgPath = path.join(process.cwd(), `package.json`);
  const pkg = require(pkgPath);


  const issuesDetections = Object.keys(issues).reduce((state, item) => {
    return issues[item].detect(pkg, state)
  }, [])


  // console.log(issuesDetections);
  issuesDetections.map(x => issues[x].report(pkg)).forEach(x => spinner.warn(x));

  if (issues.length > 0) {
    await spinner.fail(`zen doctor failed in ${process.uptime().toFixed(2)}s`);
  } else {
    await spinner.succeed(
      `zen doctor finished in ${process.uptime().toFixed(2)}s`
    );
  }
  const isToFixQ = {
    type: `confirm`,
    name: `isToFix`,
    message: `Do you want to fix these issues?`
  };
  const { isToFix } = await inquirer.prompt(isToFixQ);
  console.log({ isToFix })
  return;
};

exports.doctor = doctor;
