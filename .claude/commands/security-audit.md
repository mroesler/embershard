Run a security audit on recently changed or all source files.

## Instructions

Perform a thorough security review of the codebase under `src/`. Check every item below and report findings grouped by severity (Critical / High / Medium / Low / Info).

### 1. Dependency vulnerabilities
- Run `npm audit` and report any vulnerabilities found.
- Flag any dependency that has not been updated in over 6 months if a newer version exists.

### 2. Dangerous API usage
Scan all `.ts` files for:
- `eval()` or `new Function()`
- `innerHTML`, `outerHTML`, `insertAdjacentHTML`
- `document.write()` or `document.writeln()`
- `setTimeout`/`setInterval` called with a string argument
- Untyped dynamic property access (e.g. `obj[userInput]`)

### 3. Secrets and credentials
- Scan for hardcoded API keys, tokens, passwords, or secrets in `src/`.
- Check for any `.env` values accidentally inlined into source files.

### 4. Input validation
- Identify all points where external data enters the system (keyboard/gamepad input, loaded map files, save data, URL parameters).
- Verify each entry point validates and sanitizes input before use.

### 5. Type safety
- Flag all uses of `any` — each one must have a justification comment or be considered a finding.
- Flag `@ts-ignore` and `@ts-expect-error` — each needs justification.
- Check for prototype pollution patterns (e.g. merging untrusted objects without schema validation).

### 6. Excalibur-specific concerns
- Verify no user-controlled strings are passed to Excalibur APIs that accept HTML or dynamic script execution.
- Check that asset paths (sprites, maps, audio) are not constructed from unvalidated user input.

## Output format

Produce a report with:
- **Summary:** one-line verdict (PASS / FINDINGS)
- **Findings table:** severity, location (file:line), description, recommendation
- **npm audit output** (if any vulnerabilities)
- **Passed checks** — list everything that was reviewed and found clean

If all checks pass, state clearly: "No security findings. Audit passed."
