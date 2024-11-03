<template>
  <div class="bg-white shadow rounded-lg p-4">
    <div class="flex items-center space-x-4">
      <!-- Product Image -->
      <div class="flex-shrink-0">
        <img
            :src="item.product.image"
            :alt="item.product.name"
            class="h-20 w-20 rounded-md object-cover"
        />
      </div>

      <!-- Product Info -->
      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between">
          <div>
            <h4 class="text-sm font-medium text-gray-900 truncate">
              {{ item.product.name }}
            </h4>
            <p class="mt-1 text-sm text-gray-500">
              {{ item.product.category }}
            </p>
          </div>
          <button
              type="button"
              class="text-gray-400 hover:text-gray-500"
              @click="$emit('remove', item)"
          >
            <span class="sr-only">Remove</span>
            <XMarkIcon class="h-5 w-5" />
          </button>
        </div>

        <div class="mt-4 flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <!-- Quantity Controls -->
            <div class="flex items-center border rounded-md">
              <button
                  type="button"
                  class="p-2 text-gray-600 hover:text-gray-700 disabled:opacity-50"
                  :disabled="item.quantity <= 1"
                  @click="updateQuantity(item.quantity - 1)"
              >
                <MinusIcon class="h-4 w-4" />
              </button>
              <input
                  type="number"
                  :value="item.quantity"
                  min="1"
                  :max="item.product.stock_quantity"
                  class="w-12 text-center border-x p-1 text-sm"
                  @change="updateQuantity(parseInt($event.target.value))"
              />
              <button
                  type="button"
                  class="p-2 text-gray-600 hover:text-gray-700 disabled:opacity-50"
                  :disabled="item.quantity >= item.product.stock_quantity"
                  @click="updateQuantity(item.quantity + 1)"
              >
                <PlusIcon class="h-4 w-4" />
              </button>
            </div>

            <!-- Stock Status -->
            <p
                v-if="item.product.stock_quantity < 10"
                class="text-sm text-red-600"
            >
              Chỉ còn {{ item.product.stock_quantity }} sản phẩm
            </p>
          </div>

          <!-- Price -->
          <div class="text-right">
            <p class="text-sm font-medium text-gray-900">
              {{ formatPrice(item.product.price * item.quantity) }}
            </p>
            <p
                v-if="item.product.original_price"
                class="text-sm text-gray-500 line-through"
            >
              {{ formatPrice(item.product.original_price * item.quantity) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { formatPrice } from '@/utils/format';
import type { CartItem } from '@/types/cart.types';

const props = defineProps<{
  item: CartItem;
}>();

const emit = defineEmits<{
  (e: 'update-quantity', item: CartItem, quantity: number): void;
  (e: 'remove', item: CartItem): void;
}>();

const updateQuantity = (quantity: number) => {
  if (
      quantity >= 1 &&
      quantity <= props.item.product.stock_quantity
  ) {
    emit('update-quantity', props.item, quantity);
  }
};
</script>