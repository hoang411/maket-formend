// src/stores/product.store.ts
import { defineStore } from 'pinia';
import { productService } from '@/services';
import type { Product, ProductFilter, PaginationParams, ProductListResponse } from '@/types';

export const useProductStore = defineStore('product', {
    state: () => ({
        products: [] as Product[],
        totalPages: 0,
        currentPage: 1,
        loading: false,
        error: null as string | null,
        selectedProduct: null as Product | null
    }),

    getters: {
        getProductById: (state) => (id: number) =>
            state.products.find(product => product.id === id)
    },

    actions: {
        async fetchProducts(params: PaginationParams & ProductFilter) {
            try {
                this.loading = true;
                const response = await productService.getProducts(params);
                this.products = response.products;
                this.totalPages = response.totalPages;
                this.currentPage = response.currentPage;
            } catch (error: any) {
                this.error = error.message;
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async fetchProductById(id: number) {
            try {
                this.loading = true;
                const product = await productService.getProductById(id);
                this.selectedProduct = product;
                return product;
            } catch (error: any) {
                this.error = error.message;
                throw error;
            } finally {
                this.loading = false;
            }
        }
    }
});