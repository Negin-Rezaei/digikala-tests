// @js-check
import { test, expect } from '@playwright/test';
import { testIds, tid } from './testid-mapping.js';
import {
  SEARCH_URL,
  SEARCH_QUERIES,
  SEARCH_COPY,
  SEARCH_SUGGESTIONS,
} from '../../../fixtures/search.fixtures.js';
import { waitForSpinner } from '../../../helpers/wait.js';

/**
 * @spec openspec/specs/storefront-test-suite/search/search.spec.md
 * @mapping openspec/specs/storefront-test-suite/search/testid-mapping.md
 * @fixtures fixtures/search.fixtures.js
 */

// ─────────────────────────────────────────────────────────────────────────────
// Locator helpers
// ─────────────────────────────────────────────────────────────────────────────
const searchInput = (page) =>
  // TODO: replace with tid(testIds.headerSearchInput) once attached.
  page.locator(tid(testIds.headerSearchInput))
    .or(page.getByPlaceholder(SEARCH_COPY.searchPlaceholder).first())
    .or(page.locator('header').first().getByRole('textbox').first());

const searchSuggestions = (page) =>
  // TODO: replace with tid(testIds.searchSuggestions) once attached.
  page.locator(tid(testIds.searchSuggestions))
    .or(page.locator('[role="listbox"]').filter({ visible: true }).first())
    .or(page.locator('header').first()
      .locator('div').filter({ has: page.locator('a, button, [role="option"]') })
      .filter({ visible: true })
      .nth(1));

const suggestionItems = (page) =>
  searchSuggestions(page).locator(tid(testIds.searchSuggestionItem))
    .or(searchSuggestions(page).locator('a, [role="option"]'));

const srpGrid = (page) =>
  // TODO: replace with tid(testIds.searchSrpGrid) once attached.
  page.locator(tid(testIds.searchSrpGrid))
    .or(page.locator('main').first());

const srpCards = (page) =>
  // TODO: replace with tid(testIds.searchSrpCard) once attached.
  srpGrid(page).locator(tid(testIds.searchSrpCard))
    .or(srpGrid(page).locator('a[href*="/product/"]'));

const srpEmptyState = (page) =>
  page.locator(tid(testIds.searchSrpEmpty))
    .or(page.getByText(SEARCH_COPY.emptyState).first());

