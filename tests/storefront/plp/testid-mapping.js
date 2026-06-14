// @js-check

export const testIds = {
  plpRoot:                'plp-root',

  plpBreadcrumb:          'plp-breadcrumb',
  plpBreadcrumbItem:      'plp-breadcrumb-item',

  plpTitle:               'plp-title',

  plpSortBar:             'plp-sort-bar',
  plpSortOption:          (slug) => `plp-sort-option-${slug}`,
  plpActiveSort:          'plp-active-sort',

  plpFilterSidebar:       'plp-filter-sidebar',
  plpFilterGroup:         (slug) => `plp-filter-group-${slug}`,
  plpFilterToggle:        (slug) => `plp-filter-toggle-${slug}`,
  plpFilterClear:         'plp-filter-clear',
  plpAvailableOnlyToggle: 'plp-available-only-toggle',

  plpGrid:                'plp-grid',
  plpCard:                'plp-card',
  plpCardTitle:           'plp-card-title',

  plpPagination:          'plp-pagination',
  plpNextPage:            'plp-next-page',

  plpEmptyState:          'plp-empty-state',
};

export const tid = (value) => `[data-testid="${value}"]`;
