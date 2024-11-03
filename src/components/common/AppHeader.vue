<!-- src/components/common/AppHeader.vue -->
<template>
  <header class="bg-white shadow">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center">
          <img src="@/assets/logo.png" alt="Logo" class="h-8 w-auto" />
        </router-link>

        <!-- Search -->
        <div class="flex-1 max-w-lg mx-8">
          <div class="relative">
            <input
                type="text"
                v-model="searchQuery"
                @input="handleSearch"
                placeholder="Tìm kiếm sản phẩm..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center">
              <i class="fas fa-search text-gray-400"></i>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <router-link
              v-for="item in navigationItems"
              :key="item.path"
              :to="item.path"
              class="text-gray-700 hover:text-primary-600"
          >
            {{ item.name }}
          </router-link>
        </nav>

        <!-- Mobile Menu Button -->
        <button
            @click="toggleMobileMenu"
            class="md:hidden text-gray-500 hover:text-gray-700"
        >
          <i class="fas fa-bars text-xl"></i>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition
        enter-active-class="transition-opacity ease-linear duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity ease-linear duration-300"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
      <div v-if="isMobileMenuOpen" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <router-link
              v-for="item in navigationItems"
              :key="item.path"
              :to="item.path"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
          >
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { debounce } from '@/utils/helpers'

const router = useRouter()
const searchQuery = ref('')
const isMobileMenuOpen = ref(false)

const navigationItems = [
  { path: '/products', name: 'Sản phẩm' },
  { path: '/about', name: 'Về chúng tôi' },
  { path: '/contact', name: 'Liên hệ' }
]

const handleSearch = debounce(() => {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/products',
      query: { search: searchQuery.value }
    })
  }
}, 300)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>