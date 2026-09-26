---
name: gate-framework-patterns
description: Quality gate for this repository asking "is this change still part of this framework?". Enforces fixtures imports, page-object locators, spec filenames, project decisions, env readers, aliases, and schema validation conventions. Use when reviewing any diff under src/ before a pull request. Full detail: .claude/skills/gate-framework-patterns/SKILL.md
---

# Gate 4: framework-patterns

> Is this still part of this framework?

- Specs import `@fixtures/test-base` (or `@fixtures/booker.fixture`), **never `@playwright/test`**.
- No locators in specs. They belong in `src/pages/*.ts` as `private readonly` fields.
- Page objects extend `BasePage` with `super(page, 'ClassName')` and act through `this.el.*`.
- **Spec filenames need a dot: `*.spec.ts`.** An underscore before `spec` is silently never collected.
- **A new test directory needs its project decided when it is created.** `chromium` (`src/tests`, ignoring `apisTests` and `aiTest`), `api` (`src/tests/apisTests`), `ai` (`src/tests/aiTest`).
- Env through `@config/env`. Credentials from `@config/credentials`. Never commit a key.
- `ajv` + `ajv-formats` for schemas, `jsonpath-plus` for JSON. Zod is not a dependency.
- Path aliases `@api @config @fixtures @pages @testdata @utils` over relative imports.
- **No test may pass or fail on model output**, and the suite must stay green with no API key.
- No em dashes in any documentation.