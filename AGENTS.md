# AGENTS.md

Instructions for AI coding agents working in this repository.

## Project Overview

**AdvancePlaywright Framework 2x** — a test automation framework built with Playwright + TypeScript following the Page Object Model, custom fixtures, and data-driven testing.

## Project Structure

```
src/
├── api/          # API clients — one class per service/domain
├── config/       # Environment configuration (reads .env via dotenv)
├── fixtures/     # Custom Playwright fixtures — extend base test here
├── pages/        # Page Object Model classes
├── testdata/     # Test data files: JSON, CSV, XLSX
├── tests/        # Test specs (*.spec.ts) — Playwright testDir
└── utils/        # Reusable helpers: logger (winston), readers, validators
docs/             # Project documentation
rules/            # Coding standards & guidelines
```

## Commands

```bash
npm install                  # Install dependencies
npx playwright install       # Install browsers
npx playwright test          # Run all tests (headless)
npx playwright test --headed # Run in headed mode
npx playwright show-report   # Open HTML report
npx playwright test --debug  # Debug with Playwright Inspector
```

## Code Conventions

- **TypeScript strict mode** is enabled (`tsconfig.json`). No `any` unless unavoidable.
- **Page Object Model**: never call selectors directly inside test files. Add locators/actions to page classes in `src/pages/` and call them from tests.
- **Fixtures over globals**: share state (pages, API clients, logged-in contexts) through custom fixtures in `src/fixtures/`, not global variables.
- **Test naming**: `*.spec.ts`, descriptive titles, group with `test.describe`.
- **Imports**: use the `@src/*` path alias configured in `tsconfig.json` (`paths`) when importing across folders.
- **No comments** unless explaining non-obvious logic.

## Test Data

- Store static payloads in `src/testdata/` as JSON.
- Use `@faker-js/faker` for dynamic data instead of hardcoding values.
- Parse CSV with `csv-parse`; parse Excel with `xlsx` (SheetJS, installed from cdn.sheetjs.com — do not switch to the npm `xlsx` package).
- Validate API responses against JSON schemas with `ajv` + `ajv-formats`.

## Environment & Secrets

- All environment-specific values come from `.env` (loaded via `dotenv`). Never commit `.env` or hardcode credentials/URLs in code.
- Access env vars through `src/config/` wrappers, not `process.env` scattered across tests.

## Reporting & Logs

- HTML report: default Playwright reporter. Allure available via `allure-playwright`.
- Use the winston logger from `src/utils/` instead of `console.log`.

## Git Rules

- Do not commit unless explicitly asked.
- Never commit secrets, tokens, or `.env`.
