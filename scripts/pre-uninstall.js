const { execSync } = require('child_process');
const isGlobal = process.env.npm_config_global === 'true';

function uninstallGlobalPackage(packageName) {
  try {
    execSync(`npm uninstall -g ${packageName}`, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Failed to uninstall ${packageName} globally:`, error.message);
  }
}

// Uninstall globally
if (isGlobal) {
  uninstallGlobalPackage('evdevkit');
  uninstallGlobalPackage('hpdevkit');
}