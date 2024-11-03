<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Hero Section -->
    <div class="text-center py-12">
      <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
        <span class="block">Chào mừng đến với</span>
        <span class="block text-indigo-600">Siêu thị trực tuyến</span>
      </h1>
      <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
        Mua sắm trực tuyến với hàng ngàn sản phẩm chất lượng, giao hàng nhanh chóng và thanh toán an toàn.
      </p>
      <div class="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
        <div class="rounded-md shadow">
          <router-link
              to="/products"
              class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
          >
            Mua sắm ngay
          </router-link>
        </div>
      </div>
    </div>

    <!-- Featured Products -->
    <div class="mt-12">
      <h2 class="text-2xl font-extrabold text-gray-900 mb-6">Sản phẩm nổi bật</h2>
      <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
        <ProductCard
            v-for="product in featuredProducts"
            :key="product.id"
            :product="product"
        />
      </div>
    </div>

    <!-- Categories -->
    <div class="mt-16">
      <h2 class="text-2xl font-extrabold text-gray-900 mb-6">Danh mục sản phẩm</h2>
      <div class="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
        <div
            v-for="category in categories"
            :key="category.id"
            class="group relative bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-200"
        >
          <div class="aspect-w-3 aspect-h-2">
            <img
                :src="category.image"
                :alt="category.name"
                class="object-center object-cover group-hover:opacity-75"
            />
          </div>
          <div class="p-4">
            <h3 class="text-sm font-medium text-gray-900">
              <router-link :to="`/category/${category.id}`">
                <span aria-hidden="true" class="absolute inset-0"></span>
                {{ category.name }}
              </router-link>
            </h3>
            <p class="mt-1 text-sm text-gray-500">{{ category.productCount }} sản phẩm</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ProductCard from '@/components/ProductCard.vue';

// Mock data - replace with actual API calls
const featuredProducts = ref([
  {
    id: 1,
    name: 'Sản phẩm 1',
    price: 199000,
    image: '/images/product-1.jpg',
    description: 'Mô tả sản phẩm 1'
  },
  // Add more products...
]);

const categories = ref([
  {
    id: 1,
    name: 'Thực phẩm',
    image: '/images/category-1.jpg',
    productCount: 150
  },
  // Add more categories...
]);
</script>