---
name: gate-over-engineering
description: Quality gate for this repository asking "how many callers does this abstraction have?". One caller is not an abstraction, it is a detour; zero is dead code. Use when reviewing diffs that add or wrap functions, helpers, or exported types before a pull request. Full detail: .claude/skills/gate-over-engineering/SKILL.md
---

# Gate 3: over-engineering

> How many callers does this abstraction have?

Count the callers with a command and paste the number:

```bash
rg -rn "\b<symbol>\b" src --type ts | findstr /c:"<symbol>"
```

- **One caller is not an abstraction, it is a detour.**
- **Zero is dead code.**
- The exception is a seam something outside your control requires (`hasApiKey()` has one caller because `CustomReporter` demands that exact function).
- A type used only in its own file should lose its `export`, not be deleted.

## Verdict

`FAIL` on any new zero-caller export or module. Note one-caller abstractions and let the author justify them.