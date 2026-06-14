# Digikala E2E Tests

End-to-end Playwright test suite for [digikala.com](https://www.digikala.com), covering three storefront surfaces:

- **Homepage** — header, hero, categories, product carousels, footer
- **Search** — query, suggestions, results page
- **PLP** (Product List Page) — filters, sorting, pagination

Generated using a layered approach inspired by the OpenSpec workflow:

```
openspec/specs/storefront-test-suite/<feature>/<feature>.spec.md   ← WHAT (BDD scenarios — business language)
openspec/specs/storefront-test-suite/<feature>/testid-mapping.md   ← WHICH selectors (data-testid contract)
fixtures/<feature>.fixtures.js                                     ← WITH WHAT (URLs, copy regex, viewports)
tests/storefront/<feature>/<feature>.spec.js                       ← BRIDGE (Playwright test that wires them up)
```

## Quick start

```bash
npm install
npx playwright install chromium
cp .env.example .env       # edit if you want a different STOREFRONT_URL
npm test
```

By default the Chrome project runs headed with a small `slowMo` so you can watch the run.

## Layout

```
.
├── helpers/
│   └── wait.js             # waitForSpinner — call after every page.goto() & before clicks
├── fixtures/
│   ├── homepage.fixtures.js
│   ├── search.fixtures.js
│   └── plp.fixtures.js
├── openspec/specs/storefront-test-suite/
│   ├── homepage/   ← spec.md + testid-mapping.md
│   ├── search/
│   └── plp/
├── tests/storefront/
│   ├── homepage/   ← homepage.spec.js + testid-mapping.js
│   ├── search/
│   └── plp/
├── playwright.config.js
└── package.json
```

## Conventions

- **Selectors:** prefer `data-testid` via the per-feature `testid-mapping.js`. When the mapped attribute is not yet on the live DOM, fall back to a structural `role=…` / portal locator with an inline `TODO` instead of failing.
- **No price/number-based selectors.** Locators must be structural; never anchor on a price, a digit, or a transient piece of marketing copy.
- **Persian copy as regex.** Free-text assertions go through the `*_COPY` exports in fixtures — tolerant of ZWNJ (`‌`) and whitespace drift.
- **`waitForSpinner(page)`** is the standard wait. Call it right after `page.goto()` and before each significant click.

## Scenario IDs

Each BDD scenario carries a stable ID such as `CRIT-HOME-LOAD-001`. The format is:

```
<priority>-<feature>-<area>-<sequence>
```

Priority bands: `CRIT` / `HIGH` / `MED` / `LOW`. The Playwright test title and `@spec` comment cite the same ID so failures trace back to the spec line in one click.
