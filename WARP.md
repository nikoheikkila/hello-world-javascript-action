# Rules for Warp Code

**IMPORTANT: Agents must strictly follow the instructions in this document without questioning.**

## GitHub Actions Development (Project-Specific)

This project is a custom GitHub Action. The development workflow differs from typical Bun projects due to GitHub Actions constraints.

### Task Automation

Use Task for all common operations:

```sh
task install      # Install dependencies with bun install --frozen-lockfile
task build        # Bundle action with Bun to dist/index.js
task test         # Run tests with bun test
task test:watch   # Run tests in watch mode
```

### Build Process

The `task build` command uses `Bun.build()` to create a single JavaScript bundle:

```ts
Bun.build({
  entrypoints: ['src/index.ts'],
  outdir: 'dist',
  target: 'node',
  format: 'esm',
  sourcemap: 'inline',
  minify: true,
});
```

**Key points:**
- Entry point: `src/index.ts`
- Output: `dist/index.js` (committed to Git)
- Target: Node.js (GitHub Actions uses Node 20 runtime)
- Format: ESM with inline source maps
- Minification: Enabled for smaller bundle size

### Testing with Test Doubles

Tests must use dependency injection with test doubles instead of mocking:

```ts
import { test, expect } from 'bun:test';
import { FakeCore, FakeGitHub } from './tests/utils.ts';
import { HelloWorldGitHubAction } from './src/action.ts';

test('action behavior', () => {
  const core = new FakeCore();
  const github = new FakeGitHub();
  const action = new HelloWorldGitHubAction(core, github);
  
  core.setInput('who-to-greet', 'World');
  action.run();
  
  expect(core.events.info).toContain('Hello to you, World!');
});
```

**Test doubles** (`FakeCore`, `FakeGitHub`) in `tests/utils.ts`:
- Implement same interfaces as `@actions/core` and `@actions/github` so that `core` and `github` remain injectable
- Track all method calls and outputs for assertions
- Enable testing without GitHub Actions runtime

### Dependency Injection Pattern

The action uses interfaces to decouple from GitHub Actions toolkit:

```ts
// src/types.ts - Define contracts
interface Core {
  getInput(name: string): string;
  info(message: string): void;
  setOutput(name: string, value: unknown): void;
}

interface GitHub {
  context: Context;
}

// src/action.ts - Depend on interfaces, never on implementations
class HelloWorldGitHubAction {
  public constructor(private core: Core, private github: GitHub) {}
  
  public run(): void {
    const name = this.core.getInput('who-to-greet');
    this.core.info(`Hello to you, ${name}!`);
    // ...
  }
}

// src/main.ts - Wire up real dependencies for production
import * as core from '@actions/core';
import * as github from '@actions/github';
const action = new HelloWorldGitHubAction(core, github);
```

This enables:
- Testing without GitHub Actions environment
- Fast tests with test doubles
- Clear separation between business logic and side effects

### Pre-commit Workflow

Husky automatically runs before each commit:

```sh
task -p test build  # Run tests and build in parallel
git add dist        # Stage the updated bundle
```

**Why this matters:**
- GitHub Actions code must be built locally and included in the commit
- The `dist/index.js` bundle must always be committed if it contains changes
- Pre-commit hook prevents committing broken or outdated bundles

### Action Configuration (action.yml)

The `action.yml` file defines the action's interface:

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
  using: node20       # GitHub Actions Node.js 20 runtime
  main: dist/index.js # Entry point (bundled output)
```

**Important constraints:**
- `runs.using`: Must be `node20`
- `runs.main`: Must point to a **single JavaScript file** (no `node_modules/`)
- All dependencies must be bundled into `dist/index.js`

### GitHub Actions Constraints

When developing GitHub Actions:

1. **Single bundle requirement**: Actions must be a single JS file. Use `task build` to bundle everything.
2. **Node.js runtime in CI**: Actions run on Node.js 20, not Bun. Build output must be Node-compatible.
3. **Use `@actions` packages**: Don't use custom HTTP clients for GitHub API. Use `@actions/core` and `@actions/github`.
4. **Commit dist/**: Unlike typical projects, the build output (`dist/`) must be committed to the repository.
5. **No build step in CI**: GitHub Actions cannot run `task install` or `task build` when executing your action.

### Development Workflow

The typical development cycle follows the TDD cycle:

1. **Write a new unit test** in `tests/` using test doubles
2. Run the tests with `task test`, and **ensure the new test fails**
3. **Make changes** to source code in `src/` until the test passes
4. Refactor the solution while **keeping the test passing**
5. **Build the bundle** with `task build`

### Local Testing

Test the action logic without GitHub:

```sh
task test              # Run all tests
task test --watch      # Watch mode for TDD
task test -- main.test.ts # Run a specific test file
```

Test the bundled action (simulating GitHub Actions):

```sh
bun dist/index.js
```

### Debugging

If the action fails in CI:

1. Check that `dist/index.js` is up to date with `src/`
2. Run `task build` and commit if needed
3. Verify the bundle works locally: `bun dist/index.js`
4. Check GitHub Actions logs for runtime errors
