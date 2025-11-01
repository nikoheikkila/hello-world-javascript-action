# Rules for Warp Code

**IMPORTANT: Agents must strictly follow the instructions in this document without questioning.**

## GitHub Actions Development (Project-Specific)

This project is a custom GitHub Action.
The development workflow differs from typical Bun and Node.js projects due to GitHub Actions constraints.

### Task Automation

Use `task <name>` for all common operations.

Available tasks for this project:

* `task build`               Build GitHub Action
* `task clean`               Cleans and rebuilds artifacts
* `task default`             Same as `task install`
* `task docs`                Update documentation
* `task format`              Format code with Biome
* `task install`             Install dependencies
* `task lint`                Lint the codebase
* `task pull`                Pull latest changes from VCS
* `task test`                Run the whole test suite
* `task test:build`          Run post-build test
* `task test:mutation`       Run mutation tests with StrykerJS
* `task test:unit`           Run unit tests
* `task test:watch`          Run tests in watch mode

If unsure, run `task -a` to list all the tasks.

### Build Process

The `task build` command uses Bun to create a single JavaScript bundle:

**Key points:**
- Entry point: `bin/index.ts`
- Output: `dist/index.js` (always committed to Git)
- Target: Node.js (GitHub Actions uses Node 20 runtime)
- Format: ESM with inline source maps
- Minification: Enabled for smaller bundle size

### Dependency Injection Pattern

The action uses interfaces to decouple from GitHub Actions toolkit.

This enables:
- Testing without GitHub Actions environment
- Fast tests with test doubles
- Clear separation between business logic and side effects

### Pre-commit Workflow

Husky automatically runs before each commit:

```sh
task -p lint build
git add dist README.md
```

**Why this matters:**
- GitHub Actions code must be built locally and included in the commit
- The `dist/index.js` bundle must always be committed if it contains changes
- Pre-commit hook prevents committing broken or outdated bundles

### Pre-push Workflow

Husky automatically runs before each push:

```sh
task test
```

**Why this matters:**
- Pre-push hook prevents pushing broken code

### Action Configuration (action.yml)

The `action.yml` file defines the action's interface:

**Important constraints:**
- `runs.using`: Must be `node24`
- `runs.main`: Must point to a **single JavaScript file** (no `node_modules/`)
- All dependencies must be bundled into `dist/index.js`

### GitHub Actions Constraints

When developing GitHub Actions:

1. **Single bundle requirement**: Actions must be a single JS file. Use `task build` to bundle everything.
2. **Node.js runtime in CI**: Actions run on Node.js 24, not Bun. Build output must be Node-compatible.
3. **Use `@actions` packages**: Don't use custom HTTP clients for GitHub API. Use `@actions/core` and `@actions/github`.
4. **Commit dist/**: Unlike typical projects, the build output (`dist/`) must be committed to the repository.
5. **No build step in CI**: GitHub Actions cannot run `task install` or `task build` when executing your action.

### Development Workflow

The typical development cycle follows the TDD cycle:

1. **Write a new unit test** in `tests/` using test doubles
2. Run the unit tests with `task test:unit`, and **ensure the new test fails**
3. **Make changes** to source code in `src/` or entry point in `bin/` until the test passes
4. Refactor the solution while **keeping the test passing**
5. **Run** the entire test suite with `task test`

### Local Testing

Test the action logic without GitHub:

```sh
task test
```

Test the bundled action (simulating GitHub Actions):

```sh
task test:build
```

### Debugging

If the action fails in CI:

1. Check that `dist/index.js` is up to date with `bin/` and `src/`
2. Run `task build` and commit if needed
3. Verify the bundle works locally: `bun dist/index.js`
4. Find the ID of the latest failing run with `gh run list`
5. Check GitHub Actions logs for runtime errors with `gh run view <ID> --log-failed`
