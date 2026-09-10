export const ROUTES = {
  HOME: '/',
  CART: '/cart',
  FAVORITES: '/favorites',
  PRODUCT_DETAILS: (id: string) => `/product/${id}`,
} as const;

export type AppRoute = (typeof ROUTES)[keyof Omit<typeof ROUTES, 'PRODUCT_DETAILS'>];
