// src/services/inventory.service.ts
import type {
    InventoryCheck,
    InventoryCheckDTO,
    InventoryCheckResponse,
    InventoryFilter
} from '@/types';

export const inventoryService = {
    async getAllInventoryChecks(): Promise<InventoryCheckResponse[]> {
        return api.get('/inventoryCheck');
    },

    async searchInventoryChecks(params: InventoryFilter): Promise<InventoryCheckResponse[]> {
        return api.post('/inventoryCheck/search', null, { params });
    },

    async getInventoryCheckById(id: number): Promise<InventoryCheckResponse> {
        return api.post(`/inventoryCheck/${id}`);
    },

    async createInventoryCheck(data: InventoryCheckDTO): Promise<InventoryCheckResponse> {
        return api.post('/inventoryCheck/insert', data);
    },

    async updateInventoryCheck(data: InventoryCheckDTO): Promise<InventoryCheckResponse> {
        return api.put('/inventoryCheck/update', data);
    },

    async deleteInventoryCheck(id: number): Promise<void> {
        return api.delete(`/inventoryCheck/delete/${id}`);
    },

    async verifyProducts(data: InventoryCheckDTO): Promise<InventoryCheckResponse> {
        return api.put('/inventoryCheck/productVerifications', data);
    }
};