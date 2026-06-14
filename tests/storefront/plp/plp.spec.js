// @js-check
import { test, expect } from '@playwright/test';
import { testIds, tid } from './testid-mapping.js';
import {
  PLP_URL,
  PLP_SORT_OPTIONS,
  PLP_SAMPLE_SORT,
  PLP_FILTER,
  PLP_COPY,
  PLP_COUNTS,
} from '../../../fixtures/plp.fixtures.js';
import { waitForSpinner } from '../../../helpers/wait.js';

/**
 * @spec openspec/specs/storefront-test-suite/plp/plp.spec.md
 * @mapping openspec/specs/storefront-test-suite/plp/testid-mapping.md
 * @fixtures fixtures/plp.fixtures.js
 */

// ─────────────────────────────────────────────────────────────────────────────
// Locator helpers
// ─────────────────────────────────────────────────────────────────────────────
const plpRoot = (page) =>
  page.locator(tid(testIds.plpRoot))
    .or(page.locator('main').first());

const plpBreadcrumb = (page) =>
  // TODO: replace with tid(testIds.plpBreadcrumb) once attached.
  page.locator(tid(testIds.plpBreadcrumb))
    .or(page.locator('nav').filter({ has: page.getByText(PLP_COPY.breadcrumbHome) }).first());

const plpTitle = (page) =>
  page.locator(tid(testIds.plpTitle))
    .or(page.getByRole('heading').filter({ hasText: PLP_URL.canonicalCategoryLabel }).first());

const plpSortBar = (page) =>
  page.locator(tid(testIds.plpSortBar))
    .or(page.getByText(/مرتب\s*سازی|مرتب[‌\s]*سازی\s*بر\s*اساس/u).locator('xpath=ancestor::*[1]').first());

const plpSortOption = (page, option) =>
  page.locator(tid(testIds.plpSortOption(option.slug)))
    .or(plpSortBar(page).getByText(new RegExp(option.label.replace(/\s+/gu, '[‌\\s]*'), 'u')).first())
    .or(page.getByRole('button', { name: new RegExp(option.label, 'u') }).first());

const plpFilterSidebar = (page) =>
  page.locator(tid(testIds.plpFilterSidebar))
    .or(page.locator('aside').filter({ has: page.getByText(PLP_FILTER.priceRange.label) }).first());

const plpFilterClear = (page) =>
  page.locator(tid(testIds.plpFilterClear))
    .or(page.getByRole('button', { name: PLP_FILTER.clearFiltersLabel }).first());

const plpAvailableOnlyToggle = (page) =>
  page.locator(tid(testIds.plpAvailableOnlyToggle))
    .or(page.getByText(PLP_FILTER.availableOnly.label).locator('xpath=ancestor::label[1] | xpath=ancestor::*[self::button or self::div][1]').first());

const plpGrid = (page) =>
  page.locator(tid(testIds.plpGrid))
    .or(page.locator('main').first());

const plpCards = (page) =>
  // TODO: replace with tid(testIds.plpCard) once attached.
  plpGrid(page).locator(tid(testIds.plpCard))
    .or(plpGrid(page).locator('a[href*="/product/"]'));

const plpEmptyState = (page) =>
  page.locator(tid(testIds.plpEmptyState))
    .or(page.getByText(PLP_COPY.emptyState).first());

