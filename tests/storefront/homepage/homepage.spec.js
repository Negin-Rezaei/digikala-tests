// @js-check
import { test, expect } from '@playwright/test';
import { testIds, tid } from './testid-mapping.js';
import {
  HOME_URL,
  HOME_ROOT_CATEGORIES,
  HOME_HERO,
  HOME_AMAZING_OFFERS,
  HOME_PRODUCT_CAROUSEL,
  HOME_COPY,
  HOME_VIEWPORTS,
} from '../../../fixtures/homepage.fixtures.js';
import { waitForSpinner } from '../../../helpers/wait.js';

/**
 * @spec openspec/specs/storefront-test-suite/homepage/homepage.spec.md
 * @mapping openspec/specs/storefront-test-suite/homepage/testid-mapping.md
 * @fixtures fixtures/homepage.fixtures.js
 *
 * Selector strategy:
 *   - First choice is always the mapped data-testid.
 *   - If the testid isn't on the live DOM yet, fall back to a structural
 *     role / portal locator with an inline TODO. Never use price/number-based
 *     selectors.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Locator helpers
// ─────────────────────────────────────────────────────────────────────────────
const siteHeader = (page) =>
  page.locator(tid(testIds.siteHeader)).first()
    .or(page.locator('header').first());

const headerLogo = (page) =>
  // TODO: replace with tid(testIds.headerLogo) once attached.
  page.locator(tid(testIds.headerLogo))
    .or(siteHeader(page).getByRole('link', { name: HOME_COPY.brandName }).first())
    .or(siteHeader(page).locator('a[href="/"]').first());

const headerSearchInput = (page) =>
  // TODO: replace with tid(testIds.headerSearchInput) once attached.
  page.locator(tid(testIds.headerSearchInput))
    .or(page.getByPlaceholder(HOME_COPY.searchPlaceholder).first())
    .or(siteHeader(page).getByRole('textbox').first());

const headerLoginCta = (page) =>
  // TODO: replace with tid(testIds.headerLoginCta) once attached.
  page.locator(tid(testIds.headerLoginCta))
    .or(page.getByRole('link',   { name: HOME_COPY.loginCta }).first())
    .or(page.getByRole('button', { name: HOME_COPY.loginCta }).first());

const headerCartIcon = (page) =>
  // TODO: replace with tid(testIds.headerCartIcon) once attached.
  page.locator(tid(testIds.headerCartIcon))
    .or(page.locator(`a[href*="${HOME_URL.cartPath}"]`).first());

const headerCategoryTrigger = (page) =>
  // TODO: replace with tid(testIds.headerCategoryTrigger) once attached.
  page.locator(tid(testIds.headerCategoryTrigger))
    .or(page.getByRole('button', { name: HOME_COPY.categoryTrigger }).first())
    .or(page.getByText(HOME_COPY.categoryTrigger).first());

const headerCategoryMenu = (page) =>
  // TODO: replace with tid(testIds.headerCategoryMenu) once attached.
  page.locator(tid(testIds.headerCategoryMenu))
    .or(page.locator('[role="menu"], [role="dialog"]').filter({
      has: page.locator('a[href*="/main/"], a[href*="/category/"]'),
    }).first());

const homeHero = (page) =>
  // TODO: replace with tid(testIds.homeHero) once attached.
  page.locator(tid(testIds.homeHero))
    .or(page.locator('[class*="slider"], [class*="swiper"]').first());

const homeAmazingOffers = (page) =>
  // TODO: replace with tid(testIds.homeAmazingOffers) once attached.
  page.locator(tid(testIds.homeAmazingOffers))
    .or(page.getByText(HOME_COPY.amazingOffersHeading).first()
      .locator('xpath=ancestor::section[1] | xpath=ancestor::div[1]'));

const homeProductCarousels = (page) =>
  // TODO: replace with tid(testIds.homeProductCarousel) once attached.
  page.locator(tid(testIds.homeProductCarousel))
    .or(page.locator('section').filter({
      has: page.locator(`a[href*="/product/"], ${tid(testIds.homeProductCard)}`),
    }));

const siteFooter = (page) =>
  page.locator(tid(testIds.siteFooter)).first()
    .or(page.locator('footer').first());

// ─────────────────────────────────────────────────────────────────────────────
// Critical scenarios
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Digikala — Homepage (Critical)', () => {

  test('CRIT-HOME-LOAD-001 — Homepage renders all primary sections', async ({ page }) => {
    await page.goto(HOME_URL.homePath, { waitUntil: 'domcontentloaded' });
    await waitForSpinner(page);

    await expect(siteHeader(page)).toBeVisible();
    await expect(headerCategoryTrigger(page)).toBeVisible();
    await expect(homeHero(page)).toBeVisible();
    await expect.soft(homeAmazingOffers(page)).toBeVisible();
    await expect(homeProductCarousels(page).first()).toBeVisible();
    await expect(siteFooter(page)).toBeVisible();
  });

  test('CRIT-HOME-HEADER-001 — Header exposes logo, search, login CTA, and cart', async ({ page }) => {
    await page.goto(HOME_URL.homePath, { waitUntil: 'domcontentloaded' });
    await waitForSpinner(page);

    await expect(headerLogo(page)).toBeVisible();
    await expect(headerSearchInput(page)).toBeVisible();

    // Either the anonymous login CTA OR the authenticated avatar must be visible.
    const loginVisible   = await headerLoginCta(page).isVisible().catch(() => false);
    const avatarVisible  = await page.locator(tid(testIds.headerAccountAvatar)).isVisible().catch(() => false);
    expect(loginVisible || avatarVisible).toBeTruthy();

    await expect(headerCartIcon(page)).toBeVisible();
  });

  test('CRIT-HOME-LOGO-NAV-001 — Logo click navigates back to homepage from an inner page', async ({ page }) => {
    // Bounce away from the homepage to an SRP first.
    await page.goto(HOME_URL.searchPath('گوشی'), { waitUntil: 'domcontentloaded' });
    await waitForSpinner(page);

    await headerLogo(page).click();
    await waitForSpinner(page);

    await expect(page).toHaveURL(/\/$|\/\?/u);
    await expect(homeHero(page)).toBeVisible();
  });

  test('CRIT-HOME-CATEGORY-MENU-001 — Categories trigger opens the mega-menu', async ({ page }) => {
    await page.goto(HOME_URL.homePath, { waitUntil: 'domcontentloaded' });
    await waitForSpinner(page);

    const trigger = headerCategoryTrigger(page);
    await expect(trigger).toBeVisible();
    await trigger.hover();
    await trigger.click().catch(() => { /* hover-only triggers will error on click */ });

    const menu = headerCategoryMenu(page);
    await expect(menu).toBeVisible({ timeout: 10000 });

    // Soft-assert that at least one canonical root category is present.
    const visibleNames = [];
    for (const cat of HOME_ROOT_CATEGORIES) {
      const link = menu.getByRole('link', { name: new RegExp(cat.label, 'u') }).first();
      if (await link.isVisible().catch(() => false)) visibleNames.push(cat.label);
    }
    expect(visibleNames.length, `expected at least one root category, saw: ${visibleNames}`).toBeGreaterThan(0);

    // Dismiss the menu — Escape, or click outside on the body.
    await page.keyboard.press('Escape');
  });

  test('CRIT-HOME-CART-NAV-001 — Cart icon opens the cart page', async ({ page }) => {
    await page.goto(HOME_URL.homePath, { waitUntil: 'domcontentloaded' });
    await waitForSpinner(page);

    await headerCartIcon(page).click();
    await waitForSpinner(page);

    await expect(page).toHaveURL(new RegExp(HOME_URL.cartPath.replace(/\//gu, '\\/')));
    // Anonymous user starts with an empty cart — assertion is soft because a
    // logged-in account may carry cart items into the session.
    await expect.soft(page.getByText(HOME_COPY.cartEmptyState)).toBeVisible();
  });

  test('CRIT-HOME-LOGIN-CTA-001 — Login CTA opens the auth flow', async ({ page }) => {
    await page.goto(HOME_URL.homePath, { waitUntil: 'domcontentloaded' });
    await waitForSpinner(page);

    const cta = headerLoginCta(page);
    // Skip if the page is already authenticated.
    if (!(await cta.isVisible().catch(() => false))) test.skip(true, 'already authenticated — no anonymous CTA visible');

    await cta.click();
    await waitForSpinner(page);

    // The auth surface may be a modal (still on /) or a full page (/users/login-register/).
    // In either case there must be a phone-input box visible.
    const phoneInput = page.getByRole('textbox').first()
      .or(page.locator('input[type="tel"], input[name="username"], input[name="phone"]').first());
    await expect(phoneInput).toBeVisible({ timeout: 10000 });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// High-priority scenarios
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Digikala — Homepage (High)', () => {

  test('HIGH-HOME-HERO-001 — Hero slider renders at least one slide', async ({ page }) => {
    await page.goto(HOME_URL.homePath, { waitUntil: 'domcontentloaded' });
    await waitForSpinner(page);

    const hero = homeHero(page);
    await expect(hero).toBeVisible();

    const slides = hero.locator(tid(testIds.homeHeroSlide))
      .or(hero.locator('[class*="slide"], li, [role="group"]'));
    expect(await slides.count()).toBeGreaterThanOrEqual(HOME_HERO.minSlides);
  });

  test('HIGH-HOME-AMAZING-OFFERS-001 — Amazing-offers carousel renders with at least one card', async ({ page }) => {
    await page.goto(HOME_URL.homePath, { waitUntil: 'domcontentloaded' });
    await waitForSpinner(page);

    const section = homeAmazingOffers(page);
    await expect(section).toBeVisible();
    await expect(section.getByText(HOME_AMAZING_OFFERS.headingPattern).first()).toBeVisible();

    const cards = section.locator(tid(testIds.homeAmazingOffersCard))
      .or(section.locator('a[href*="/product/"]'));
    expect(await cards.count()).toBeGreaterThanOrEqual(HOME_AMAZING_OFFERS.minCards);

    // Currency label must appear at least once inside the section.
    await expect(section.getByText(HOME_COPY.currency).first()).toBeVisible();
  });

  test('HIGH-HOME-PRODUCT-CAROUSEL-001 — At least one category carousel renders cards and a view-all link', async ({ page }) => {
    await page.goto(HOME_URL.homePath, { waitUntil: 'domcontentloaded' });
    await waitForSpinner(page);

    const carousels = homeProductCarousels(page);
    expect(await carousels.count()).toBeGreaterThanOrEqual(HOME_PRODUCT_CAROUSEL.minCarousels);

    const first = carousels.first();
    await first.scrollIntoViewIfNeeded();
    await expect(first).toBeVisible();

    const cards = first.locator(tid(testIds.homeProductCard))
      .or(first.locator('a[href*="/product/"]'));
    expect(await cards.count()).toBeGreaterThanOrEqual(HOME_PRODUCT_CAROUSEL.minCardsPerCarousel);
  });

  test('HIGH-HOME-FOOTER-001 — Footer renders columns and contact info', async ({ page }) => {
    await page.goto(HOME_URL.homePath, { waitUntil: 'domcontentloaded' });
    await waitForSpinner(page);

    const footer = siteFooter(page);
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();

    // Each column heading is asserted via Persian copy regex.
    await expect.soft(footer.getByText(HOME_COPY.footerColumnGuides)).toBeVisible();
    await expect.soft(footer.getByText(HOME_COPY.footerColumnServices)).toBeVisible();
    await expect.soft(footer.getByText(HOME_COPY.footerColumnAbout)).toBeVisible();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Medium-priority scenarios
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Digikala — Homepage (Medium)', () => {

  test('MED-HOME-MOBILE-LAYOUT-001 — Mobile viewport has no horizontal scroll', async ({ page }) => {
    await page.setViewportSize(HOME_VIEWPORTS.mobile);
    await page.goto(HOME_URL.homePath, { waitUntil: 'domcontentloaded' });
    await waitForSpinner(page);

    const { clientWidth, scrollWidth } = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
  });

  test('MED-HOME-RTL-001 — Document direction is RTL', async ({ page }) => {
    await page.goto(HOME_URL.homePath, { waitUntil: 'domcontentloaded' });
    await waitForSpinner(page);

    const direction = await page.evaluate(() =>
      getComputedStyle(document.documentElement).direction
      || document.documentElement.getAttribute('dir')
      || getComputedStyle(document.body).direction,
    );
    expect(direction).toBe('rtl');
  });
});
