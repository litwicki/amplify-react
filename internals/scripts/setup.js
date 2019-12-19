#!/usr/bin/env node

// Repurposed shamelessly from `react-boilerplate` setup script
//   https://github.com/react-boilerplate/react-boilerplate/blob/master/internals/scripts/setup.js

const shell = require('shelljs');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const readline = require('readline');
const compareVersions = require('compare-versions');
const chalk = require('chalk');

const animateProgress = require('./helpers/progress');
const addCheckMark = require('./helpers/checkmark');
const addXMark = require('./helpers/xmark');
const npmConfig = require('./helpers/get-npm-config');

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdout.write('\n');

/**
 * Check Node.js version
 * @param {!number} minimalNodeVersion
 * @returns {Promise<any>}
 */
function checkNodeVersion(minimalNodeVersion) {
  return new Promise((resolve, reject) => {
    exec('node --version', (err, stdout) => {
      const nodeVersion = stdout.trim();
      if (err) {
        reject(new Error(err));
      } else if (compareVersions(nodeVersion, minimalNodeVersion) === -1) {
        reject(
          new Error(
            `You need Node.js v${minimalNodeVersion} or above but you have v${nodeVersion}`,
          ),
        );
      }

      resolve('Node version OK');
    });
  });
}

/**
 * Check NPM version
 * @param {!number} minimalNpmVersion
 * @returns {Promise<any>}
 */
function checkNpmVersion(minimalNpmVersion) {
  return new Promise((resolve, reject) => {
    exec('npm --version', (err, stdout) => {
      const npmVersion = stdout.trim();
      if (err) {
        reject(new Error(err));
      } else if (compareVersions(npmVersion, minimalNpmVersion) === -1) {
        reject(
          new Error(
            `You need NPM v${minimalNpmVersion} or above but you have v${npmVersion}`,
          ),
        );
      }

      resolve('NPM version OK');
    });
  });
}

/**
 * Install all packages
 * @returns {Promise<any>}
 */
function installPackages() {
  return new Promise((resolve, reject) => {

    process.stdout.write(
      '\nInstalling AWS Amplify CLI...',
    );

    exec('npm install -g @aws-amplify/cli');

    process.stdout.write(
      '\nInstalling dependencies... (This might take a while)',
    );

    setTimeout(() => {
      readline.cursorTo(process.stdout, 0);
      interval = animateProgress('Installing dependencies');
    }, 500);

    exec('npm install', err => {
      if (err) {
        reject(new Error(err));
      }

      clearInterval(interval);
      addCheckMark();
      resolve('Packages installed');
    });
  });
}

// destination.txt will be created or overwritten by default.
function copyConfigFile() {
  fs.copyFile('app/constants.js.dist', 'app/constants.js', (err) => {
    if (err) throw err;
    console.log('Please review `app/constants.js` and change values as needed.');
  });
}

/**
 * End the setup process
 */
function endProcess() {
  clearInterval(interval);
  process.stdout.write(chalk.blue('\n\nSetup complete!!\n\n'));
  process.exit(0);
}

/**
 * Report the the given error and exits the setup
 * @param {string} error
 */
function reportError(error) {
  clearInterval(interval);

  if (error) {
    process.stdout.write('\n\n');
    addXMark(() => process.stderr.write(chalk.red(` ${error}\n`)));
    process.exit(1);
  }
}

/**
 * Run
 */
(async () => {

  // Take the required Node and NPM version from package.json
  const {
    engines: { node, npm },
  } = npmConfig;

  const requiredNodeVersion = node.match(/([0-9.]+)/g)[0];

  process.stdout.write("Checking NODE version");
  await checkNodeVersion(requiredNodeVersion).catch(reason =>
    reportError(reason),
  );
  addCheckMark();

  const requiredNpmVersion = npm.match(/([0-9.]+)/g)[0];

  process.stdout.write("\nChecking NPM version");
  await checkNpmVersion(requiredNpmVersion).catch(reason =>
    reportError(reason),
  );
  addCheckMark();

  await installPackages().catch(reason => reportError(reason));

  try {
    process.stdout.write("\nSetting up app constants");
    copyConfigFile();
  } catch (err) {
    reportError(err);
  }

  addCheckMark();
  clearInterval(interval);

  endProcess();
})();
