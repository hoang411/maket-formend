// src/stores/order.store.ts
import { defineStore } from 'pinia';
import { orderService } from '@/services';
import type { Order, OrderDTO, OrderResponse, OrderFilter, PaginationParams } from '@/types';

export const useOrderStore = defineStore('order', {
    state: () => ({
        orders: [] as OrderResponse[],
        selectedOrder: null as OrderResponse | null,
        loading: false,
        error: null as string | null
    }),

    actions: {
        async createOrder(orderData: OrderDTO) {
            try {
                this.loading = true;
                const order = await orderService.createOrder(orderData);
                this.orders.unshift(order);
                return order;
            } catch (error: any) {
                this.error = error.message;
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async fetchUserOrders() {
            try {
                this.loading = true;
                const orders = await orderService.getUserOrders();
                this.orders = orders;
            } catch (error: any) {
                this.error = error.message;
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async fetchOrderById(id: number) {
            try {
                this.loading = true;
                const order = await orderService.getOrderById(id);
                this.selectedOrder = order;
                return order;
            } catch (error: any) {
                this.error = error.message;
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async updateOrderStatus(orderId: number, status: string) {
            try {
                this.loading = true;
                const updatedOrder = await orderService.updateOrderStatus(orderId, status);
                const index = this.orders.findIndex(order => order.id === orderId);
                if (index !== -1) {
                    this.orders[index] = updatedOrder;
                }
                return updatedOrder;
            } catch (error: any) {
                this.error = error.message;
                throw error;
            } finally {
                this.loading = false;
            }
        }
    }
});