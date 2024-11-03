<template>
  <div class="text-center py-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <div class="bg-white shadow rounded-lg p-8">
        <CheckCircleIcon
            class="mx-auto h-16 w-16 text-green-500"
            aria-hidden="true"
        />
        <h2 class="mt-4 text-2xl font-bold text-gray-900">
          Đặt hàng thành công!
        </h2>
        <p class="mt-2 text-sm text-gray-500">
          Cảm ơn bạn đã đặt hàng. Mã đơn hàng của bạn là:
        </p>
        <p class="mt-2 text-lg font-medium text-indigo-600">
          #{{ orderId }}
        </p>
        <p class="mt-4 text-sm text-gray-500">
          Chúng tôi sẽ gửi email xác nhận đơn hàng và thông tin chi tiết đến địa chỉ email của bạn.
        </p>

        <div class="mt-8 space-x-4">
          <Button
              variant="secondary"
              @click="router.push('/orders')"
          >
            Xem đơn hàng
          </Button>
          <Button @click="router.push('/products')">
            Tiếp tục mua sắm
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { CheckCircleIcon } from '@heroicons/vue/24/outline';
import Button from '@/components/common/Button.vue';

defineProps<{
  orderId: string;
}>();

const router = useRouter();
</script>