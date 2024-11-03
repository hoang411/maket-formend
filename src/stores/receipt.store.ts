// src/stores/receipt.store.ts
import { defineStore } from 'pinia';
import { receiptService } from '@/services';
import type { Receipt, ReceiptDTO, ReceiptResponse, ReceiptFilter } from '@/types';

export const useReceiptStore = defineStore('receipt', {
    state: () => ({
        receipts: [] as ReceiptResponse[],
        selectedReceipt: null as ReceiptResponse | null,
        loading: false,
        error: null as string | null
    }),

    actions: {
        async fetchAllReceipts() {
            try {
                this.loading = true;
                const receipts = await receiptService.getAllReceipts();
                this.receipts = receipts;
            } catch (error: any) {
                this.error = error.message;
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async searchReceipts(filter: ReceiptFilter) {
            try {
                this.loading = true;
                const receipts = await receiptService.searchReceipts(filter);
                this.receipts = receipts;
            } catch (error: any) {
                this.error = error.message;
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async createReceipt(data: ReceiptDTO) {
            try {
                this.loading = true;
                const newReceipt = await receiptService.createReceipt(data);
                this.receipts.unshift(newReceipt);
                return newReceipt;
            } catch (error: any) {
                this.error = error.message;
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async updateReceipt(data: ReceiptDTO) {
            try {
                this.loading = true;
                const updatedReceipt = await receiptService.updateReceipt(data);
                const index = this.receipts.findIndex(receipt => receipt.id === data.id);
                if (index !== -1) {
                    this.receipts[index] = updatedReceipt;
                }
                return updatedReceipt;
            } catch (error: any) {
                this.error = error.message;
                throw error;
            } finally {
                this.loading = false;
            }
        }
    }
});