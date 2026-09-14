export const ROUTES = {
  HOME: '/',
  CART: '/cart',
  FAVORITES: '/favorites',
  PRODUCT_DETAILS: (id: string) => `/product/${id}`,
} as const;
