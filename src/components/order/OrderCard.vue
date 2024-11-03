<template>
  <div class="bg-white shadow rounded-lg overflow-hidden">
    <!-- Order Header -->
    <div class="px-4 py-5 sm:px-6 flex justify-between items-center border-b">
      <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Đơn hàng #{{ order.id }}
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
          Đặt ngày {{ formatDate(order.created_at) }}
        </p>
      </div>
      <OrderStatusBadge :status="order.status" />
    </div>

    <!-- Order Items -->
    <div class="px-4 py-5 sm:p-6">
      <div class="space-y-4">
        <div
            v-for="item in order.items"
            :key="item.id"
            class="flex items-center space-x-4"
        >
          <img
              :src="item.product.image"
              :alt="item.product.name"
              class="h-16 w-16 rounded-md object-cover"
          />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">
              {{ item.product.name }}
            </p>
            <p class="text-sm text-gray-500">
              {{ item.quantity }} x {{ formatPrice(item.product.price) }}
            </p>
          </div>
          <p class="text-sm font-medium text-gray-900">
            {{ formatPrice(item.product.price * item.quantity) }}
          </p>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="mt-6 border-t border-gray-200 pt-4">
        <div class="space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-gray-500">Tạm tính</span>
            <span class="font-medium text-gray-900">
              {{ formatPrice(order.subtotal) }}
            </span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-500">Giảm giá</span>
            <span class="font-medium text-gray-900">
              {{ formatPrice(order.discount) }}
            </span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-500">Phí vận chuyển</span>
            <span class="font-medium text-gray-900">
              {{ formatPrice(order.shipping_fee) }}
            </span>
          </div>
          <div class="flex justify-between items-center pt-2 border-t border-gray-200">
            <span class="text-base font-medium text-gray-900">Tổng cộng</span>
            <span class="text-xl font-bold text-gray-900">
              {{ formatPrice(order.total) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Order Actions -->
      <div class="mt-6 flex justify-end space-x-3">
        <Button
            v-if="order.status === 'pending'"
            variant="danger"
            @click="$emit('cancel', order)"
        >
          Hủy đơn hàng
        </Button>
        <Button
            v-if="order.status === 'completed'"
            variant="secondary"
            @click="$emit('review', order)"
        >
          Đánh giá
        </Button>
        <Button @click="$emit('view-detail', order)">
          Xem chi tiết
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDate, formatPrice } from '@/utils/format';
import type { Order } from '@/types/order.types';
import Button from '@/components/common/Button.vue';
import OrderStatusBadge from '@/components/order/OrderStatusBadge.vue';

defineProps<{
  order: Order;
}>();

defineEmits<{
  (e: 'cancel', order: Order): void;
  (e: 'review', order: Order): void;
  (e: 'view-detail', order: Order): void;
}>();
</script>