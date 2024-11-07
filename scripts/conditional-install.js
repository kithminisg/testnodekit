const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Read the package.json to get the versions of evdevkit and hpdevkit
const packageJson = require(path.join(process.cwd(), 'package.json'));
const evdevkitVersion = packageJson.configDependencies.evdevkit;
const hpdevkitVersion = packageJson.configDependencies.hpdevkit;

// Check if the current installation is global
const isGlobal = process.env.npm_config_global === 'true';

if (isGlobal) {
  try {
    console.log('Installing evdevkit and hpdevkit globally...');
    
    // Install evdevkit and hpdevkit globally
    execSync(`npm install -g evdevkit@${evdevkitVersion} hpdevkit@${hpdevkitVersion}`, { stdio: 'inherit' });
    
  } catch (error) {
    console.error('Failed to install evdevkit and hpdevkit globally:', error);
  }
} else {
  console.log('Skipping global installation of evdevkit and hpdevkit for local setup.');
}