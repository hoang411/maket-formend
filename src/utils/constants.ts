export const APP_NAME = 'Supermarket Online';

export const API_TIMEOUT = 15000;

export const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_PER_PAGE: 10,
    PER_PAGE_OPTIONS: [10, 20, 50, 100]
};

export const FILE = {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif'],
    MAX_FILES: 5
};

export const USER_ROLES = {
    ADMIN: 'admin',
    USER: 'user'
} as const;

export const ORDER_STATUS = {
    PENDING: 'pending',
    PROCESSING: 'processing',
    SHIPPING: 'shipping',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled'
} as const;

export const PAYMENT_METHODS = {
    COD: 'cod',
    BANK_TRANSFER: 'bank_transfer',
    E_WALLET: 'e_wallet'
} as const;

export const TOAST_DURATION = 3000;

export const LOCAL_STORAGE_KEYS = {
    TOKEN: 'token',
    USER: 'user',
    CART: 'cart',
    THEME: 'theme'
} as const;