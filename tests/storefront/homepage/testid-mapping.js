// @js-check

/**
 * Homepage testid contract — keep in lockstep with
 * openspec/specs/storefront-test-suite/homepage/testid-mapping.md
 *
 * Each `data-testid` is referenced via tid() so locators read naturally:
 *   page.locator(tid(testIds.headerLogo))
 */

export const testIds = {
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
  homeProductCard:            'home-product-card',
  homeProductViewAll:         'home-product-view-all',

  siteFooter:                 'site-footer',
  footerColumns:              'footer-columns',
  footerColumn:               (name) => `footer-column-${name}`,
  footerTrustBadges:          'footer-trust-badges',
  footerContact:              'footer-contact',
};

/**
 * Build a CSS attribute selector for a given testid.
 */
export const tid = (value) => `[data-testid="${value}"]`;
