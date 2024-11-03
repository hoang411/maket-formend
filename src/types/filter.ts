// src/types/filter.ts
export interface ProductFilter {
    keyword?: string;
    categoryId?: number;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
}

export interface OrderFilter {
    userId?: number;
    status?: OrderStatus;
    paymentStatus?: PaymentStatus;
    startDate?: Date;
    endDate?: Date;
}

export interface ReceiptFilter {
    partnerId?: number;
    status?: ReceiptStatus;
    startDate?: Date;
    endDate?: Date;
}

export interface InventoryFilter {
    status?: InventoryStatus;
    startDate?: Date;
    endDate?: Date;
}