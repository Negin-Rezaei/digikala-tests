# Homepage — testid contract

Stable selectors for the Digikala homepage. These are **proposed** `data-testid` values; until the frontend wires them up, tests fall back to structural role / portal locators (see [feedback_playwright_testid_fallback]).

| Key                          | data-testid                       | Element                                              |
|------------------------------|-----------------------------------|------------------------------------------------------|
| `siteHeader`                 | `site-header`                     | `<header>` element wrapping the storefront chrome   |
| `headerLogo`                 | `header-logo`                     | Brand logo link («دیجی‌کالا»)                         |
| `headerSearchInput`          | `header-search-input`             | Search `<input>` in the header                       |
| `headerLoginCta`             | `header-login-cta`                | «ورود | ثبت‌نام» button (anonymous session)          |
| `headerAccountAvatar`        | `header-account-avatar`           | User avatar / account chip (authenticated session)   |
| `headerCartIcon`             | `header-cart-icon`                | Cart icon link                                       |
| `headerCartBadge`            | `header-cart-badge`               | Numeric badge on the cart icon                        |
| `headerCategoryTrigger`      | `header-category-trigger`         | «دسته‌بندی کالاها» mega-menu trigger                  |
| `headerCategoryMenu`         | `header-category-menu`            | Open mega-menu container                             |
| `headerCategoryItem(slug)`   | `header-category-item-<slug>`     | A single root-category link inside the mega-menu     |
| `homeHero`                   | `home-hero`                       | Hero slider section                                  |
| `homeHeroSlide`              | `home-hero-slide`                 | Individual hero slide                                 |
| `homeHeroDots`               | `home-hero-dots`                  | Pagination dot container                              |
| `homeQuickServices`          | `home-quick-services`             | Circular shortcuts row                                |
| `homeAmazingOffers`          | `home-amazing-offers`             | «شگفت‌انگیز» carousel section                         |
| `homeAmazingOffersCard`      | `home-amazing-offers-card`        | A single discounted product card                      |
| `homeProductCarousel`        | `home-product-carousel`           | Any "best of category" product carousel               |
| `homeProductCarouselHeading` | `home-product-carousel-heading`   | Heading of a category carousel                        |
| `homeProductCard`            | `home-product-card`               | A single product card inside any homepage carousel    |
| `homeProductViewAll`         | `home-product-view-all`           | «مشاهده همه» link inside a category carousel          |
| `siteFooter`                 | `site-footer`                     | `<footer>` element                                   |
| `footerColumns`              | `footer-columns`                  | Container of footer link columns                      |
| `footerColumn(name)`         | `footer-column-<name>`            | A single footer link column                          |
| `footerTrustBadges`          | `footer-trust-badges`             | Enamad / Samandehi badge container                    |
| `footerContact`              | `footer-contact`                  | Contact info block                                   |

Fallback rules (per [feedback_playwright_testid_fallback]):
- If the testid is not present on the live DOM, prefer `getByRole`, then a structural CSS that anchors on a stable attribute (href shape, `role`, etc.).
- Never anchor on prices، numeric digits، or transient marketing copy.
