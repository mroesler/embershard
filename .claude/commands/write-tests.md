Write or update tests for the specified file or module.

## Instructions

1. Identify the source file(s) to be tested under `src/`.
2. Create or update the corresponding test file(s) under `tests/`, mirroring the same path.
   - Example: `src/combat/services/CombatService.ts` → `tests/combat/services/CombatService.test.ts`
3. Write **unit tests** covering every exported function, class method, and branch.
4. Write **integration tests** if the file coordinates multiple modules and the interaction carries risk.
5. Mock all Excalibur engine dependencies (`Actor`, `Engine`, `Scene`, etc.) — do not spin up a real game engine.
6. Run `npm test` and confirm all tests pass.
7. Run `npm run test:coverage` and check coverage output.
   - If 100% line and branch coverage is achieved: done.
   - If not: explain to the user which lines/branches are not covered and why, then add `// coverage: ignore` comments with a short reason at those locations.

## Coverage target
100% line coverage and 100% branch coverage on all `src/` files (excluding `src/main.ts`).

## Test file template

```ts
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('ModuleName', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('methodName', () => {
    it('should ...', () => {
      // arrange
      // act
      // assert
    });
  });
});
```
