<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-white shadow">
      <div class="px-4 py-5 sm:px-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Chi tiết đơn hàng #{{ order?.id }}
            </h3>
            <p class="mt-1 text-sm text-gray-500">
              Đặt ngày {{ formatDate(order?.created_at) }}
            </p>
          </div>
          <OrderStatusBadge :status="order?.status || ''" />
        </div>
      </div>
    </div>

    <div v-if="isLoading">
      <OrderCardSkeleton />
    </div>

    <div v-else-if="!order" class="text-center py-12">
      <p class="text-gray-500">Không tìm thấy đơn hàng</p>
    </div>

    <div v-else class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <!-- Order Timeline -->
      <div class="lg:col-span-1">
        <div class="bg-white shadow rounded-lg p-6">
          <h4 class="text-lg font-medium text-gray-900 mb-4">
            Trạng thái đơn hàng
          </h4>
          <OrderTimeline :events="order.events" />
        </div>
      </div>

      <!-- Order Details -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Shipping Info -->
        <div class="bg-white shadow rounded-lg p-6">
          <h4 class="text-lg font-medium text-gray-900 mb-4">
            Thông tin giao hàng
          </h4>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p class="text-sm font-medium text-gray-500">Người nhận</p>
              <p class="mt-1 text-sm text-gray-900">{{ order.shipping.full_name }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Số điện thoại</p>
              <p class="mt-1 text-sm text-gray-900">{{ order.shipping.phone_number }}</p>
            </div>
            <div class="sm:col-span-2">
              <p class="text-sm font-medium text-gray-500">Địa chỉ</p>
              <p class="mt-1 text-sm text-gray-900">
                {{ formatAddress(order.shipping) }}
              </p>
            </div>
            <div class="sm:col-span-2">
              <p class="text-sm font-medium text-gray-500">Ghi chú</p>
              <p class="mt-1 text-sm text-gray-900">
                {{ order.shipping.note || 'Không có ghi chú' }}
              </p>
            </div>
          </div>
        </div>

        <!-- Order Items -->
        <div class="bg-white shadow rounded-lg p-6">
          <h4 class="text-lg font-medium text-gray-900 mb-4">
            Sản phẩm
          </h4>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useOrderStore } from '@/stores/order.store';
import { useToastStore } from '@/stores/toast.store';
import { formatDate, formatPrice } from '@/utils/format';
import type { Order } from '@/types/order.types';
import OrderStatusBadge from '@/components/order/OrderStatusBadge.vue';
import OrderTimeline from '@/components/order/OrderTimeline.vue';
import OrderCardSkeleton from '@/components/order/OrderCardSkeleton.vue';

const route = useRoute();
const orderStore = useOrderStore();
const toastStore = useToastStore();

const isLoading = ref(false);
const order = ref<Order | null>(null);

const formatAddress = (shipping: any) => {
  return `${shipping.address}, ${shipping.ward}, ${shipping.district}, ${shipping.province}`;
};

onMounted(async () => {
  const orderId = route.params.id as string;
  isLoading.value = true;
  try {
    order.value = await orderStore.fetchOrderDetail(orderId);
  } catch (error: any) {
    toastStore.showError(error.message || 'Có lỗi xảy ra khi tải thông tin đơn hàng');
  } finally {
    isLoading.value = false;
  }
});
</script>