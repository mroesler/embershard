# Embershard — Claude Rules

## Testing

### Coverage target
- All code in `src/` must have unit tests in `tests/`, mirroring the same folder structure.
  - Example: `src/combat/services/CombatService.ts` → `tests/combat/services/CombatService.test.ts`
- Target **100% line and branch coverage** on all files.
- If 100% coverage is not achievable for a specific file or branch (e.g. Excalibur engine internals, platform-specific code, unreachable defensive branches), explicitly tell the user why and document it with a `// coverage: ignore` comment at the relevant line.

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
