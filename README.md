# `nikoheikkila/rot-13-action`

<!-- action-docs-all source="action.yml" project="nikoheikkila/rot-13-action" version="v1" -->
## Description

A custom GitHub Action built with **Bun** and **TypeScript** transforming strings using the ROT-13 cipher.
This action demonstrates best practices for building GitHub Actions with modern JavaScript tooling,
clean architecture, property-based testing, and comprehensive mutation testing.


## Inputs

| name | description | required | default |
| --- | --- | --- | --- |
| `string` | <p>String to transform</p> | `true` | `""` |


## Outputs

| name | description |
| --- | --- |
| `result` | <p>Result of the transformation</p> |


## Runs

This action is a `node24` action.

## Usage

```yaml
- uses: nikoheikkila/rot-13-action@v1
  with:
    string:
    # String to transform
    #
    # Required: true
    # Default: ""
```
<!-- action-docs-all source="action.yml" project="nikoheikkila/rot-13-action" version="v1" -->

## Features

- 🚀 **Bun-powered toolchain**: Fast builds and testing with Bun runtime
- 📐 **Clean architecture**: Dependency injection pattern for testability
- ✅ **Comprehensive test coverage**: Unit tests with test doubles (no mocks)
- 🧪 **Property-based testing**: Using [fast-check](https://fast-check.dev) to verify ROT-13 properties
- 🦠 **Mutation testing**: [Stryker Mutator](https://stryker-mutator.io) ensures test quality and effectiveness
- 🛠️ **Task automation**: Managed with [Task](https://taskfile.dev)
- 🪝 **Pre-commit hooks**: Automatic testing and building via Husky
- 📦 **Single bundle distribution**: Optimized for GitHub Actions runtime

## What is ROT-13?

In case you didn't know, ROT-13 is a simple letter substitution cipher that rotates letters 13 positions in the alphabet:

- **A** → **N**, **B** → **O**, **M** → **Z**, **N** → **A**, **Z** → **M**
- **Lowercase letters** are transformed similarly: **a** → **n**, **z** → **m**
- **Non-alphabetic characters** (numbers, punctuation, spaces) remain unchanged
- **Idempotent**: Applying ROT-13 twice returns the original text

Example: `"Hello, World!"` → `"Uryyb, Jbeyq!"`

## Prerequisites

- [Bun](https://bun.sh/) v1.2 or later
- [Task](https://taskfile.dev/) v3.0 or later

## Architecture

The action follows a clean architecture pattern with clear separation of concerns:

- **`bin/index.ts`**: Invokes the action with production dependencies
- **`src/types.ts`**: Type definitions for `Core` and `GitHub` interfaces
- **`src/action.ts`**: Main action logic in `Rot13GitHubAction` class
- **`src/rot13/`**: ROT-13 cipher implementation
- **`tests/`**: Test doubles (`FakeCore`) and comprehensive test suites

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

This bundles `bin/index.ts` into `dist/index.js` with:
- Minification enabled
- ESM format targeting Node.js 20

### Pre-commit Hooks

Husky automatically runs tests and builds before each commit. This ensures `dist/` is always up to date with your source code.

## Build Process

1. **Source code** is written in TypeScript under `src/` with business logic and `bin/` for the entry point
2. **Bun** bundles `bin/index.ts` and outputs to `dist/index.js`
3. **Pre-commit hook** ensures tests pass and the bundle is up to date
4. **GitHub Actions** runs the `dist/index.js` bundle using Node.js 20 runtime

The bundled JavaScript file is committed to version control because GitHub Actions cannot run build steps when executing custom actions.

## Testing Strategy

This project employs multiple testing approaches to ensure code quality:

### Unit Testing

Tests use **Bun's built-in test runner** and follow these patterns:

- **Test doubles** (`FakeCore`) implement the same interfaces as `@actions/core` package.
- **Dependency injection** allows testing without real GitHub Actions context
- **Event tracking** in `FakeCore` captures all logged messages and outputs for verification

### Property-Based Testing

The ROT-13 implementation is verified using `fast-check` to test mathematical properties:

- **Idempotency**: The text transformed _twice_ equals the input
- **Length preservation**: Output length equals input length
- **Case preservation**: Uppercase letters remain uppercase, lowercase remain lowercase
- **Non-alphabetic preservation**: Numbers, punctuation, and special characters are unchanged

These properties are tested against thousands of randomly generated inputs to ensure correctness.

### Mutation Testing

**Stryker Mutator** performs mutation testing to verify test effectiveness:

- Introduces small changes (mutants) to the source code
- Ensures tests catch these mutants (kills them)
- High mutation score indicates strong test coverage and quality

Run mutation tests with:

```sh
task test:mutation
```

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
