# Doorman

Doorman is a simple, lightweight VSCode extension that allows you to link and open test cases from you favorite test management tool directly in VSCode.

## Features

- Link test cases from your test management tool directly in VSCode
- Open test cases in your default browser
- Supports multiple test management tools
- Supports multiple test case formats

## Extension Settings

This extension contributes the following settings:

- `doorman.configurations`: List of configurations for your test management tools and test case formats
- `doorman.configurations[].title`: Title of the configuration
- `doorman.configurations[].url`: URL of the test management tool
- `doorman.configurations[].testIdPattern`: Regular expression to match test case ID in the test case format

For example:

```json
// .vscode/settings.json
{
  "doorman.configurations": [
    {
      "title": "🔗 Open test case in TestRail",
      "url": "https://testrail.example.com/index.php?/cases/view/T",
      "testIdPatter": "\\[T(\\d+)\\]"
    }
  ]
}
```

## Author

Yevhen Laichenkov <elaichenkov@gmail.com>