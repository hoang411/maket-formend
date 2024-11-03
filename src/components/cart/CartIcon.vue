<template>
  <div class="relative">
    <router-link
        to="/cart"
        class="flex items-center text-gray-500 hover:text-gray-600"
    >
      <ShoppingCartIcon class="h-6 w-6" />
      <span
          v-if="cartItemCount > 0"
          class="absolute -top-1 -right-1 h-4 w-4 text-xs flex items-center justify-center bg-red-500 text-white rounded-full"
      >
        {{ cartItemCount }}
      </span>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ShoppingCartIcon } from '@heroicons/vue/24/outline';
import { useCartStore } from '@/stores/cart.store';

const cartStore = useCartStore();
const cartItemCount = computed(() => cartStore.totalItems);
</script>