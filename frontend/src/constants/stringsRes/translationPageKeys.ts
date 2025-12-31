export const PAGE_KEYS = {
  COMMON: 'common',
  AUTH: 'auth',
  NAVIGATION: 'navigation',
  DASHBOARD: 'dashboard',
  ORDERS: 'orders',
  PRODUCTS: 'products',
  ERRORS: 'errors',
} as const;

export type PageKey = (typeof PAGE_KEYS)[keyof typeof PAGE_KEYS];

