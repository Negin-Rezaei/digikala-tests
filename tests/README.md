# Running Tests

Every way to run the Digikala QA test suite — by spec file, by feature, by priority, headed or headless.

> If this is your first run, finish setup first: see the root [README.md](../README.md).

---

## Table of contents

- [Conventions](#conventions)
- [Quick command reference](#quick-command-reference)
- [Headed vs headless mode](#headed-vs-headless-mode)
- [Run scope: all / spec / test](#run-scope-all--spec--test)
- [Filter by feature](#filter-by-feature)
- [Filter by priority](#filter-by-priority)
- [Debug mode](#debug-mode)
- [UI mode](#ui-mode)
- [View HTML report](#view-html-report)

---

## Conventions

Anywhere you see a placeholder, substitute your real value:

| Placeholder | Meaning | Allowed values |
|---|---|---|
| `<feature>` | One of the storefront features under `tests/storefront/` | `homepage`, `search`, `plp` |
| `<path/to/spec>` | Path to any `*.spec.js` file under `tests/` | e.g. `tests/storefront/plp/plp.spec.js` |
| `<priority>` | Priority band on the test ID | `CRIT`, `HIGH`, `MED` |
| `<TEST-ID>` | A scenario ID from the spec | e.g. `CRIT-HOME-LOAD-001`, `HIGH-SEARCH-CLEAR-001` |

Each test title carries both the priority band and the scenario ID, e.g.
`CRIT-HOME-LOAD-001 — Homepage renders all primary sections`. Filtering by
`--grep` on the ID (or just on the band prefix `CRIT-`) is the fastest way to
narrow a run.

---

## Quick command reference

| Goal | Command template |
|---|---|
| Run everything (headed) | `npm test` |
| Run everything headless | `npm test -- --headed=false` |
| Run a single feature | `npx playwright test tests/storefront/<feature>` |
| Run a single spec file | `npx playwright test <path/to/spec>` |
| Run by priority band | `npm test -- --grep "<priority>-"` |
| Run a single scenario | `npm test -- --grep "<TEST-ID>"` |
| Debug a single test | `npm test -- --grep "<TEST-ID>" --debug` |
| Open last HTML report | `npx playwright show-report` |

---

## Headed vs headless mode

The `storefront` project in [playwright.config.js](../playwright.config.js) is configured with `headless: false`, so tests open a **visible Chrome window** with a small `slowMo`. Useful for watching the live Digikala UI react to each click.

### Headed (default — browser visible)
```bash
npm test
```

### Headless (no browser window — faster, suitable for CI)
Override the config flag from the CLI with `--headed=false`, or set `PWTEST_HEADLESS`:

```bash
# Single run, headless
npm test -- --headed=false

# Windows PowerShell — persist for the session
$env:PWTEST_HEADLESS = "1"; npm test

# Bash / macOS / Linux
PWTEST_HEADLESS=1 npm test
```

---

## Run scope: all / spec / test

### Everything
```bash
npm test
```

### Single feature folder
```bash
npx playwright test tests/storefront/homepage
npx playwright test tests/storefront/search
npx playwright test tests/storefront/plp
```

### Single spec file
```bash
npx playwright test tests/storefront/homepage/homepage.spec.js
npx playwright test tests/storefront/search/search.spec.js
npx playwright test tests/storefront/plp/plp.spec.js
```

### Single scenario by ID
```bash
npm test -- --grep "CRIT-HOME-LOAD-001"
npm test -- --grep "HIGH-SEARCH-CLEAR-001"
npm test -- --grep "CRIT-PLP-SORT-001"
```

---

## Filter by feature

Each `describe` block is named e.g. `Digikala — Homepage (Critical)`. Filter by the feature word:

```bash
npm test -- --grep "Homepage"
npm test -- --grep "Search"
npm test -- --grep "PLP"
```

Or just point Playwright at the folder (faster, no regex needed):

```bash
npx playwright test tests/storefront/search
```

---

## Filter by priority

Every scenario carries a priority band as the prefix of its test title — `CRIT-`, `HIGH-`, `MED-`. Filter with `--grep`:

**Template:**
```bash
# Whole suite, one priority
npm test -- --grep "<priority>-"

# One spec file, one priority
npx playwright test <path/to/spec> --grep "<priority>-"
```

**Concrete examples:**
```bash
# Only critical (P0 — smoke / blocking), across all features
npm test -- --grep "CRIT-"

# Only high-priority across the suite
npm test -- --grep "HIGH-"

# Critical tests inside a specific spec file
npx playwright test tests/storefront/homepage/homepage.spec.js --grep "CRIT-"
npx playwright test tests/storefront/search/search.spec.js     --grep "HIGH-"
npx playwright test tests/storefront/plp/plp.spec.js           --grep "MED-"

# Combine: critical AND homepage
npm test -- --grep "(?=.*CRIT-)(?=.*HOME)"

# Exclude one band — everything except MED
npm test -- --grep-invert "MED-"
```

---

## Debug mode

Step through a single test with the Playwright Inspector (always headed):
```bash
npm test -- --debug
npm test -- --grep "<TEST-ID>" --debug
```

Examples:
```bash
npm test -- --grep "CRIT-HOME-CART-NAV-001"      --debug
npm test -- --grep "CRIT-SEARCH-RESULTS-RENDER-001" --debug
npm test -- --grep "CRIT-PLP-SORT-001"           --debug
```

---

## UI mode

Interactive test runner with watch mode and time-travel:
```bash
npx playwright test --ui
```

---

## View HTML report

After any run, open the last report:
```bash
npx playwright show-report
```

The HTML report is configured in [playwright.config.js](../playwright.config.js) to auto-open **only on failure** — you don't have to dismiss a browser window after every green run.

---

## Notes specific to digikala.com

- Tests run against the **public** site as an anonymous user. There is no auth setup; the `storageState` field is intentionally left unset.
- The site is bot-aware. If you see captchas or 403s, slow the run down further by increasing `slowMo` in [playwright.config.js](../playwright.config.js), or run with `--headed` so the request fingerprint looks more human.
- Persian copy assertions are regex-based (see `fixtures/*.fixtures.js`), so they tolerate ZWNJ (`‌`) and whitespace drift.
- Locators try `data-testid` first, then fall back to role/structural selectors with an inline `TODO` — never to prices or numbers.
