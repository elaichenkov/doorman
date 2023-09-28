import * as vscode from 'vscode';

class TestCodeLensProvider implements vscode.CodeLensProvider {
  // @ts-expect-error - TODO: fix this ts error
  provideCodeLenses(document: vscode.TextDocument): vscode.CodeLens[] {
    const config = vscode.workspace.getConfiguration('doorman');
    const configurations = config.get('configurations') as Array<{ testIdPattern: string; url: string; title: string }>;

    const codeLenses: vscode.CodeLens[] = [];

    configurations.forEach((configuration) => {
      const { testIdPattern, url, title } = configuration;

      if (!url) {
        console.error('URL is not specified for a configuration in doorman. Please configure it in settings.');
        return;
      }

      const regex = new RegExp(testIdPattern);

      for (let i = 0; i < document.lineCount; i++) {
        const line = document.lineAt(i);
        const text = line.text.trim();

        const testIdMatch = text.match(regex);
        if (testIdMatch) {
          const range = new vscode.Range(i, 0, i, text.length);
          const command: vscode.Command = {
            title: title ?? '🔗 Open test',
            command: 'extension.openTest',
            arguments: [url, testIdMatch[1]],
          };
          codeLenses.push(new vscode.CodeLens(range, command));
        }
      }
    });

    return codeLenses;
  }
}

export function activate(context: vscode.ExtensionContext) {
  console.info('Doorman activated');
  const config = vscode.workspace.getConfiguration('doorman');
  const configurations = config.get('configurations');

  if (!Array.isArray(configurations)) {
    console.error('Invalid configuration for doorman. Please configure it in settings.');
    return;
  }

  // TODO: fix this ts error
  const codeLensProvider = new TestCodeLensProvider() as unknown as vscode.CodeLensProvider;
  const languages = ['javascript', 'typescript'];
  const fileScheme = { scheme: 'file', pattern: '**/*.feature' };

  for (const language of languages) {
    context.subscriptions.push(vscode.languages.registerCodeLensProvider({ language }, codeLensProvider));
  }

  context.subscriptions.push(vscode.languages.registerCodeLensProvider(fileScheme, codeLensProvider));

  context.subscriptions.push(
    vscode.commands.registerCommand('extension.openTest', (url: string, testId: string) => {
      if (!url) {
        vscode.window.showErrorMessage(
          'URL is not specified for a configuration in doorman. Please configure it in settings.',
        );
        return;
      }

      const urlToOpen = `${url}${testId}`;
      vscode.env.openExternal(vscode.Uri.parse(urlToOpen));
    }),
  );
}
