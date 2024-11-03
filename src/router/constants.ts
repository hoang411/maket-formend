export const ROUTE_NAMES = {
    // Public
    HOME: 'home',
    PRODUCTS: 'products',
    CART: 'cart',
    CHECKOUT: 'checkout',
    PROFILE: 'profile',
    ORDERS: 'orders',
    ORDER_DETAIL: 'order-detail',

    // Auth
    LOGIN: 'login',
    REGISTER: 'register',
    FORGOT_PASSWORD: 'forgot-password',
    RESET_PASSWORD: 'reset-password',
} as const;

export const ROUTE_PATHS = {
    // Public
    HOME: '/',
    PRODUCTS: '/products',
    CART: '/cart',
    CHECKOUT: '/checkout',
    PROFILE: '/profile',
    ORDERS: '/orders',
    ORDER_DETAIL: '/orders/:id',

    // Auth
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
} as const;