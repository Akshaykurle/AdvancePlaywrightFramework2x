# AdvancePlaywright Framework 2x

A scalable, enterprise-grade test automation framework built with **Playwright + TypeScript**, following industry best practices such as the Page Object Model, custom fixtures, data-driven testing, and structured reporting.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Configuration](#environment-configuration)
- [Running Tests](#running-tests)
- [Test Reports](#test-reports)
- [CI/CD](#cicd)

---

## Features

- **API Testing** – Dedicated API client layer for REST API automation
- **Page Object Model** – Clean separation of page logic and test logic
- **Custom Fixtures** – Reusable Playwright fixtures for dependency injection
- **Data-Driven Testing** – Support for JSON, CSV, and Excel (XLSX) test data
- **Schema Validation** – JSON schema validation with Ajv + ajv-formats
- **Fake Test Data** – Dynamic data generation using Faker.js
- **Logging** – Structured logging with Winston
- **Config Management** – Multi-environment configuration via dotenv
- **Reporting** – HTML report & Allure reporting integration

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Playwright](https://playwright.dev/) | Browser & API automation |
| [TypeScript](https://www.typescript.org/) | Type-safe development |
| [dotenv](https://github.com/motdotla/dotenv) | Environment variable management |
| [winston](https://github.com/winstonjs/winston) | Logging |
| [@faker-js/faker](https://fakerjs.dev/) | Fake test data generation |
| [csv-parse](https://csv.js.org/parse/) | CSV parsing |
| [xlsx (SheetJS)](https://sheetjs.com/) | Excel file parsing |
| [ajv](https://ajv.js.org/) / [ajv-formats](https://github.com/ajv-validator/ajv-formats) | JSON schema validation |
| [jsonpath-plus](https://github.com/JSONPath-Plus/JSONPath) | JSON query support |
| [allure-playwright](https://allurereport.org/docs/playwright/) | Allure reporting |

## Project Structure

```
AdvancePlaywrightFramework2x/
├── .github/
│   └── workflows/          # CI pipelines (GitHub Actions)
├── docs/                   # Project documentation
├── rules/                  # Coding standards & guidelines
├── src/
│   ├── api/                # API clients
│   ├── config/             # Environment configuration
│   ├── fixtures/           # Custom Playwright fixtures
│   ├── pages/              # Page Object Model
│   ├── testdata/           # Test data files (JSON / CSV / XLSX)
│   ├── tests/              # Test cases
│   └── utils/              # Reusable utilities (logger, helpers, etc.)
├── .env                    # Environment variables (not committed)
├── package.json
├── playwright.config.ts    # Playwright configuration
└── tsconfig.json           # TypeScript configuration
```

## Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | >= 18.x |
| npm | >= 9.x |

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/Akshaykurle/AdvancePlaywright2x.git
   cd AdvancePlaywright2x
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Install Playwright browsers**

   ```bash
   npx playwright install
   ```

4. **Create environment file**

   Create a `.env` file in the project root (see [Environment Configuration](#environment-configuration)).

## Environment Configuration

Sensitive and environment-specific values are managed through a `.env` file:

```dotenv
BASE_URL=https://your-app-url.com
API_BASE_URL=https://api.your-app-url.com
USERNAME=testuser
PASSWORD=secret
```

> `.env` is excluded from version control via `.gitignore`. Never commit real credentials.

## Running Tests

```bash
# Run all tests (headless)
npx playwright test

# Run tests in headed mode
npx playwright test --headed

# Run a specific test file
npx playwright test src/tests/example.spec.ts

# Run tests matching a title
npx playwright test -g "login"

# Run on a specific browser
npx playwright test --project=chromium

# Debug mode (Playwright Inspector)
npx playwright test --debug
```

## Test Reports

### HTML Report

```bash
npx playwright show-report
```

### Allure Report

```bash
# Generate and open the Allure report
npx allure generate ./allure-results --clean
npx allure open ./allure-report
```

## CI/CD

The repository includes a GitHub Actions workflow at `.github/workflows/playwright.yml` that installs dependencies, builds the project, runs Playwright tests, and publishes reports on every push/pull request.

---

## Author

**Akshay Kurle**

## License

ISC
