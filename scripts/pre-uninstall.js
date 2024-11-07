const { execSync } = require('child_process');

function uninstallGlobalPackage(packageName) {
  try {
    console.log(`Uninstalling ${packageName} globally...`);
    execSync(`npm uninstall -g ${packageName}`, { stdio: 'inherit' });
    console.log(`${packageName} uninstalled globally.`);
  } catch (error) {
    console.error(`Failed to uninstall ${packageName} globally:`, error.message);
  }
}

// Uninstall globally
uninstallGlobalPackage('evdevkit');
uninstallGlobalPackage('hpdevkit');