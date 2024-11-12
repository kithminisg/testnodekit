#!/usr/bin/env node
const { execSync } = require('child_process');
const packageJson = require('./package.json');

// Main function to handle CLI input and commands
function main() {
    const args = process.argv.slice(2);

    const command = args[0];
    const commandArgs = args.slice(1);

    try {

        switch (command) {
            case 'evdevkit':
            case 'hpdevkit':
                runCommand(command, commandArgs);
                break;
            case 'help':
                showHelp();
                break;
            case 'version':
                showVersion();
                break;
            default:
                console.log(`Unknown command: ${command}\n`);
                showUsage();
                process.exit(1);
        }
    } catch (error) {
        handleCommandError(error);
    }
}

// Function to run evdevkit or hpdevkit with arguments
function runCommand(command, args) {
    const fullCommand = args.length > 0 ? `${command} ${args.join(' ')}` : `${command} --help`;
    execSync(fullCommand, { stdio: 'inherit' });
}

// Display usage instructions
function showUsage() {
    console.log("Usage: evernodecli <command> [options]");
    console.log("Commands: evdevkit, hpdevkit, help, version");
}

// Show help information
function showHelp() {
    console.log(`

Usage:
  evernodecli <command> [options]

Commands:
  evdevkit    Run evdevkit with specified arguments and options
  hpdevkit    Run hpdevkit with specified arguments and options
  help        Show this help message
  version     Show version information
`);
}

// Display version information
function showVersion() {
    console.log(`evernodecli version: ${packageJson.version}`);
}

// Handle errors during command execution
function handleCommandError(error) {
    console.error('Command failed:', process.argv.join(' '));
    console.error('Error message:', error.message);
    if (error.stderr) {
        console.error('Error output:', error.stderr.toString());
    }
    process.exit(1);
}

// Run the CLI
main();
