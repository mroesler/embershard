# Embershard — Claude Rules

## Tech Stack

### Runtime & Language
| Tool | Version | Purpose |
|---|---|---|
| Node.js | `>=24.0.0` (pinned: 24.14.0 via `.nvmrc`) | Runtime |
| TypeScript | `6.0.2` | Language — strict mode, `noEmit`, targets ES2020 |

### Game Engine
| Tool | Version | Purpose |
|---|---|---|
| Excalibur.js | `0.32.0` | 2D game engine (canvas-based, browser-first) |
| @excaliburjs/plugin-tiled | `0.32.0` | Tiled map format loader for Excalibur |

### Build & Dev
| Tool | Version | Purpose |
|---|---|---|
| Vite | `8.0.2` | Dev server (port 9999) and production bundler |
| rollup-plugin-visualizer | `7.0.1` | Bundle size analysis (`npm run analyze`) |

### Testing
| Tool | Version | Purpose |
|---|---|---|
| Vitest | `4.1.1` | Test runner (mirrors Jest API) |
| @vitest/coverage-v8 | `4.1.1` | V8-native coverage — 100% thresholds enforced |
| happy-dom | `20.8.8` | Browser-like DOM environment (no real canvas needed) |

### Linting & Formatting
| Tool | Version | Purpose |
|---|---|---|
| ESLint | `10.1.0` | Linting (flat config format) |
| @typescript-eslint/parser | `8.57.2` | TypeScript AST parser for ESLint |
| @typescript-eslint/eslint-plugin | `8.57.2` | TypeScript-aware lint rules |
| eslint-config-prettier | `10.1.8` | Disables ESLint rules that conflict with Prettier |
| Prettier | `3.8.1` | Code formatting |

### Git Hygiene
| Tool | Version | Purpose |
|---|---|---|
| Husky | `9.1.7` | Git hooks runner |
| lint-staged | `16.4.0` | Run linters on staged files only (pre-commit) |
| @commitlint/cli | `20.5.0` | Enforce conventional commits (commit-msg hook) |
| @commitlint/config-conventional | `20.5.0` | Conventional commits ruleset |

### CI/CD
| Tool | Notes |
|---|---|
| GitHub Actions | CI on push/PR to main; release workflow on `v*.*.*` tags |
| Dependabot | Weekly npm dependency updates (max 5 open PRs) |

### Path Alias
`@/` → `src/` — configured in both `tsconfig.json` (type checking) and `vite.config.ts` (bundler resolution).

### Compatibility Notes
- `@typescript-eslint` 8.x declares `typescript <6.0.0` as a peer requirement but works correctly with TypeScript 6.0 in practice. Upgrade `@typescript-eslint` to 9.x when it releases with official TS 6.0 support.

---

## Code Structure

### Naming

- Use full, descriptive names for all variables, functions, methods, classes, and types. No abbreviations.
- A name must clearly communicate what the thing is or does without requiring context to decode it.
  - Good: `playerHealth`, `loadOverworldMap`, `calculateDamage`, `TileConfig`
  - Bad: `plrHp`, `ldMap`, `calcDmg`, `TileCfg`
- Exception: loop counters `i` and `j` are allowed.

---

### One file, one concern
- Every file has a single, clearly named responsibility. If a file is doing two things, split it.
- File names must reflect their exact purpose: `CombatService.ts`, `EnemyActor.ts`, `InputMap.ts` — not `utils.ts`, `helpers.ts`, `misc.ts`, or `index.ts` (except as a barrel export).
- No dumping grounds. If logic doesn't have a clear home, create the right folder/file for it rather than appending it to an existing file.

### Modular architecture
- Each feature lives in its own module under `src/`. Modules do not reach into each other's internals — they communicate through `api/` contracts or `events/`.
- Dependencies between modules flow in one direction: high-level modules depend on low-level ones, never the reverse.
- A module's `api/` folder defines what it exposes. Anything not in `api/` is private to the module.

### Folder placement
Use the correct subfolder for every new file:

| Folder | What belongs here |
|---|---|
| `enums/` | TypeScript enums — named constant sets, no executable logic |
| `interfaces/` | TypeScript interfaces and type aliases — contracts only, no executable code |
| `models/` | Concrete data classes — the domain objects |
| `services/` | Business logic, stateful operations, orchestration |
| `ui/` | Excalibur Actors, ScreenElements, anything that touches the renderer |
| `events/` | Event bus definitions — executable event infrastructure (e.g. EventEmitter instances) |
| `constants/` | Module-specific constants and configuration values |
| `src/utils/` | Shared pure utility functions reused across multiple modules |

