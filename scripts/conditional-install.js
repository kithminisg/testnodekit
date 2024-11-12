const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Read the package.json to get the versions of evdevkit and hpdevkit
const packageJson = require(path.join(process.cwd(), 'package.json'));
const globalPackages = packageJson.configDependencies.global;
const localPackages = packageJson.configDependencies.local;

// Check if the current installation is global
const isGlobal = process.env.npm_config_global === 'true';

function installPackages(packages, isGlobal = false) {
  for (const [pkg, version] of Object.entries(packages)) {
    // console.error(pkg, version)
    process.stdout.write(`${pkg} ${version}`);

    const installCmd = `npm install ${isGlobal ? '-g' : ''} ${pkg}@${version}`;
    execSync(installCmd, { stdio: 'inherit' });
  }
}

function main() {
  try {
    (isGlobal) ? installPackages(globalPackages, true) : installPackages(localPackages, false);

  }
  catch (error) {
    console.error('Failed to install evdevkit and hpdevkit globally:', error);
  }
}

main();