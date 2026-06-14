# Homepage — End-to-End Test Scenarios

Target: [https://www.digikala.com/](https://www.digikala.com/) — Iran's largest online marketplace.

Scope is strictly user-facing E2E behaviour. Backend / API / database internals are excluded.

---

**Architecture summary (top → bottom):**

1. **Header** — logo «دیجی‌کالا»، search bar with placeholder «جستجو»، city/location selector، login CTA «ورود | ثبت‌نام» (or account avatar)، cart icon with item-count badge.
2. **Categories trigger** — button «دسته‌بندی کالاها» that opens a mega-menu listing every root category (دیجی‌کالا، موبایل، کالای دیجیتال، خودرو و موتورسیکلت، کالای اساسی خوراکی و رژیمی، …).
3. **DigiPlus promo strip** — banner promoting «دیجی‌پلاس» subscription.
4. **Hero slider** — multiple promotional slides with dot pagination and auto-advance.
5. **Quick services row** — circular shortcuts (دیجی‌پی، دیجی‌فای، فروشگاه دیجی‌کالا، …).
6. **Amazing offers («شگفت‌انگیز»)** — horizontally-scrolling carousel of discounted products with a countdown timer.
7. **Category product carousels** — multiple "best of category" rows, each with a heading and a "view all" link.
8. **Featured brand / promo banners** — large media banners linking into PLPs.
9. **Footer** — multi-column links (راهنمای خرید، خدمات مشتریان، با دیجی‌کالا، …)، contact info، newsletter signup، social icons، Enamad / Samandehi badges.

---

**Shared preconditions (apply to every scenario unless overridden):**

- The user starts on the published homepage URL `/` with a clean browser session unless the scenario states otherwise.
- All Persian text and digits are right-to-left; numeric thousands and prices use Persian digits and the «تومان» currency label everywhere on the page.
- Network is healthy unless the scenario explicitly targets a loading or error state.

---

## 1. Critical Scenarios

`بارگذاری کامل صفحه‌ی اصلی بدون خطا`
### CRIT-HOME-LOAD-001 — Homepage renders all primary sections in the documented order
- **GIVEN** the user opens the homepage URL on a desktop viewport (≥ 1024px)
- **WHEN** the page finishes its first meaningful paint
- **THEN** the following sections are visible top-to-bottom: header، categories trigger، hero slider، quick services row، amazing offers («شگفت‌انگیز»)، at least one category product carousel، footer with the legal/contact band
- **Status:** [ ] Pending  [ ] Pass  [ ] Fail
- **Notes:** _________________


`نمایش هدر و عناصر اصلی آن`
### CRIT-HOME-HEADER-001 — Header exposes logo, search box, login CTA, and cart icon
- **GIVEN** the homepage is loaded
- **WHEN** the user inspects the top of the page
- **THEN** the header displays the «دیجی‌کالا» logo، a visible search input، a «ورود | ثبت‌نام» button (or an account avatar if a session exists)، and a cart icon
- **Status:** [ ] Pending  [ ] Pass  [ ] Fail
- **Notes:** _________________


`بازگشت به صفحه اصلی با کلیک روی لوگو`
### CRIT-HOME-LOGO-NAV-001 — Clicking the header logo navigates back to the homepage from any inner page
- **GIVEN** the user has navigated to an inner page (e.g. an amazing-offers PLP) and the page has finished loading
- **WHEN** the user clicks the «دیجی‌کالا» logo in the header
- **THEN** the browser URL becomes `/` and the homepage hero slider is visible again
- **Status:** [ ] Pending  [ ] Pass  [ ] Fail
- **Notes:** _________________


`باز شدن منوی دسته‌بندی کالاها`
### CRIT-HOME-CATEGORY-MENU-001 — Categories trigger opens a mega-menu and lists root categories
- **GIVEN** the user is on the homepage
- **WHEN** the user hovers / clicks the «دسته‌بندی کالاها» trigger
- **THEN** a mega-menu opens، listing at least the canonical root categories (موبایل، کالای دیجیتال، خودرو و موتورسیکلت، آرایشی و بهداشتی، مد و پوشاک، خانه و آشپزخانه)، and dismissing the menu (Escape / click outside) closes it without navigating away
- **Status:** [ ] Pending  [ ] Pass  [ ] Fail
- **Notes:** _________________


`رفتن از صفحه اصلی به سبد خرید`
### CRIT-HOME-CART-NAV-001 — Clicking the cart icon opens the cart page
- **GIVEN** the user is on the homepage with an empty cart
- **WHEN** the user clicks the cart icon in the header
- **THEN** the URL navigates to the cart route (`/cart` or equivalent) and the empty-cart state «سبد خرید شما خالی است» is rendered
- **Status:** [ ] Pending  [ ] Pass  [ ] Fail
- **Notes:** _________________


`باز شدن صفحه‌ی ورود / ثبت‌نام از CTA هدر`
### CRIT-HOME-LOGIN-CTA-001 — Login CTA opens the auth flow
- **GIVEN** the user is on the homepage and has no active session
- **WHEN** the user clicks the «ورود | ثبت‌نام» button in the header
- **THEN** the auth modal or page is shown، with an input that accepts a mobile number and a submit button
- **Status:** [ ] Pending  [ ] Pass  [ ] Fail
- **Notes:** _________________


## 2. High-priority scenarios

`نمایش هیرو اسلایدر در بالای صفحه`
### HIGH-HOME-HERO-001 — Hero slider renders at least one slide and exposes navigation dots
- **GIVEN** the homepage is loaded on a desktop viewport
- **WHEN** the user looks below the header
- **THEN** the hero slider is visible، at least one slide is in the viewport، and pagination dots / arrows are present for navigation
- **Status:** [ ] Pending  [ ] Pass  [ ] Fail
- **Notes:** _________________


`نمایش بخش «شگفت‌انگیز» با حداقل یک کارت محصول`
### HIGH-HOME-AMAZING-OFFERS-001 — Amazing-offers carousel renders with at least one product card
- **GIVEN** the homepage is loaded
- **WHEN** the user scrolls to the «شگفت‌انگیز» section
- **THEN** the section heading is visible، and the carousel contains at least one product card with a discounted price and the currency label «تومان»
- **Status:** [ ] Pending  [ ] Pass  [ ] Fail
- **Notes:** _________________


`نمایش حداقل یک کاروسل محصولات دسته‌بندی`
### HIGH-HOME-PRODUCT-CAROUSEL-001 — At least one category product carousel renders with cards and a view-all link
- **GIVEN** the homepage is loaded
- **WHEN** the user scrolls past the amazing-offers section
- **THEN** at least one category product carousel is visible، with a heading، multiple product cards، and a «مشاهده همه» link
- **Status:** [ ] Pending  [ ] Pass  [ ] Fail
- **Notes:** _________________


`نمایش فوتر با ستون‌های لینک و اطلاعات تماس`
### HIGH-HOME-FOOTER-001 — Footer renders link columns, contact info, and trust badges
- **GIVEN** the homepage is loaded
- **WHEN** the user scrolls to the bottom of the page
- **THEN** the footer is visible، containing multiple link columns (راهنمای خرید، خدمات مشتریان، با دیجی‌کالا)، contact info، and the Enamad / Samandehi trust badges
- **Status:** [ ] Pending  [ ] Pass  [ ] Fail
- **Notes:** _________________


## 3. Medium-priority scenarios

`واکنش‌گرایی صفحه در ویوپورت موبایل`
### MED-HOME-MOBILE-LAYOUT-001 — Homepage adapts to a mobile viewport without horizontal scroll
- **GIVEN** the homepage is opened in a viewport narrower than 768px
- **WHEN** the page finishes loading
- **THEN** the layout reflows to a single column، the desktop categories trigger collapses into a mobile menu، and the document body has no horizontal scrollbar
- **Status:** [ ] Pending  [ ] Pass  [ ] Fail
- **Notes:** _________________


`جهت‌گیری راست به چپ صفحه`
### MED-HOME-RTL-001 — Document direction is RTL
- **GIVEN** the homepage is loaded
- **WHEN** the test reads `dir` on `<html>` (or computed `direction` of `<body>`)
- **THEN** the value is `rtl`
- **Status:** [ ] Pending  [ ] Pass  [ ] Fail
- **Notes:** _________________
