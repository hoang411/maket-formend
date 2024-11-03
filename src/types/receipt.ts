// src/types/receipt.ts
export interface Receipt {
    id: number;
    name: string;
    partnerId: number;
    partner?: Partner;
    userId: number;
    user?: User;
    status: ReceiptStatus;
    deliveryDate: Date;
    totalMoney: number;
    amountPaid: number;
    note?: string;
    receiptDetails: ReceiptDetail[];
    createdAt: Date;
    updatedAt: Date;
}

export interface ReceiptDetail {
    id: number;
    receiptId: number;
    productId: number;
    product?: Product;
    costOfProduct: number;
    quantity: number;
}

export type ReceiptStatus = 'CREATED' | 'IMPORTING' | 'IMPORTED' | 'COMPLETED' | 'CANCELLED';

export interface ReceiptDTO {
    name: string;
    partnerId: number;
    userId: number;
    status: ReceiptStatus;
    deliveryDate: Date;
    totalMoney: number;
    amountPaid: number;
    note?: string;
    receiptDetails: ReceiptDetailDTO[];
}

export interface ReceiptDetailDTO {
    productId: number;
    costOfProduct: number;
    quantity: number;
}
