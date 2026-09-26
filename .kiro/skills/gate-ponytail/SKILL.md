---
name: gate-ponytail
description: Quality gate for this repository asking "does anything else in the run already record this?". Trace and video are on, so test.step, testInfo.attach, or log.info that only re-surface the trace are duplicate. Use when reviewing diffs that add step wrappers, screenshots, or claim-logging before a pull request. Full detail: .claude/skills/gate-ponytail/SKILL.md
---

# Gate 2: ponytail

> Does anything else in the run already record this?

`playwright.config.ts` sets `trace: 'on'` and `video: 'on'`, so the trace already records every request, timing and body.

- A `test.step` or `testInfo.attach` that only surfaces that is duplicate.
- So is a `log.info` restating its own step name, or a `describe` around one test.

Report findings as `<file>:L<n>: <tag> <what>. <replacement>.` and end with `net: -N lines possible.`

Never cut an assertion, never cut knowledge that cannot be re-derived from the code, and never touch test granularity - that is a decision about how failures report.