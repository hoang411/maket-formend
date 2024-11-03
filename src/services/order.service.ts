// src/services/order.service.ts
import type {
    Order,
    OrderDTO,
    OrderResponse,
    PaginationParams,
    OrderFilter
} from '@/types';

export const orderService = {
    async createOrder(data: OrderDTO): Promise<OrderResponse> {
        return api.post('/orders', data);
    },

    async getOrders(params: PaginationParams & OrderFilter): Promise<OrderResponse[]> {
        return api.get('/orders', { params });
    },

    async getOrderById(id: number): Promise<OrderResponse> {
        return api.get(`/orders/${id}`);
    },

    async updateOrderStatus(id: number, status: string): Promise<OrderResponse> {
        return api.put(`/orders/update/${id}`, { status });
    },

    async getUserOrders(): Promise<OrderResponse[]> {
        return api.get('/orders/history');
    },

    async deleteOrder(id: number): Promise<void> {
        return api.delete(`/orders/${id}`);
    }
};