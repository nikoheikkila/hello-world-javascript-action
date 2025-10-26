# ROT-13 JavaScript Action

A custom GitHub Action built with **Bun** and **TypeScript** that greets a specified person and records the greeting time. This project demonstrates best practices for building GitHub Actions with modern JavaScript tooling, clean architecture, and comprehensive testing.

## Features

- 🚀 **Bun-powered toolchain**: Fast builds and testing with Bun runtime
- 📐 **Clean architecture**: Dependency injection pattern for testability
- ✅ **Comprehensive test coverage**: Unit tests with test doubles
- 🛠️ **Task automation**: Managed with [Task](https://taskfile.dev)
- 🪝 **Pre-commit hooks**: Automatic testing and building via Husky
- 📦 **Single bundle distribution**: Optimized for GitHub Actions runtime

## Prerequisites

- [Bun](https://bun.sh/) v1.2 or later
- [Task](https://taskfile.dev/) v3.0 or later

## Architecture

The action follows a clean architecture pattern with clear separation of concerns:

- **`src/types.ts`**: Type definitions for `Core` and `GitHub` interfaces
- **`src/action.ts`**: Main action logic in `HelloWorldGitHubAction` class
- **`src/main.ts`**: Entry point that handles error boundaries
- **`src/index.ts`**: Simple runner that invokes `main()`
- **`tests/`**: Test doubles (`FakeCore`, `FakeGitHub`) and unit tests

This design uses **dependency injection** to make the action fully testable without mocking the GitHub Actions toolkit.

## Development

### Installation

Install dependencies using Task:

```sh
task install
```

### Testing

Run tests once:

```sh
task test
```

Run tests in watch mode:

```sh
task test:watch
```

### Building

Build the action for distribution:

```sh
task build
```

This bundles `src/index.ts` into `dist/index.js` with:
- Minification enabled
- ESM format targeting Node.js 20

### Pre-commit Hooks

Husky automatically runs tests and builds before each commit. This ensures `dist/` is always up to date with your source code.

## GitHub Action Usage

### Inputs

#### `who-to-greet`

**Required**: The name of the person to greet.  
**Default**: `"World"`

### Outputs

#### `time`

The timestamp when the greeting was executed (format: `HH:MM:SS GMT+XXXX (Timezone Name)`).

### Example Workflow

Add this action to your GitHub workflow:

```yaml
name: Greet

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  greet:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Greet someone
        id: greeter
        uses: nikoheikkila/hello-world-javascript-action@main
        with:
          who-to-greet: 'Mona the Octocat'

      - name: Show greeting time
        run: echo "Greeted at ${{ steps.greeter.outputs.time }}"
```

### Action Metadata

The action is configured in `action.yml`:

```yaml
name: Hello World
description: Greet someone and record the time

inputs:
  who-to-greet:
    description: Who to greet
    required: true
    default: World

outputs:
  time:
    description: The time we greeted you

runs:
  using: node20
  main: dist/index.js
```

## Project Structure

```
.
├── .husky/               # Git hooks managed by Husky
│   └── pre-commit        # Runs tests and build before commit
├── dist/                 # Bundled action output
│   └── index.js          # Single-file bundle for GitHub Actions
├── src/                  # Source code
│   ├── action.ts         # Action implementation
│   ├── index.ts          # Entry point
│   ├── main.ts           # Main runner with error handling
│   └── types.ts          # TypeScript interfaces
├── tests/                # Test suite
│   ├── main.test.ts      # Unit tests
│   └── utils.ts          # Test doubles (FakeCore, FakeGitHub)
├── action.yml            # GitHub Action metadata
├── package.json          # Dependencies
├── Taskfile.yml          # Task automation configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # This file
```

## Build Process

1. **Source code** is written in TypeScript under `src/`
2. **Bun** bundles `src/index.ts` and outputs to `dist/index.js`
3. **Pre-commit hook** ensures tests pass and the bundle is up to date
4. **GitHub Actions** runs the `dist/index.js` bundle using Node.js 20 runtime

The bundled JavaScript file is committed to version control because GitHub Actions cannot run build steps when executing custom actions.

## Testing Strategy

Tests use **Bun's built-in test runner** and follow these patterns:

- **Test doubles** (`FakeCore`, `FakeGitHub`) implement the same interfaces as `@actions/core` and `@actions/github`
- **Dependency injection** allows testing without real GitHub Actions context
- **Event tracking** in `FakeCore` captures all logged messages and outputs for verification

## Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork the repository** and create a feature branch
2. **Write tests** for any new functionality
3. **Run tests and build** before committing (pre-commit hooks will do this automatically)
4. **Submit a pull request** with a clear description of changes

### Code Style

- Use TypeScript with strict mode enabled
- Follow existing patterns for dependency injection
- Prefer explicit types to implicit inference
- Write descriptive test names that explain behavior

## License

MIT

## Resources

- [Bun Documentation](https://bun.sh/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Task Documentation](https://taskfile.dev)
- [Creating a JavaScript Action](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action)
