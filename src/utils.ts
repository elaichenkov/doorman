import * as path from 'path';
import * as vscode from 'vscode';

// Returns the Uri of a sample file that is in the same folder as the extension
export function getDocUri(fileName: string): vscode.Uri {
  const testWorkspace = path.resolve(__dirname, '../../testWorkspace');
  const fileUri = vscode.Uri.file(path.join(testWorkspace, fileName));
  return fileUri;
}

// Activates the extension
export async function activate(docUri: vscode.Uri) {
  const extensionId = 'doorman'; // replace with your extension id
  const extension = vscode.extensions.getExtension(extensionId)!;

  await extension.activate();

  try {
    await vscode.window.showTextDocument(docUri, { preview: false, viewColumn: vscode.ViewColumn.One });
    await sleep(2000); // Wait for server activation
  } catch (e) {
    console.error(e);
  }
}

// Sleep function to wait for server activation
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