// ─────────────────────────────────────────────────────────────────────────────
// Critical scenarios
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Digikala — Search (Critical)', () => {

  test('CRIT-SEARCH-INPUT-001 — Search input is visible and focusable', async ({ page }) => {
    await page.goto(SEARCH_URL.homePath, { waitUntil: 'domcontentloaded' });
    await waitForSpinner(page);

    const input = searchInput(page);
    await expect(input).toBeVisible();
    await input.click();
    await expect(input).toBeFocused();
  });

  test('CRIT-SEARCH-SUGGESTIONS-001 — Typing opens the suggestions dropdown', async ({ page }) => {
    await page.goto(SEARCH_URL.homePath, { waitUntil: 'domcontentloaded' });
    await waitForSpinner(page);

    const input = searchInput(page);
    await input.click();
    await input.pressSequentially(SEARCH_QUERIES.popular, { delay: 80 });

    const suggestions = searchSuggestions(page);
    await expect(suggestions).toBeVisible({ timeout: 10000 });

    const items = suggestionItems(page);
    expect(await items.count()).toBeGreaterThanOrEqual(SEARCH_SUGGESTIONS.minSuggestions);
  });

  test('CRIT-SEARCH-SUBMIT-ENTER-001 — Enter navigates to the SRP with the query in the URL', async ({ page }) => {
    await page.goto(SEARCH_URL.homePath, { waitUntil: 'domcontentloaded' });
    await waitForSpinner(page);

    const input = searchInput(page);
    await input.click();
    await input.fill(SEARCH_QUERIES.popular);
    await input.press('Enter');
    await waitForSpinner(page);

    await expect(page).toHaveURL(SEARCH_URL.resultsPathRegex);
    // The query (or its URL-encoded form) must appear somewhere in the URL.
    const url = page.url();
    expect(url.includes(SEARCH_QUERIES.popular) || url.includes(encodeURIComponent(SEARCH_QUERIES.popular))).toBeTruthy();
  });

  test('CRIT-SEARCH-RESULTS-RENDER-001 — A common query returns at least one product card', async ({ page }) => {
    await page.goto(SEARCH_URL.homePath, { waitUntil: 'domcontentloaded' });
    await waitForSpinner(page);

    const input = searchInput(page);
    await input.click();
    await input.fill(SEARCH_QUERIES.popular);
    await input.press('Enter');
    await waitForSpinner(page);
    // Settle the result grid before counting cards.
    await page.waitForLoadState('networkidle').catch(() => { });

    const cards = srpCards(page);
    expect(await cards.count()).toBeGreaterThan(0);
    await expect(page.getByText(SEARCH_COPY.currency).first()).toBeVisible();
  });

  test('CRIT-SEARCH-EMPTY-001 — A nonsense query renders the empty-state message', async ({ page }) => {
    await page.goto(SEARCH_URL.homePath, { waitUntil: 'domcontentloaded' });
    await waitForSpinner(page);

    const input = searchInput(page);
    await input.click();
    await input.fill(SEARCH_QUERIES.noResults);
    await input.press('Enter');
    await waitForSpinner(page);
    await page.waitForLoadState('networkidle').catch(() => { });

    await expect(srpEmptyState(page)).toBeVisible({ timeout: 15000 });
    expect(await srpCards(page).count()).toBe(0);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// High-priority scenarios
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Digikala — Search (High)', () => {

  test('HIGH-SEARCH-CLEAR-001 — Typed query can be cleared back to empty', async ({ page }) => {
    await page.goto(SEARCH_URL.homePath, { waitUntil: 'domcontentloaded' });
    await waitForSpinner(page);

    const input = searchInput(page);
    await input.click();
    await input.pressSequentially(SEARCH_QUERIES.popular, { delay: 50 });

    // Prefer the explicit clear button when present; otherwise empty the input.
    const clear = page.locator(tid(testIds.headerSearchClear)).first();
    if (await clear.isVisible().catch(() => false)) {
      await clear.click();
    } else {
      await input.fill('');
    }
    await expect(input).toHaveValue('');
  });

  test('HIGH-SEARCH-RESULT-CLICK-001 — Clicking a result card opens the PDP', async ({ page }) => {
    await page.goto(SEARCH_URL.homePath, { waitUntil: 'domcontentloaded' });
    await waitForSpinner(page);

    const input = searchInput(page);
    await input.click();
    await input.fill(SEARCH_QUERIES.popular);
    await input.press('Enter');
    await waitForSpinner(page);
    await page.waitForLoadState('networkidle').catch(() => { });

    const firstCard = srpCards(page).first();
    await firstCard.scrollIntoViewIfNeeded();
    await firstCard.click();
    await waitForSpinner(page);

    await expect(page).toHaveURL(SEARCH_URL.pdpPathRegex);
  });

  test('HIGH-SEARCH-URL-PERSIST-001 — Search query persists across page refresh', async ({ page }) => {
    await page.goto(SEARCH_URL.homePath, { waitUntil: 'domcontentloaded' });
    await waitForSpinner(page);

    const input = searchInput(page);
    await input.click();
    await input.fill(SEARCH_QUERIES.popular);
    await input.press('Enter');
    await waitForSpinner(page);

    const urlBefore = page.url();
    await page.reload({ waitUntil: 'domcontentloaded' });
    await waitForSpinner(page);

    expect(page.url()).toBe(urlBefore);
    await expect(page).toHaveURL(SEARCH_URL.resultsPathRegex);
  });
});
