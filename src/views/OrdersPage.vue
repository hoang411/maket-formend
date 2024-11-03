<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-white shadow">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Đơn hàng của tôi
        </h3>
        <p class="mt-1 text-sm text-gray-500">
          Quản lý và theo dõi đơn hàng
        </p>
      </div>
    </div>

    <!-- Order Filters -->
    <div class="bg-white shadow rounded-lg p-4">
      <div class="flex flex-wrap gap-4">
        <Button
            v-for="status in orderStatuses"
            :key="status.value"
            :variant="selectedStatus === status.value ? 'primary' : 'secondary'"
            @click="selectedStatus = status.value"
        >
          {{ status.label }}
          <span
              v-if="getStatusCount(status.value)"
              class="ml-2 px-2 py-0.5 text-xs bg-white bg-opacity-20 rounded-full"
          >
            {{ getStatusCount(status.value) }}
          </span>
        </Button>
      </div>
    </div>

    <!-- Orders List -->
    <div v-if="isLoading" class="space-y-4">
      <OrderCardSkeleton v-for="n in 3" :key="n" />
    </div>

    <div v-else-if="!filteredOrders.length" class="text-center py-12">
      <ShoppingBagIcon
          class="mx-auto h-12 w-12 text-gray-400"
          aria-hidden="true"
      />
      <h3 class="mt-2 text-sm font-medium text-gray-900">
        Không có đơn hàng nào
      </h3>
      <p class="mt-1 text-sm text-gray-500">
        Bắt đầu mua sắm để tạo đơn hàng mới.
      </p>
      <div class="mt-6">
        <router-link
            to="/products"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Mua sắm ngay
        </router-link>
      </div>
    </div>

    <div v-else class="space-y-4">
      <OrderCard
          v-for="order in filteredOrders"
          :key="order.id"
          :order="order"
          @cancel="handleCancelOrder"
      />

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex justify-center">
        <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
          <button
              type="button"
              class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              :disabled="currentPage === 1"
              @click="handlePageChange(currentPage - 1)"
          >
            <span class="sr-only">Previous</span>
            <ChevronLeftIcon class="h-5 w-5" />
          </button>

          <button
              v-for="page in displayedPages"
              :key="page"
              type="button"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium"
              :class="[
              page === currentPage
                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                : 'text-gray-500 hover:bg-gray-50'
            ]"
              @click="handlePageChange(page)"
          >
            {{ page }}
          </button>

          <button
              type="button"
              class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              :disabled="currentPage === totalPages"
              @click="handlePageChange(currentPage + 1)"
          >
            <span class="sr-only">Next</span>
            <ChevronRightIcon class="h-5 w-5" />
          </button>
        </nav>
      </div>
    </div>

    <!-- Cancel Order Modal -->
    <Modal
        v-if="showCancelModal"
        title="Hủy đơn hàng"
        :is-open="showCancelModal"
        @close="showCancelModal = false"
    >
      <div class="space-y-4">
        <p class="text-sm text-gray-500">
          Bạn có chắc chắn muốn hủy đơn hàng này không?
        </p>
        <Select
            v-model="cancelReason"
            label="Lý do hủy"
            :options="cancelReasons"
            :error="cancelReasonError"
            required
        />
      </div>
      <template #footer>
        <div class="flex justify-end space-x-3">
          <Button
              variant="secondary"
              @click="showCancelModal = false"
          >
            Không
          </Button>
          <Button
              :loading="isCancelling"
              @click="confirmCancelOrder"
          >
            Có, hủy đơn hàng
          </Button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  ShoppingBagIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/vue/24/outline';
import { useOrderStore } from '@/stores/order.store';
import { useToastStore } from '@/stores/toast.store';
import type { Order } from '@/types/order.types';
import Button from '@/components/common/Button.vue';
import Modal from '@/components/common/Modal.vue';
import Select from '@/components/common/Select.vue';
import OrderCard from '@/components/order/OrderCard.vue';
import OrderCardSkeleton from '@/components/order/OrderCardSkeleton.vue';

const orderStore = useOrderStore();
const toastStore = useToastStore();

const isLoading = ref(false);
const selectedStatus = ref('all');
const currentPage = ref(1);
const showCancelModal = ref(false);
const cancelReason = ref('');
const cancelReasonError = ref('');
const isCancelling = ref(false);
const selectedOrderId = ref<string | null>(null);

const orderStatuses = [
  { value: 'all', label: 'Tất cả' },
  { value: 'pending', label: 'Chờ xác nhận' },
  { value: 'processing', label: 'Đang xử lý' },
  { value: 'shipping', label: 'Đang giao' },
  { value: 'completed', label: 'Đã giao' },
  { value: 'cancelled', label: 'Đã hủy' }
];

const cancelReasons = [
  { value: 'change_mind', label: 'Đổi ý không mua nữa' },
  { value: 'wrong_item', label: 'Đặt nhầm sản phẩm' },
  { value: 'found_better', label: 'Tìm thấy sản phẩm tốt hơn' },
  { value: 'other', label: 'Lý do khác' }
];
// ... (tiếp theo phần trước)

const orders = computed(() => orderStore.orders);
const totalPages = computed(() => Math.ceil(filteredOrders.value.length / 10));

const filteredOrders = computed(() => {
  if (selectedStatus.value === 'all') {
    return orders.value;
  }
  return orders.value.filter(order => order.status === selectedStatus.value);
});

const displayedPages = computed(() => {
  const pages = [];
  const maxPages = 5;
  let start = Math.max(1, currentPage.value - Math.floor(maxPages / 2));
  let end = Math.min(totalPages.value, start + maxPages - 1);

  if (end - start + 1 < maxPages) {
    start = Math.max(1, end - maxPages + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});

const getStatusCount = (status: string) => {
  if (status === 'all') {
    return orders.value.length;
  }
  return orders.value.filter(order => order.status === status).length;
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleCancelOrder = (order: Order) => {
  selectedOrderId.value = order.id;
  showCancelModal.value = true;
};

const validateCancelReason = () => {
  cancelReasonError.value = '';

  if (!cancelReason.value) {
    cancelReasonError.value = 'Vui lòng chọn lý do hủy đơn hàng';
    return false;
  }

  return true;
};

const confirmCancelOrder = async () => {
  if (!validateCancelReason() || !selectedOrderId.value) return;

  isCancelling.value = true;
  try {
    await orderStore.cancelOrder(selectedOrderId.value, cancelReason.value);
    toastStore.showSuccess('Hủy đơn hàng thành công');
    showCancelModal.value = false;
    cancelReason.value = '';
    selectedOrderId.value = null;
  } catch (error: any) {
    toastStore.showError(error.message || 'Có lỗi xảy ra khi hủy đơn hàng');
  } finally {
    isCancelling.value = false;
  }
};

onMounted(async () => {
  isLoading.value = true;
  try {
    await orderStore.fetchOrders();
  } catch (error: any) {
    toastStore.showError(error.message || 'Có lỗi xảy ra khi tải danh sách đơn hàng');
  } finally {
    isLoading.value = false;
  }
});
</script>
// ... (tiếp tục phần script)