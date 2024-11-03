<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-white shadow">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Giỏ hàng
        </h3>
        <p class="mt-1 text-sm text-gray-500">
          {{ cartItemCount }} sản phẩm
        </p>
      </div>
    </div>

    <div v-if="isLoading" class="space-y-4">
      <CartItemSkeleton v-for="n in 3" :key="n" />
    </div>

    <div v-else-if="!cartItems.length" class="text-center py-12">
      <ShoppingCartIcon
          class="mx-auto h-12 w-12 text-gray-400"
          aria-hidden="true"
      />
      <h3 class="mt-2 text-sm font-medium text-gray-900">
        Giỏ hàng trống
      </h3>
      <p class="mt-1 text-sm text-gray-500">
        Bắt đầu mua sắm để thêm sản phẩm vào giỏ hàng.
      </p>
      <div class="mt-6">
        <router-link
            to="/products"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Tiếp tục mua sắm
        </router-link>
      </div>
    </div>

    <div v-else class="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
      <!-- Cart Items -->
      <div class="lg:col-span-7">
        <div class="space-y-4">
          <CartItem
              v-for="item in cartItems"
              :key="item.id"
              :item="item"
              @update-quantity="handleUpdateQuantity"
              @remove="handleRemoveItem"
          />
        </div>
      </div>

      <!-- Order Summary -->
      <div class="mt-6 lg:mt-0 lg:col-span-5">
        <div class="bg-white shadow rounded-lg p-6 space-y-4">
          <h4 class="text-lg font-medium text-gray-900">
            Tổng đơn hàng
          </h4>

          <div class="border-t border-gray-200 pt-4 space-y-4">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Tạm tính</span>
              <span class="font-medium text-gray-900">
                {{ formatPrice(subtotal) }}
              </span>
            </div>

            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Giảm giá</span>
              <span class="font-medium text-gray-900">
                {{ formatPrice(discount) }}
              </span>
            </div>

            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Phí vận chuyển</span>
              <span class="font-medium text-gray-900">
                {{ formatPrice(shippingFee) }}
              </span>
            </div>

            <div class="flex justify-between items-center pt-4 border-t border-gray-200">
              <span class="text-base font-medium text-gray-900">Tổng cộng</span>
              <span class="text-xl font-bold text-gray-900">
                {{ formatPrice(total) }}
              </span>
            </div>
          </div>

          <div class="mt-6">
            <Button
                full-width
                size="lg"
                :disabled="!cartItems.length"
                @click="handleCheckout"
            >
              Thanh toán
            </Button>
          </div>

          <!-- Coupon Input -->
          <div class="mt-4 pt-4 border-t border-gray-200">
            <form @submit.prevent="handleApplyCoupon" class="flex space-x-2">
              <Input
                  v-model="couponCode"
                  placeholder="Mã giảm giá"
                  class="flex-1"
              />
              <Button
                  type="submit"
                  variant="secondary"
                  :loading="isApplyingCoupon"
              >
                Áp dụng
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { ShoppingCartIcon } from '@heroicons/vue/24/outline';
import { useCartStore } from '@/stores/cart.store';
import { useToastStore } from '@/stores/toast.store';
import { formatPrice } from '@/utils/format';
import type { CartItem } from '@/types/cart.types';
import Button from '@/components/common/Button.vue';
import Input from '@/components/common/Input.vue';
import CartItem from '@/components/cart/CartItem.vue';
import CartItemSkeleton from '@/components/cart/CartItemSkeleton.vue';

const router = useRouter();
const cartStore = useCartStore();
const toastStore = useToastStore();

const isLoading = ref(false);
const isApplyingCoupon = ref(false);
const couponCode = ref('');

const cartItems = computed(() => cartStore.items);
const cartItemCount = computed(() => cartStore.totalItems);
const subtotal = computed(() => cartStore.subtotal);
const discount = computed(() => cartStore.discount);
const shippingFee = computed(() => cartStore.shippingFee);
const total = computed(() => cartStore.total);

const handleUpdateQuantity = async (item: CartItem, quantity: number) => {
  try {
    await cartStore.updateQuantity(item.id, quantity);
  } catch (error: any) {
    toastStore.showError(error.message || 'Có lỗi xảy ra khi cập nhật số lượng');
  }
};

const handleRemoveItem = async (item: CartItem) => {
  try {
    await cartStore.removeItem(item.id);
    toastStore.showSuccess('Đã xóa sản phẩm khỏi giỏ hàng');
  } catch (error: any) {
    toastStore.showError(error.message || 'Có lỗi xảy ra khi xóa sản phẩm');
  }
};

const handleApplyCoupon = async () => {
  if (!couponCode.value) return;

  isApplyingCoupon.value = true;
  try {
    await cartStore.applyCoupon(couponCode.value);
    toastStore.showSuccess('Áp dụng mã giảm giá thành công');
    couponCode.value = '';
  } catch (error: any) {
    toastStore.showError(error.message || 'Mã giảm giá không hợp lệ');
  } finally {
    isApplyingCoupon.value = false;
  }
};

const handleCheckout = () => {
  router.push('/checkout');
};
</script>