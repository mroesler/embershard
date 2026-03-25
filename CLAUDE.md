# Embershard — Claude Rules

## Code Structure

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
| `api/` | Interfaces, types, enums — contracts only, no executable code |
| `models/` | Concrete data classes — the domain objects |
| `services/` | Business logic, stateful operations, orchestration |
| `ui/` | Excalibur Actors, ScreenElements, anything that touches the renderer |
| `events/` | Event type definitions for cross-module communication |
| `constants/` | Module-specific constants and configuration values |
| `src/utils/` | Shared pure utility functions reused across multiple modules |

Only create a subfolder when there is something real to put in it.

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
