// @js-check

/**
 * Homepage testid + locator contract — keep in lockstep with
 * openspec/specs/storefront-test-suite/homepage/testid-mapping.md
 *
 * Reality of the live DOM (verified against a homepage snapshot):
 *   Only four `data-testid` attributes are actually emitted by the page —
 *   `product-card`, `price-final`, `price-no-discount`, `price-discount-percent`.
 *   Everything else has to be reached through other stable hooks:
 *     1. `data-cro-id` — analytics attribute attached to every meaningful
 *        interactive element. Very stable across builds.
 *     2. A unique `id` (only the fixed header has one: `base_layout_desktop_fixed_header`).
 *     3. A CSS-module class with a stable prefix + volatile hash suffix, reached
 *        via `[class*="<Prefix>__"]` substring matching.
 *     4. Role + Persian text via `getByRole` / `getByText` in the spec file.
 *
 * `testIds` keeps the *intended* contract (so future requests to the frontend
 * team are easy to track). `selectors` holds the *working* selector strings
 * that tests should rely on today.
 */

export const testIds = {
  // ── Implemented in the live DOM ────────────────────────────────────────────
  homeProductCard:            'product-card',
  homeProductCardPriceFinal:  'price-final',
  homeProductCardPriceNoDiscount: 'price-no-discount',
  homeProductCardDiscountPct: 'price-discount-percent',

  // ── Requested but NOT yet emitted — fall back to `selectors.*` below ──────
  siteHeader:                 'site-header',
  headerLogo:                 'header-logo',
  headerSearchInput:          'header-search-input',
  headerLoginCta:             'header-login-cta',
  headerAccountAvatar:        'header-account-avatar',
  headerCartIcon:             'header-cart-icon',
  headerCartBadge:            'header-cart-badge',
  headerCategoryTrigger:      'header-category-trigger',
  headerCategoryMenu:         'header-category-menu',
  headerCategoryItem:         (slug) => `header-category-item-${slug}`,

  homeHero:                   'home-hero',
  homeHeroSlide:              'home-hero-slide',
  homeHeroDots:               'home-hero-dots',

  homeQuickServices:          'home-quick-services',

  homeAmazingOffers:          'home-amazing-offers',
  homeAmazingOffersCard:      'home-amazing-offers-card',

  homeProductCarousel:        'home-product-carousel',
  homeProductCarouselHeading: 'home-product-carousel-heading',
  homeProductViewAll:         'home-product-view-all',

  siteFooter:                 'site-footer',
  footerColumns:              'footer-columns',
  footerColumn:               (name) => `footer-column-${name}`,
  footerTrustBadges:          'footer-trust-badges',
  footerContact:              'footer-contact',
};

/**
 * Working selector strings for the real DOM. Each entry is a CSS selector
 * string ready for `page.locator(...)`. Entries set to `null` are not
 * rendered in the anonymous / empty-cart / closed-menu states and must be
 * handled with `test.skip(...)` when absent.
 */
export const selectors = {
  // Header ────────────────────────────────────────────────────────────────────
  siteHeader:            '#base_layout_desktop_fixed_header',
  headerLogo:            '[data-cro-id="header-digikala-logo"]',
  headerSearchInput:     'input[name="search-input"]',
  headerLoginCta:        'a[href^="/users/login/"]',
  headerAccountAvatar:   null,
  headerCartIcon:        '[data-cro-id="header-cart"]',
  headerCartBadge:       null,
  headerCategoryTrigger: '[data-cro-id="header-main-menu"]',
  headerCategoryMenu:    '[class*="BaseLayoutDesktopHeaderNavigation__megaMenuContainer__"]',

  // Hero ──────────────────────────────────────────────────────────────────────
  homeHero:      '[class*="MainHomeTopSlider__"]:not([class*="Item"]):not([class*="pagination"]):not([class*="navigator"]):not([class*="arrow"])',
  homeHeroSlide: 'a[class*="MainHomeTopSliderItem__widget__"]',
  homeHeroDots:  '[class*="MainHomeTopSlider__pagination__"]',

  // Quick services row ────────────────────────────────────────────────────────
  homeQuickServices: 'div:has(> [data-cro-id="hp-more-ventures"])',

  // Amazing offers ────────────────────────────────────────────────────────────
  homeAmazingOffers:      '[class*="AmazingCarousel__"]',
  homeAmazingOffersCard:  '[class*="AmazingCarousel__"] [data-testid="product-card"]',

  // Product carousels (generic — not present in the captured snapshot) ────────
  homeProductCarousel:        null,
  homeProductCarouselHeading: 'h3.text-h3',
  homeProductCard:            '[data-testid="product-card"]',
  homeProductViewAll:         '[data-cro-id="hp-amazing-see-all"]',

  // Footer ────────────────────────────────────────────────────────────────────
  siteFooter:        'footer',
  footerColumns:     'footer :has(> a[data-cro-id="footer-with-digikala"])',
  footerTrustBadges: 'a[href*="trustseal.enamad.ir"], a[href*="logo.samandehi.ir"]',
  footerContact:     '[data-cro-id="footer-phonenumber"]',
};

/**
 * Known URL paths emitted by the homepage. Two of these differ from the
 * documented contract: cart is mounted under `/checkout/cart/` (not `/cart/`)
 * and the auth flow lives at `/users/login/` (not `/users/login-register/`).
 */
export const paths = {
  cart:  '/checkout/cart/',
  login: '/users/login/',
};

/**
 * Build a CSS attribute selector for a given testid value.
 */
export const tid = (value) => `[data-testid="${value}"]`;