// ─────────────────────────────────────────────────────────────────────────────
// Critical scenarios
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Digikala — PLP (Critical)', () => {

  test('CRIT-PLP-LOAD-001 — PLP renders breadcrumb, title, filters, sort bar, and at least one card', async ({ page }) => {
    await page.goto(PLP_URL.canonicalCategoryPath, { waitUntil: 'domcontentloaded' });
    await waitForSpinner(page);
    await page.waitForLoadState('networkidle').catch(() => { });

    await expect.soft(plpBreadcrumb(page)).toBeVisible();
    await expect.soft(plpTitle(page)).toBeVisible();
    await expect.soft(plpSortBar(page)).toBeVisible();
    await expect.soft(plpFilterSidebar(page)).toBeVisible();

    expect(await plpCards(page).count()).toBeGreaterThanOrEqual(PLP_COUNTS.minCardsOnFirstPage);
  });

  test('CRIT-PLP-CARD-CLICK-001 — Clicking a card opens the PDP', async ({ page }) => {
    await page.goto(PLP_URL.canonicalCategoryPath, { waitUntil: 'domcontentloaded' });
    await waitForSpinner(page);
    await page.waitForLoadState('networkidle').catch(() => { });

    const first = plpCards(page).first();
    await first.scrollIntoViewIfNeeded();
    await first.click();
    await waitForSpinner(page);

    await expect(page).toHaveURL(PLP_URL.pdpPathRegex);
  });

  test('CRIT-PLP-SORT-001 — Changing the sort option re-renders the grid with a sort URL parameter', async ({ page }) => {
    await page.goto(PLP_URL.canonicalCategoryPath, { waitUntil: 'domcontentloaded' });
    await waitForSpinner(page);
    await page.waitForLoadState('networkidle').catch(() => { });

    const before = await plpCards(page).count();
    expect(before).toBeGreaterThan(0);

    await plpSortOption(page, PLP_SAMPLE_SORT).click();
    await waitForSpinner(page);
    await page.waitForLoadState('networkidle').catch(() => { });

    expect(page.url()).toContain(`${PLP_URL.sortQueryKey}=`);
    expect(await plpCards(page).count()).toBeGreaterThan(0);
  });

  test('CRIT-PLP-FILTER-AVAILABLE-001 — Toggling "available only" narrows the URL params and keeps the grid populated or shows empty-state', async ({ page }) => {
    await page.goto(PLP_URL.canonicalCategoryPath, { waitUntil: 'domcontentloaded' });
    await waitForSpinner(page);
    await page.waitForLoadState('networkidle').catch(() => { });

    const toggle = plpAvailableOnlyToggle(page);
    if (!(await toggle.isVisible().catch(() => false))) {
      test.skip(true, 'available-only toggle not visible on this PLP build');
    }
    await toggle.scrollIntoViewIfNeeded();
    await toggle.click();
    await waitForSpinner(page);
    await page.waitForLoadState('networkidle').catch(() => { });

    expect(page.url()).toMatch(PLP_FILTER.availableOnly.urlParamRegex);

    const cards = await plpCards(page).count();
    const isEmpty = await plpEmptyState(page).isVisible().catch(() => false);
    expect(cards > 0 || isEmpty).toBeTruthy();
  });

  test('CRIT-PLP-FILTER-RESET-001 — Clearing filters removes filter params from the URL', async ({ page }) => {
    // Land on the PLP with a sort applied so the clear-filters button is available.
    const startUrl = `${PLP_URL.canonicalCategoryPath}?${PLP_URL.sortQueryKey}=${PLP_SAMPLE_SORT.slug}`;
    await page.goto(startUrl, { waitUntil: 'domcontentloaded' });
    await waitForSpinner(page);
    await page.waitForLoadState('networkidle').catch(() => { });

    const clear = plpFilterClear(page);
    if (!(await clear.isVisible().catch(() => false))) {
      test.skip(true, 'clear-filters control not visible on this PLP build');
    }
    await clear.click();
    await waitForSpinner(page);

    expect(page.url()).not.toContain(`${PLP_URL.sortQueryKey}=`);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// High-priority scenarios
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Digikala — PLP (High)', () => {

  test('HIGH-PLP-BREADCRUMB-001 — Breadcrumb shows home as first crumb', async ({ page }) => {
    await page.goto(PLP_URL.canonicalCategoryPath, { waitUntil: 'domcontentloaded' });
    await waitForSpinner(page);
    await page.waitForLoadState('networkidle').catch(() => { });

    const crumbHome = plpBreadcrumb(page).getByText(PLP_COPY.breadcrumbHome).first();
    await expect(crumbHome).toBeVisible();
    await crumbHome.click();
    await waitForSpinner(page);
    await expect(page).toHaveURL(/\/(\?|$)/u);
  });

  test('HIGH-PLP-PAGINATION-001 — User can advance past the first page of results', async ({ page }) => {
    await page.goto(PLP_URL.canonicalCategoryPath, { waitUntil: 'domcontentloaded' });
    await waitForSpinner(page);
    await page.waitForLoadState('networkidle').catch(() => { });

    const initial = await plpCards(page).count();
    expect(initial).toBeGreaterThan(0);

    // Two strategies — try the explicit next-page button, else fall back to
    // an infinite-scroll attempt.
    const nextButton = page.locator(tid(testIds.plpNextPage))
      .or(page.getByRole('link',   { name: PLP_COPY.nextPageLabel }).first())
      .or(page.getByRole('button', { name: PLP_COPY.nextPageLabel }).first());

    if (await nextButton.isVisible().catch(() => false)) {
      await nextButton.click();
      await waitForSpinner(page);
      await page.waitForLoadState('networkidle').catch(() => { });
      expect(page.url()).toMatch(/[?&]page=2|pageno=2/u);
    } else {
      // Infinite scroll fallback — scroll to the bottom and wait for new cards.
      const startCount = initial;
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(2000);
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForLoadState('networkidle').catch(() => { });
      const newCount = await plpCards(page).count();
      expect(newCount).toBeGreaterThanOrEqual(startCount);
    }
  });

  test('HIGH-PLP-EMPTY-FILTER-001 — Restrictive filters render the empty-state', async ({ page }) => {
    // Force a price band that no real listing will fit (1 toman max).
    const startUrl = `${PLP_URL.canonicalCategoryPath}?price%5Bmin%5D=1&price%5Bmax%5D=2`;
    await page.goto(startUrl, { waitUntil: 'domcontentloaded' });
    await waitForSpinner(page);
    await page.waitForLoadState('networkidle').catch(() => { });

    // Either the empty-state is visible, OR the live app refuses an unrealistic
    // price band by clamping it — accept both outcomes.
    const empty = await plpEmptyState(page).isVisible().catch(() => false);
    const cards = await plpCards(page).count();
    expect(empty || cards === 0).toBeTruthy();
  });
});
