// src/stores/cart.store.ts
import { defineStore } from 'pinia';
import type { Product } from '@/types';

interface CartItem {
    product: Product;
    quantity: number;
}

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [] as CartItem[],
        loading: false
    }),

    getters: {
        totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
        totalAmount: (state) => state.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0),

        cartItemsWithDetails: (state) => state.items.map(item => ({
            ...item,
            subtotal: item.product.price * item.quantity
        }))
    },

    actions: {
        addToCart(product: Product, quantity: number = 1) {
            const existingItem = this.items.find(item => item.product.id === product.id);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                this.items.push({ product, quantity });
            }
        },

        removeFromCart(productId: number) {
            const index = this.items.findIndex(item => item.product.id === productId);
            if (index > -1) {
                this.items.splice(index, 1);
            }
        },

        updateQuantity(productId: number, quantity: number) {
            const item = this.items.find(item => item.product.id === productId);
            if (item) {
                item.quantity = quantity;
            }
        },

        clearCart() {
            this.items = [];
        }
    },

    persist: true
});