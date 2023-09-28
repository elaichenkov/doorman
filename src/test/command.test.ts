import * as vscode from 'vscode';
import * as assert from 'assert';
import { activate, getDocUri } from '../utils';

suite('Test Command Execution', () => {
  test('Should execute command and open URL', async () => {
    await activate(getDocUri('cucumber.feature'));

    const url = 'http://example.com/';
    const testId = 'T123';

    let openedUri: vscode.Uri | undefined;
    const originalOpenExternal = vscode.env.openExternal;
    // @ts-ignore
    vscode.env.openExternal = (uri: vscode.Uri) => {
      openedUri = uri;
      return Promise.resolve();
    };

    await vscode.commands.executeCommand('extension.openTest', url, testId);

    assert.ok(openedUri, 'Should open a URL');
    assert.strictEqual(openedUri.toString(), `${url}${testId}`, 'Should open correct URL');

    vscode.env.openExternal = originalOpenExternal;
  });
});