Only create a subfolder when there is something real to put in it. Do not pre-create empty directories.

---

## Shell Commands

- The working directory is always the project root. Never prefix shell commands with `cd <project-dir> &&`.
- Run `git`, `npm`, and all other CLI tools directly — e.g. `git status`, `npm test`, not `cd E:/... && git status`.

---

## Git & Branching

### Branch strategy
- No Git Flow. No `develop` branch.
- **Feature work** (new functionality, bug fixes, refactors) → create a branch, open a PR, merge when CI passes.
- **Config/chore commits** (`chore(*)`, `ci(*)`) → push directly to `main`. No PR needed.

### Branch naming
- `feat/<short-description>` — new features
- `fix/<short-description>` — bug fixes
- `refactor/<short-description>` — refactoring

### Commit messages
- Follow **Conventional Commits**: `type(scope): description`
- Valid types: `feat`, `fix`, `refactor`, `test`, `chore`, `ci`, `docs`
- Enforced by commitlint on every commit via Husky

### Main branch rules — NEVER violate
- **Never force-push to `main`.**
- **Never delete `main`.**
- **Never push broken code to `main`** — CI must pass.
- Feature/fix branches must have CI passing before merging.

### Config changes — commit and push immediately
- Any change to a config-only file (`.claude/settings.json`, `.github/workflows/`, `eslint.config.js`, `vitest.config.ts`, `tsconfig.json`, `.husky/`, etc.) must be committed and pushed in the same operation — do not leave config changes uncommitted.
- Use `chore(config):` or `chore(ci):` as appropriate.

### Releases — manual only
- Releases are created only when explicitly requested ("create new release" or similar).
- Claude reads commits since the last tag, proposes a version bump (patch/minor/major), waits for confirmation, then: bumps `package.json`, commits `chore(release): vX.Y.Z`, tags, and pushes.
- The release workflow triggers automatically on tag push — runs CI, builds, creates a GitHub Release with the dist zip attached.
- `chore`/`ci`/`test`/`docs`-only commits do not warrant a release.

---

## Security

### Write secure code — always
- Never use `eval()`, `new Function()`, `innerHTML`, or `document.write()`.
- Never hardcode secrets, tokens, or credentials anywhere in `src/`.
- Validate and sanitize all external input at the boundary (user input, loaded map data, save files).
- Avoid prototype pollution patterns. Prefer typed interfaces over freeform `object` or `any`.
- Keep `any` usage to an absolute minimum — treat it as a code smell that requires justification.

### Post-feature security audit — REQUIRED
After completing any feature (whether built manually or via `/gsd`), Claude must invoke the `/security-audit` skill before considering the feature done. Do not wait to be asked.

---

## Testing

### Coverage target
- All code in `src/` must have unit tests in `tests/`, mirroring the same folder structure.
  - Example: `src/combat/services/CombatService.ts` → `tests/combat/services/CombatService.test.ts`
- Target **100% line and branch coverage** on all files.
- If 100% coverage is not achievable for a specific file or branch (e.g. Excalibur engine internals, platform-specific code, unreachable defensive branches), explicitly tell the user why and document it with a `// coverage: ignore` comment at the relevant line.

### Auto-invocation — REQUIRED
At the end of every completed task or workstep that touched any file under `src/`, Claude must ensure the corresponding `tests/` files are created or updated before considering the task done. Do not wait to be asked. This does not need to happen after every individual file edit mid-task — only once the task as a whole is complete.

### When to write tests
- Every new file in `src/` gets a corresponding test file in `tests/`.
- When code is changed, updated, or deleted — update, fix, or remove the corresponding tests.
- Write integration tests when multiple modules interact and the interaction itself carries risk (e.g. map loading + actor spawning, combat resolution + inventory state).

### Test commands
| Command | Purpose |
|---|---|
| `npm test` | Run all tests once |
| `npm run test:watch` | Run tests in watch mode during development |
| `npm run test:coverage` | Run tests with full coverage report (output to `coverage/`) |

### Framework
- **Vitest** — configured in `vitest.config.ts`
- Test environment: `happy-dom` (browser-like, no real canvas)
- Excalibur Actor/Engine dependencies should be mocked in unit tests; do not spin up a real game engine in tests
- Coverage provider: V8 (`@vitest/coverage-v8`)
