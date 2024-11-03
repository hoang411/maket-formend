// src/services/receipt.service.ts
import type {
    Receipt,
    ReceiptDTO,
    ReceiptResponse,
    ReceiptFilter
} from '@/types';

export const receiptService = {
    async getAllReceipts(): Promise<ReceiptResponse[]> {
        return api.get('/receipts');
    },

    async searchReceipts(params: ReceiptFilter): Promise<ReceiptResponse[]> {
        return api.post('/receipts/search', null, { params });
    },

    async getReceiptById(id: number): Promise<ReceiptResponse> {
        return api.get(`/receipts/${id}`);
    },

    async createReceipt(data: ReceiptDTO): Promise<ReceiptResponse> {
        return api.post('/receipts/insert', data);
    },

    async updateReceipt(data: ReceiptDTO): Promise<ReceiptResponse> {
        return api.put('/receipts/update', data);
    },

    async deleteReceipt(id: number): Promise<void> {
        return api.delete(`/receipts/delete/${id}`);
    }
};