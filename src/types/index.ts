// src/types/index.ts
export * from './user';
export * from './product';
export * from './order';
export * from './receipt';
export * from './category';
export * from './partner';
export * from './inventory';
export * from './comment';
export * from './common';

// src/types/common.ts
export interface PaginationParams {
    page: number;
    limit: number;
    sort?: string;
    order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
    data: T[];
    totalPages: number;
    currentPage: number;
    pageSize: number;
}

export interface ApiResponse<T = any> {
    statusCode: number;
    message: string;
    data?: T;
}

// src/types/user.ts
export interface User {
    id: number;
    email: string;
    phoneNumber: string;
    address: string;
    dateOfBirth: Date;
    fullName: string;
    avatar?: string;
    role: UserRole;
}

export type UserRole = 'ADMIN' | 'USER' | 'WAREHOUSE' | 'SALES';

export interface LoginDTO {
    phoneNumber: string;
    password: string;
}

export interface UserDTO {
    email: string;
    password: string;
    phoneNumber: string;
    address: string;
    dateOfBirth: Date;
    fullName: string;
}

export interface UpdateUserDTO {
    email?: string;
    fullName?: string;
    dateOfBirth?: Date;
    address?: string;
}

export interface UpdatePasswordDTO {
    password: string;
    newPassword: string;
}

// src/types/product.ts
export interface Product {
    id: number;
    productName: string;
    price: number;
    unit: string;
    categoryId: number;
    description?: string;
    quantity: number;
    images: ProductImage[];
    category?: Category;
}

export interface ProductImage {
    id: number;
    productId: number;
    imageUrl: string;
}

export interface ProductDTO {
    productName: string;
    price: number;
    unit: string;
    categoryId: number;
    description?: string;
    quantity: number;
}

// src/types/order.ts
export interface Order {
    id: number;
    userId: number;
    user?: User;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
    status: OrderStatus;
    shippingAddress: string;
    shippingDate: Date;
    totalAmount: number;
    orderDetails: OrderDetail[];
    createdAt: Date;
    updatedAt: Date;
}

export interface OrderDetail {
    id: number;
    orderId: number;
    productId: number;
    product?: Product;
    numberOfProducts: number;
    price: number;
}

export type PaymentMethod = 'COD' | 'BANK_TRANSFER' | 'MOMO' | 'VNPAY';
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED';
export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPING' | 'DELIVERED' | 'CANCELLED';

export interface OrderDTO {
    userId: number;
    paymentMethod: PaymentMethod;
    shippingAddress: string;
    shippingDate: Date;
    orderDetails: OrderDetailDTO[];
}

export interface OrderDetailDTO {
    productId: number;
    numberOfProducts: number;
}

// Tiếp tục với các types khác...