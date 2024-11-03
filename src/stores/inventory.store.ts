// src/stores/inventory.store.ts
import { defineStore } from 'pinia';
import { inventoryService } from '@/services';
import type {
    InventoryCheck,
    InventoryCheckDTO,
    InventoryCheckResponse,
    InventoryFilter
} from '@/types';

export const useInventoryStore = defineStore('inventory', {
    state: () => ({
        inventoryChecks: [] as InventoryCheckResponse[],
        selectedCheck: null as InventoryCheckResponse | null,
        loading: false,
        error: null as string | null
    }),

    actions: {
        async fetchAllChecks() {
            try {
                this.loading = true;
                const checks = await inventoryService.getAllInventoryChecks();
                this.inventoryChecks = checks;
            } catch (error: any) {
                this.error = error.message;
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async searchChecks(filter: InventoryFilter) {
            try {
                this.loading = true;
                const checks = await inventoryService.searchInventoryChecks(filter);
                this.inventoryChecks = checks;
            } catch (error: any) {
                this.error = error.message;
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async createCheck(data: InventoryCheckDTO) {
            try {
                this.loading = true;
                const newCheck = await inventoryService.createInventoryCheck(data);
                this.inventoryChecks.unshift(newCheck);
                return newCheck;
            } catch (error: any) {
                this.error = error.message;
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async verifyProducts(data: InventoryCheckDTO) {
            try {
                this.loading = true;
                const updatedCheck = await inventoryService.verifyProducts(data);
                const index = this.inventoryChecks.findIndex(check => check.id === data.id);
                if (index !== -1) {
                    this.inventoryChecks[index] = updatedCheck;
                }
                return updatedCheck;
            } catch (error: any) {
                this.error = error.message;
                throw error;
            } finally {
                this.loading = false;
            }
        }
    }
});