// @js-check

/**
 * PLP fixtures — single source of truth for the Digikala storefront PLP suite.
 *
 * Derived from:
 *   - openspec/specs/storefront-test-suite/plp/plp.spec.md
 *   - openspec/specs/storefront-test-suite/plp/testid-mapping.md
 */

// ─────────────────────────────────────────────────────────────────────────────
// 1. URL contract
// ─────────────────────────────────────────────────────────────────────────────
export const PLP_URL = {
  homePath: '/',
  // Canonical category used by every PLP scenario.
  canonicalCategoryPath: '/main/mobile-phone/',
  canonicalCategoryLabel: /گوشی\s*موبایل|موبایل/u,
  // Sort param keys produced by clicking the sort options.
  sortQueryKey: 'sort',
  // PDP URL shape produced by clicking a card.
  pdpPathRegex: /\/product\/dkp-\d+/u,
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. Sort options
//   Slug values follow Digikala's documented `sort` query values. Labels are
//   taken from the live UI.
// ─────────────────────────────────────────────────────────────────────────────
export const PLP_SORT_OPTIONS = [
  { slug: '4',  label: 'پربازدیدترین' },
  { slug: '1',  label: 'جدیدترین'     },
  { slug: '7',  label: 'پرفروش‌ترین'   },
  { slug: '20', label: 'ارزان‌ترین'    },
  { slug: '21', label: 'گران‌ترین'     },
  { slug: '22', label: 'محبوب‌ترین'    },
];

// Default sort the live page lands on if the URL has no `sort` parameter.
export const PLP_DEFAULT_SORT_SLUG = '4';

// Canonical sort option used by CRIT-PLP-SORT-001.
export const PLP_SAMPLE_SORT = PLP_SORT_OPTIONS.find((s) => s.label.includes('ارزان'));

// ─────────────────────────────────────────────────────────────────────────────
// 3. Filter contract
// ─────────────────────────────────────────────────────────────────────────────
export const PLP_FILTER = {
  availableOnly: {
    label: /فقط\s*کالاهای\s*موجود/u,
    // Digikala uses several different param keys for "in stock only" across
    // releases; the regex tolerates the common variants.
    urlParamRegex: /(only_fresh_products|has_selling_stock|stock|status)=/u,
  },
  priceRange: {
    label: /محدوده\s*قیمت/u,
  },
  brand: {
    label: /برند/u,
  },
  clearFiltersLabel: /حذف\s*فیلترها|پاک\s*کردن\s*فیلترها/u,
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. Persian copy
// ─────────────────────────────────────────────────────────────────────────────
export const PLP_COPY = {
  breadcrumbHome: /صفحه\s*نخست/u,
  currency:       /تومان/u,
  emptyState:     /(نتیجه[‌\s]*ای\s*یافت\s*نشد|کالایی\s*مطابق\s*با\s*جست[‌\s]*و[‌\s]*جوی\s*شما\s*پیدا\s*نشد)/u,
  nextPageLabel:  /صفحه\s*بعد|بعدی/u,
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. Counts / thresholds
// ─────────────────────────────────────────────────────────────────────────────
export const PLP_COUNTS = {
  minCardsOnFirstPage: 1,
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. Convenience aggregate
// ─────────────────────────────────────────────────────────────────────────────
export const PLP = {
  url:           PLP_URL,
  sortOptions:   PLP_SORT_OPTIONS,
  defaultSort:   PLP_DEFAULT_SORT_SLUG,
  sampleSort:    PLP_SAMPLE_SORT,
  filter:        PLP_FILTER,
  copy:          PLP_COPY,
  counts:        PLP_COUNTS,
};
