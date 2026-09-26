---
name: gate-ai-slop
description: Quality gate for this repository asking "was this change generated, skimmed, and shipped?". Detects invented APIs, assertions that cannot fail, any/@ts-ignore mute buttons, comments restating code, recreated helpers, dead exports, and documented claims nobody ran. Use when raising a pull request, reviewing any AI-produced diff, or running "the gates". Full detail: .claude/skills/gate-ai-slop/SKILL.md
---

# Gate 1: ai-slop

> Was this change generated, skimmed, and shipped?

1. Invented APIs. A method, option or field that does not exist. Grep it in `node_modules/**/*.d.ts` and `src/`; if it cannot be found it was imagined.
2. Assertions that check nothing. `toBeTruthy()` on an always-truthy value, a test with no `expect`, or an assertion after the real work was already awaited away. A test asserting on LLM/model output is a hard failure in this repo: assert on schema validity, HTTP status, or a verified locator, never on generated prose.
3. `any` used as a mute button. `as any`, `@ts-ignore`, `eslint-disable` with no reason on the line. Each is a claim that the type system is wrong; make the author say why.
4. Comments that restate the code. A comment earns its place by saying *why*, or by recording something the code cannot (a verified status code, a provider quirk, a measured number).
5. Re-created helpers. Before accepting a new helper, grep `src/utils/` and `src/config/`. This repo already has ApiHelper, SchemaValidator, DataGenerator, UtilElementLocator, logger, visualStep, selfHeal.
6. Dead exports. A symbol exported and never imported. Count importers: `rg -l "\b<symbol>\b" src --type ts | Measure-Object` (or `grep -rl`); a symbol used only in its defining file is dead. This exact audit once found 8 of 17 dead exports in `src/ai`.
7. Claims nobody verified. A number, status code or behaviour in a doc, commit message or PR body that was never run. Every factual claim needs a command behind it.

## Evidence required

```bash
npm run verify     # typecheck, lint, full suite - paste the real output
```

A gate report that says "tests pass" without the counts has itself been skimmed and shipped.

## Verdict

`FAIL` on any invented API, any assertion that cannot fail, any test riding on model output, or any documented claim that was not run. Everything else is a note, not a block.