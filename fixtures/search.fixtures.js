// @js-check

/**
 * Search fixtures — single source of truth for the Digikala storefront search suite.
 *
 * Derived from:
 *   - openspec/specs/storefront-test-suite/search/search.spec.md
 *   - openspec/specs/storefront-test-suite/search/testid-mapping.md
 */

// ─────────────────────────────────────────────────────────────────────────────
// 1. URL contract
// ─────────────────────────────────────────────────────────────────────────────
export const SEARCH_URL = {
  homePath: '/',
  // Submit lands on /search/?q=<query>. Some app variants use /search/ without
  // a trailing slash; the regex tolerates both.
  resultsPathRegex: /\/search\/?\?q=[^&]+/u,
  pdpPathRegex:     /\/product\/dkp-\d+/u,
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. Sample queries
// ─────────────────────────────────────────────────────────────────────────────
export const SEARCH_QUERIES = {
  popular:    'گوشی',
  popularEn:  'iphone',
  noResults:  'zzqqwwxxnomatch12345',
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. Persian copy
// ─────────────────────────────────────────────────────────────────────────────
export const SEARCH_COPY = {
  searchPlaceholder:  /^\s*جستجو/u,
  resultsHeading:     /نتایج|نتیجه/u,
  emptyState:         /(نتیجه[‌\s]*ای\s*یافت\s*نشد|کالایی\s*مطابق\s*با\s*جست[‌\s]*و[‌\s]*جوی\s*شما\s*پیدا\s*نشد)/u,
  currency:           /تومان/u,
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. Suggestions contract
// ─────────────────────────────────────────────────────────────────────────────
export const SEARCH_SUGGESTIONS = {
  minTypedChars: 2,
  minSuggestions: 1,
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. Convenience aggregate
// ─────────────────────────────────────────────────────────────────────────────
export const SEARCH = {
  url:         SEARCH_URL,
  queries:     SEARCH_QUERIES,
  copy:        SEARCH_COPY,
  suggestions: SEARCH_SUGGESTIONS,
};
