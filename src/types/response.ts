// src/types/response.ts
export interface LoginResponse {
    token: string;
    user: User;
}

export interface ProductResponse extends Product {
    averageRating: number;
    totalComments: number;
    isInStock: boolean;
}

export interface ProductListResponse {
    products: ProductResponse[];
    totalPages: number;
    currentPage: number;
    pageSize: number;
}

export interface OrderResponse extends Order {
    customerName: string;
    customerPhone: string;
    totalItems: number;
}

export interface SalesOrderResponse extends OrderResponse {
    profit: number;
    salesPerson?: User;
}

export interface ReceiptResponse extends Receipt {
    supplierName: string;
    warehouseStaff?: User;
    totalItems: number;
}

export interface InventoryCheckResponse extends InventoryCheck {
    totalProducts: number;
    totalDiscrepancies: number;
    checkedBy?: User;
}

export interface PartnerResponse extends Partner {
    totalReceipts: number;
    totalPurchases: number;
    lastPurchaseDate?: Date;
}