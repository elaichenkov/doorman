const path = require('path');
const { runTests } = require('vscode-test');

async function main() {
  try {
    const extensionDevelopmentPath = path.resolve(__dirname, '../../');
    const extensionTestsPath = path.resolve(__dirname, './set-up.js');

    // Specify a new user data directory
    const userDataDir = path.resolve(__dirname, '../../.test-vscode-user-data');

    await runTests({ extensionDevelopmentPath, extensionTestsPath, userDataDir, launchArgs: ['--disable-extensions'] });
  } catch (err) {
    console.error('Failed to run tests');
    process.exit(1);
  }
}

main();
