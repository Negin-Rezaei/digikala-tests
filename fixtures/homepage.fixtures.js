// @js-check

/**
 * Homepage fixtures — single source of truth for the Digikala storefront homepage suite.
 *
 * Derived from:
 *   - openspec/specs/storefront-test-suite/homepage/homepage.spec.md
 *   - openspec/specs/storefront-test-suite/homepage/testid-mapping.md
 *
 * Layering rule:
 *   - .spec.md SAYS WHAT (business language only — never reference FIXTURE.foo.bar)
 *   - this file SAYS WITH WHAT (raw data + URL contract + Persian copy regex + viewports)
 *   - tests/storefront/homepage/*.spec.js BRIDGES the two (uses these fixtures + waitForSpinner)
 */

// ─────────────────────────────────────────────────────────────────────────────
// 1. URL contract
// ─────────────────────────────────────────────────────────────────────────────
export const HOME_URL = {
  homePath: '/',
  cartPath: '/cart/',
  authPath: '/users/login-register/',
  // Search result page contract — used by CRIT-HOME-LOGO-NAV-001 to bounce
  // away from the homepage before clicking the logo.
  searchPath: (q) => `/search/?q=${encodeURIComponent(q)}`,
  // Any product detail URL on Digikala matches this shape.
  pdpPathRegex: /\/product\/dkp-\d+/u,
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. Root categories
//   Canonical Digikala root categories used by CRIT-HOME-CATEGORY-MENU-001.
//   `slug` is best-known guess; `label` is taken verbatim from the live menu.
//   The mega-menu often groups these slightly differently, so the assertion
//   only requires at-least-these to be present.
// ─────────────────────────────────────────────────────────────────────────────
export const HOME_ROOT_CATEGORIES = [
  { slug: 'mobile-phone',      label: 'موبایل'              },
  { slug: 'digital-goods',     label: 'کالای دیجیتال'       },
  { slug: 'vehicles',          label: 'خودرو و موتورسیکلت'  },
  { slug: 'beauty-and-personal-care', label: 'آرایشی و بهداشتی' },
  { slug: 'apparel',           label: 'مد و پوشاک'          },
  { slug: 'home-and-kitchen',  label: 'خانه و آشپزخانه'      },
];

// ─────────────────────────────────────────────────────────────────────────────
// 3. Hero slider
// ─────────────────────────────────────────────────────────────────────────────
export const HOME_HERO = {
  minSlides: 1,
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. Amazing offers
// ─────────────────────────────────────────────────────────────────────────────
export const HOME_AMAZING_OFFERS = {
  minCards: 1,
  headingPattern: /شگفت[‌\s]*انگیز/u,
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. Product carousels
// ─────────────────────────────────────────────────────────────────────────────
export const HOME_PRODUCT_CAROUSEL = {
  minCarousels: 1,
  minCardsPerCarousel: 1,
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. Persian copy
// ─────────────────────────────────────────────────────────────────────────────
export const HOME_COPY = {
  // Brand / header
  brandName:            /دیجی[‌\s]*کالا/u,
  searchPlaceholder:    /^\s*جستجو/u,
  loginCta:             /ورود\s*\|\s*ثبت[‌\s]*نام/u,
  categoryTrigger:      /دسته[‌\s]*بندی\s*کالاها/u,
  cartLabel:            /سبد\s*خرید/u,
  amazingOffersHeading: /شگفت[‌\s]*انگیز/u,
  currency:             /تومان/u,
  viewAllLink:          /مشاهده\s*همه/u,
  // Footer
  footerColumnGuides:   /راهنمای\s*خرید/u,
  footerColumnServices: /خدمات\s*مشتریان/u,
  footerColumnAbout:    /با\s*دیجی[‌\s]*کالا/u,
  // Cart empty state
  cartEmptyState:       /سبد\s*خرید\s*شما\s*خالی\s*است/u,
};

// ─────────────────────────────────────────────────────────────────────────────
// 7. Viewports (MED-HOME-MOBILE-LAYOUT-001)
// ─────────────────────────────────────────────────────────────────────────────
export const HOME_VIEWPORTS = {
  mobile:  { width: 375,  height: 812 },
  tablet:  { width: 768,  height: 1024 },
  desktop: { width: 1366, height: 900 },
  mdBreakpointPx: 768,
  lgBreakpointPx: 1024,
};

// ─────────────────────────────────────────────────────────────────────────────
// 8. Convenience aggregate
// ─────────────────────────────────────────────────────────────────────────────
export const HOME = {
  url:             HOME_URL,
  rootCategories:  HOME_ROOT_CATEGORIES,
  hero:            HOME_HERO,
  amazingOffers:   HOME_AMAZING_OFFERS,
  productCarousel: HOME_PRODUCT_CAROUSEL,
  copy:            HOME_COPY,
  viewports:       HOME_VIEWPORTS,
};
