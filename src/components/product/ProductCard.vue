<template>
  <div class="group relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200">
    <!-- Product Image -->
    <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-lg">
      <img
          :src="product.image"
          :alt="product.name"
          class="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
      />

      <!-- Quick View Button -->
      <button
          type="button"
          class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity"
          @click="$emit('quick-view', product)"
      >
        <EyeIcon class="h-6 w-6 text-white" />
        <span class="sr-only">Quick view</span>
      </button>
    </div>

    <!-- Product Info -->
    <div class="p-4">
      <h3 class="text-sm font-medium text-gray-900">
        <router-link :to="`/products/${product.id}`">
          {{ product.name }}
        </router-link>
      </h3>

      <div class="mt-1 flex justify-between items-center">
        <p class="text-lg font-medium text-gray-900">
          {{ formatPrice(product.price) }}
        </p>

        <div class="flex items-center">
          <StarIcon class="h-4 w-4 text-yellow-400" />
          <span class="ml-1 text-sm text-gray-500">
            {{ product.rating }}
          </span>
        </div>
      </div>

      <div class="mt-4">
        <Button
            full-width
            :disabled="!product.in_stock"
            @click="$emit('add-to-cart', product)"
        >
          {{ product.in_stock ? 'Thêm vào giỏ' : 'Hết hàng' }}
        </Button>
      </div>
    </div>

    <!-- Sale Badge -->
    <div
        v-if="product.discount_percent"
        class="absolute top-0 right-0 m-2 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded"
    >
      -{{ product.discount_percent }}%
    </div>
  </div>
</template>

<script setup lang="ts">
import { EyeIcon, StarIcon } from '@heroicons/vue/24/solid';
import { formatPrice } from '@/utils/format';
import type { Product } from '@/types/product.types';
import Button from '@/components/common/Button.vue';

defineProps<{
  product: Product;
}>();

defineEmits<{
  (e: 'quick-view', product: Product): void;
  (e: 'add-to-cart', product: Product): void;
}>();
</script>