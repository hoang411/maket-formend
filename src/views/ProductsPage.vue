<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-white shadow">
      <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Sản phẩm
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            Danh sách sản phẩm
          </p>
        </div>

        <!-- Search and Filter -->
        <div class="flex space-x-4">
          <div class="relative">
            <Input
                v-model="searchQuery"
                placeholder="Tìm kiếm sản phẩm..."
                :prefix-icon="MagnifyingGlassIcon"
            />
          </div>

          <Select
              v-model="selectedCategory"
              :options="categoryOptions"
              placeholder="Danh mục"
          />

          <Select
              v-model="sortBy"
              :options="sortOptions"
              placeholder="Sắp xếp"
          />
        </div>
      </div>
    </div>

    <!-- Product Grid -->
    <div v-if="isLoading" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <ProductCardSkeleton v-for="n in 8" :key="n" />
    </div>

    <div v-else-if="!products.length" class="text-center py-12">
      <div class="text-gray-500">
        Không tìm thấy sản phẩm nào
      </div>
    </div>

    <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          @add-to-cart="handleAddToCart"
      />
    </div>

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

    <!-- Quick View Modal -->
    <ProductQuickViewModal
        v-if="selectedProduct"
        :product="selectedProduct"
        :is-open="!!selectedProduct"
        @close="selectedProduct = null"
        @add-to-cart="handleAddToCart"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/vue/24/outline';
import { useProductStore } from '@/stores/product.store';
import { useCartStore } from '@/stores/cart.store';
import { useToastStore } from '@/stores/toast.store';
import type { Product } from '@/types/product.types';
import Input from '@/components/common/Input.vue';
import Select from '@/components/common/Select.vue';
import ProductCard from '@/components/product/ProductCard.vue';
import ProductCardSkeleton from '@/components/product/ProductCardSkeleton.vue';
import ProductQuickViewModal from '@/components/product/ProductQuickViewModal.vue';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const cartStore = useCartStore();
const toastStore = useToastStore();

const isLoading = ref(false);
const searchQuery = ref('');
const selectedCategory = ref('');
const sortBy = ref('');
const currentPage = ref(1);
const selectedProduct = ref<Product | null>(null);

const categoryOptions = [
  { value: '', label: 'Tất cả danh mục' },
  { value: 'electronics', label: 'Điện tử' },
  { value: 'clothing', label: 'Thời trang' },
  { value: 'books', label: 'Sách' }
];

const sortOptions = [
  { value: 'price_asc', label: 'Giá tăng dần' },
  { value: 'price_desc', label: 'Giá giảm dần' },
  { value: 'name_asc', label: 'Tên A-Z' },
  { value: 'name_desc', label: 'Tên Z-A' }
];

const products = computed(() => productStore.filteredProducts);
const totalPages = computed(() => Math.ceil(products.value.length / 12));

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

watch([searchQuery, selectedCategory, sortBy], () => {
  currentPage.value = 1;
  updateQueryParams();
});

const updateQueryParams = () => {
  const query: Record<string, string> = {};

  if (searchQuery.value) query.q = searchQuery.value;
  if (selectedCategory.value) query.category = selectedCategory.value;
  if (sortBy.value) query.sort = sortBy.value;
  if (currentPage.value > 1) query.page = currentPage.value.toString();

  router.replace({ query });
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
  updateQueryParams();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleAddToCart = async (product: Product, quantity = 1) => {
  try {
    await cartStore.addToCart(product, quantity);
    toastStore.showSuccess('Thêm vào giỏ hàng thành công');
  } catch (error: any) {
    toastStore.showError(error.message || 'Có lỗi xảy ra khi thêm vào giỏ hàng');
  }
};

onMounted(async () => {
  const { q, category, sort, page } = route.query;

  searchQuery.value = q as string || '';
  selectedCategory.value = category as string || '';
  sortBy.value = sort as string || '';
  currentPage.value = parseInt(page as string) || 1;

  isLoading.value = true;
  try {
    await productStore.fetchProducts();
  } catch (error: any) {
    toastStore.showError(error.message || 'Có lỗi xảy ra khi tải danh sách sản phẩm');
  } finally {
    isLoading.value = false;
  }
});
</script>