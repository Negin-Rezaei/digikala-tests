# PLP (Product List Page) — End-to-End Test Scenarios

Target: [https://www.digikala.com/](https://www.digikala.com/) — Iran's largest online marketplace.

The PLP is the storefront's category landing page (e.g. `/main/mobile-phone/`). It is also reused as the search results page when the user submits a query (`/search/?q=…`). Scope here is the category PLP; search behaviour lives in `../search/search.spec.md`.

---

**Architecture summary:**

1. **Breadcrumb** — `صفحه نخست / موبایل / گوشی موبایل` style trail at the top.
2. **Page title** — the category heading، e.g. «گوشی موبایل».
3. **Filter sidebar** — collapsible filter groups (دسته‌بندی، برند، قیمت، رنگ، وضعیت کالا، فروش ویژه، …) with toggles and sliders.
4. **Sort bar** — sort options «پربازدیدترین، جدیدترین، گران‌ترین، ارزان‌ترین، پرفروش‌ترین، محبوب‌ترین».
5. **Product grid** — responsive grid of product cards (image، title، price، currency «تومان»، seller / rating chips).
6. **Pagination / infinite scroll** — load more pages of results.
7. **Empty / loading states** — skeleton during fetch، empty-state message if filters collapse the result set to zero.

---

**Shared preconditions:**

- The user starts on the published PLP URL with a clean browser session unless the scenario states otherwise.
- The canonical category used by these scenarios is «گوشی موبایل» under the path `/main/mobile-phone/`.

---

## 1. Critical Scenarios

`بارگذاری صفحه دسته‌بندی بدون خطا`
### CRIT-PLP-LOAD-001 — PLP renders breadcrumb, title, filter sidebar, sort bar, and at least one product card
- **GIVEN** the user opens the canonical category PLP URL
- **WHEN** the page finishes loading
- **THEN** the breadcrumb، the page title، the filter sidebar، the sort bar، and at least one product card are all visible
- **Status:** [ ] Pending  [ ] Pass  [ ] Fail
- **Notes:** _________________


`رفتن از کارت محصول به صفحه PDP`
### CRIT-PLP-CARD-CLICK-001 — Clicking a product card opens the product detail page
- **GIVEN** the PLP is loaded with at least one product card
- **WHEN** the user clicks the first product card
- **THEN** the browser navigates to a `/product/dkp-…/` URL and the PDP main image is visible
- **Status:** [ ] Pending  [ ] Pass  [ ] Fail
- **Notes:** _________________


`اعمال مرتب‌سازی و بازچینش کارت‌ها`
### CRIT-PLP-SORT-001 — Changing the sort option triggers a re-fetch and the grid updates
- **GIVEN** the PLP is loaded with at least one product card
- **WHEN** the user picks a non-default sort option (e.g. «ارزان‌ترین»)
- **THEN** the URL acquires a sort query parameter، the active sort chip reflects the chosen option، and the product grid re-renders with at least one card after the request completes
- **Status:** [ ] Pending  [ ] Pass  [ ] Fail
- **Notes:** _________________


`اعمال فیلتر کالاهای موجود`
### CRIT-PLP-FILTER-AVAILABLE-001 — Toggling the "in-stock" / "available" filter narrows the result set without erasing the grid
- **GIVEN** the PLP is loaded with at least one product card
- **WHEN** the user toggles the «فقط کالاهای موجود» filter
- **THEN** the URL acquires the corresponding filter parameter، and the product grid re-renders with at least one product card (or an empty-state if the filter yields zero results)
- **Status:** [ ] Pending  [ ] Pass  [ ] Fail
- **Notes:** _________________


`پاکسازی فیلترهای فعال`
### CRIT-PLP-FILTER-RESET-001 — "Clear filters" removes every active filter from the URL
- **GIVEN** the user has applied at least one filter on the PLP
- **WHEN** the user clicks the «حذف فیلترها» button (or equivalent)
- **THEN** every filter parameter is removed from the URL، and the product grid re-renders the unfiltered result set
- **Status:** [ ] Pending  [ ] Pass  [ ] Fail
- **Notes:** _________________


## 2. High-priority scenarios

`نمایش breadcrumb مسیر دسته‌بندی`
### HIGH-PLP-BREADCRUMB-001 — Breadcrumb shows «صفحه نخست» as the first crumb and the category name as the leaf
- **GIVEN** the PLP is loaded
- **WHEN** the user reads the breadcrumb row
- **THEN** the first crumb is «صفحه نخست»، the leaf crumb is the category name (e.g. «موبایل» or «گوشی موبایل»)، and clicking «صفحه نخست» navigates the user back to `/`
- **Status:** [ ] Pending  [ ] Pass  [ ] Fail
- **Notes:** _________________


`بارگذاری صفحه بعدی محصولات`
### HIGH-PLP-PAGINATION-001 — The user can advance to additional pages of products
- **GIVEN** the PLP is loaded and the result set spans more than one page (`نتایج بیشتر` / next page control visible)
- **WHEN** the user scrolls to the bottom of the grid and triggers the next page (either via «صفحه بعد» button or infinite scroll)
- **THEN** additional product cards are appended (infinite scroll) OR the URL acquires `page=2` and a new set of cards is rendered (paginated)
- **Status:** [ ] Pending  [ ] Pass  [ ] Fail
- **Notes:** _________________


`نمایش حالت خالی پس از اعمال فیلتر سخت‌گیرانه`
### HIGH-PLP-EMPTY-FILTER-001 — Highly restrictive filters render the empty-state without crashing the grid
- **GIVEN** the PLP is loaded
- **WHEN** the user applies a combination of filters known to yield zero results (e.g. an unrealistic price band)
- **THEN** an empty-state message is rendered (e.g. «نتیجه‌ای یافت نشد»)، and the filter sidebar remains interactive so the user can broaden the filters again
- **Status:** [ ] Pending  [ ] Pass  [ ] Fail
- **Notes:** _________________
