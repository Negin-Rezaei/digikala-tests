# Search — End-to-End Test Scenarios

Target: [https://www.digikala.com/](https://www.digikala.com/) — Iran's largest online marketplace.

Scope is strictly user-facing E2E behaviour. Backend / API / database internals are excluded.

---

**Architecture summary:**

1. **Search input** — placeholder «جستجو»، always present in the storefront header.
2. **Suggestions dropdown** — opens as the user types، may list keyword suggestions، recent searches، popular searches، or product previews.
3. **Submit** — pressing Enter or clicking the search icon navigates to the search results URL (`/search/?q=<query>`).
4. **Search results page (SRP)** — renders the query string، the active filters، the product grid، sort options، and pagination.
5. **Empty-state** — when the query has no matches، the page renders an empty-state message like «نتیجه‌ای یافت نشد».

---

**Shared preconditions:**

- The user starts on `/` with a clean browser session unless the scenario states otherwise.
- Persian digits and the currency label «تومان» appear in product prices on the results page.

---

## 1. Critical Scenarios

`نمایش جعبه جستجو در هدر`
### CRIT-SEARCH-INPUT-001 — Search input is visible and focusable in the header
- **GIVEN** the user is on the homepage
- **WHEN** the user inspects the header
- **THEN** the search input is visible، carries the «جستجو» placeholder، and gains focus when clicked
- **Status:** [ ] Pending  [ ] Pass  [ ] Fail
- **Notes:** _________________


`نمایش پیشنهادهای جستجو با شروع تایپ`
### CRIT-SEARCH-SUGGESTIONS-001 — Typing a non-empty query opens the suggestions dropdown
- **GIVEN** the search input is focused
- **WHEN** the user types a multi-character query (e.g. «گوشی»)
- **THEN** a suggestions panel opens beneath the input، rendering at least one suggestion entry (keyword، recent، popular، or product preview)
- **Status:** [ ] Pending  [ ] Pass  [ ] Fail
- **Notes:** _________________


`ثبت جستجو با Enter و رفتن به صفحه نتایج`
### CRIT-SEARCH-SUBMIT-ENTER-001 — Pressing Enter navigates to the SRP with the query in the URL
- **GIVEN** the user has typed «گوشی» in the search input
- **WHEN** the user presses Enter
- **THEN** the browser navigates to a search URL that contains the encoded query (e.g. `/search/?q=گوشی`)، and the page heading or query chip echoes the query
- **Status:** [ ] Pending  [ ] Pass  [ ] Fail
- **Notes:** _________________


`نمایش حداقل یک نتیجه برای کوئری معتبر`
### CRIT-SEARCH-RESULTS-RENDER-001 — A common query returns at least one product card
- **GIVEN** the user has submitted the query «گوشی» from the homepage
- **WHEN** the SRP finishes loading
- **THEN** at least one product card is rendered in the results grid، each with a title، a price، and the currency label «تومان»
- **Status:** [ ] Pending  [ ] Pass  [ ] Fail
- **Notes:** _________________


`نمایش حالت «نتیجه‌ای یافت نشد» برای کوئری بی‌نتیجه`
### CRIT-SEARCH-EMPTY-001 — A nonsense query renders the empty-state message
- **GIVEN** the user is on the homepage
- **WHEN** the user submits the query «zzqqwwxxnomatch12345»
- **THEN** the SRP loads with an empty-state message such as «نتیجه‌ای یافت نشد» or «کالایی مطابق با جست‌و‌جوی شما پیدا نشد»، and no product cards are rendered
- **Status:** [ ] Pending  [ ] Pass  [ ] Fail
- **Notes:** _________________


## 2. High-priority scenarios

`پاکسازی کوئری با دکمه clear`
### HIGH-SEARCH-CLEAR-001 — Typed query can be cleared back to empty
- **GIVEN** the user has typed «گوشی» but not submitted
- **WHEN** the user clears the input (Ctrl/Cmd+A then Delete، or clicks the clear button if present)
- **THEN** the input value is empty and the suggestions dropdown collapses
- **Status:** [ ] Pending  [ ] Pass  [ ] Fail
- **Notes:** _________________


`رفتن به PDP با کلیک روی نتیجه`
### HIGH-SEARCH-RESULT-CLICK-001 — Clicking a result card opens the product detail page
- **GIVEN** the SRP for «گوشی» is loaded with at least one result
- **WHEN** the user clicks the first product card
- **THEN** the browser navigates to a product detail URL matching `/product/dkp-…/`
- **Status:** [ ] Pending  [ ] Pass  [ ] Fail
- **Notes:** _________________


`حفظ کوئری در URL پس از رفرش`
### HIGH-SEARCH-URL-PERSIST-001 — Search query persists across page refresh
- **GIVEN** the SRP for «گوشی» is loaded
- **WHEN** the user reloads the page
- **THEN** the URL still contains the encoded query and the same query string is echoed in the page header/chip
- **Status:** [ ] Pending  [ ] Pass  [ ] Fail
- **Notes:** _________________
