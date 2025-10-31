# Contributing Guidelines

Thank you for considering to contribute! This document outlines the development process.

## Prerequisites

- [Bun](https://bun.sh/) v1.2+
- [Task](https://taskfile.dev/) v3.0+
- [actionlint](https://github.com/rhysd/actionlint)

## Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/nikoheikkila/rot-13-action.git
   cd rot-13-action
   ```

2. **Install dependencies**
   ```bash
   task install
   ```

3. **Run tests**
   ```bash
   task test
   ```

## Development Workflow (TDD)

1. **Write a failing test** in `tests/` and see it fail
   ```bash
   task test:watch
   ```

2. **Implement the feature** in `src/` or `bin/`

3. **Refactor** while keeping the tests green

4. **Run full test suite**
   ```bash
   task test
   ```

5. **Commit changes** (pre-commit hook will lint and build)
   ```bash
   git commit -m "feat: add new feature"
   ```

## Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `test:` Test changes
- `refactor:` Code refactoring
- `chore:` Tooling/infrastructure changes

## Pull Request Process

1. Update README.md with details of changes if applicable.
2. Run `task build` to update `dist/` bundle.
3. Ensure all GitHub Actions checks pass.

## Questions?

Open an issue or reach out to [@nikoheikkila](https://github.com/nikoheikkila).
