<template>
  <Modal
      :is-open="isOpen"
      :title="product.name"
      size="lg"
      @close="$emit('close')"
  >
    <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
      <!-- Product Image -->
      <div class="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
        <img
            :src="product.image"
            :alt="product.name"
            class="h-full w-full object-cover object-center"
        />
      </div>

      <!-- Product Details -->
      <div class="space-y-4">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-2xl font-bold text-gray-900">
              {{ product.name }}
            </h3>
            <p class="mt-1 text-sm text-gray-500">
              {{ product.category }}
            </p>
          </div>
          <div class="flex items-center">
            <StarIcon class="h-5 w-5 text-yellow-400" />
            <span class="ml-1 text-sm text-gray-500">
              {{ product.rating }}
            </span>
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <p class="text-2xl font-bold text-gray-900">
            {{ formatPrice(product.price) }}
          </p>
          <p
              v-if="product.original_price"
              class="text-sm text-gray-500 line-through"
          >
            {{ formatPrice(product.original_price) }}
          </p>
          <span
              v-if="product.discount_percent"
              class="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded"
          >
            -{{ product.discount_percent }}%
          </span>
        </div>

        <p class="text-sm text-gray-600">
          {{ product.description }}
        </p>

        <div class="space-y-2">
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-500">Tình trạng:</span>
            <span
                :class="[
                product.in_stock
                  ? 'text-green-600'
                  : 'text-red-600'
              ]"
            >
              {{ product.in_stock ? 'Còn hàng' : 'Hết hàng' }}
            </span>
          </div>
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-500">Đã bán:</span>
            <span class="text-gray-900">{{ product.sold_count }}</span>
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <div class="w-32">
            <Input
                v-model="quantity"
                type="number"
                min="1"
                :max="product.stock_quantity"
                :disabled="!product.in_stock"
            />
          </div>
          <Button
              :disabled="!product.in_stock"
              @click="handleAddToCart"
          >
            Thêm vào giỏ
          </Button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { StarIcon } from '@heroicons/vue/24/solid';
import { formatPrice } from '@/utils/format';
import type { Product } from '@/types/product.types';
import Modal from '@/components/common/Modal.vue';
import Button from '@/components/common/Button.vue';
import Input from '@/components/common/Input.vue';

const props = defineProps<{
  isOpen: boolean;
  product: Product;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'add-to-cart', product: Product, quantity: number): void;
}>();

const quantity = ref(1);

const handleAddToCart = () => {
  emit('add-to-cart', props.product, quantity.value);
  emit('close');
};
</script>