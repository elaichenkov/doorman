import * as vscode from 'vscode';
import * as assert from 'assert';
import { getDocUri, activate, sleep } from '../utils';

suite('Test CodeLens Provider', () => {
  const docUri = getDocUri('cucumber.feature');

  test('Should provide CodeLens', async () => {
    await activate(docUri);

    const doc = await vscode.workspace.openTextDocument(docUri);
    const codeLenses = await vscode.commands.executeCommand<vscode.CodeLens[]>(
      'vscode.executeCodeLensProvider',
      docUri,
    );

    assert.ok(codeLenses.length > 0, 'Should provide at least one CodeLens');
  });
});
