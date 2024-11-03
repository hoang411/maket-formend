<!-- src/layouts/MainLayout.vue -->
<template>
  <div class="min-h-screen flex flex-col">
    <header class="sticky top-0 z-50 bg-white shadow">
      <nav class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <router-link to="/" class="flex items-center">
            <img src="@/assets/logo.png" alt="Logo" class="h-8 w-auto" />
          </router-link>

          <!-- Navigation Links -->
          <div class="hidden md:flex items-center space-x-8">
            <router-link
                v-for="item in navigationItems"
                :key="item.path"
                :to="item.path"
                class="text-gray-700 hover:text-primary-600"
            >
              {{ item.name }}
            </router-link>
          </div>

          <!-- User Menu -->
          <div class="flex items-center space-x-4">
            <router-link to="/cart" class="relative">
              <i class="fas fa-shopping-cart text-xl"></i>
              <span
                  v-if="cartItemCount"
                  class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              >
                {{ cartItemCount }}
              </span>
            </router-link>

            <!-- User Dropdown -->
            <div v-if="isAuthenticated" class="relative">
              <button
                  @click="toggleUserMenu"
                  class="flex items-center space-x-2"
              >
                <img
                    :src="userAvatar"
                    alt="User avatar"
                    class="h-8 w-8 rounded-full object-cover"
                />
                <span class="hidden md:block">{{ userName }}</span>
              </button>

              <!-- Dropdown Menu -->
              <div
                  v-show="isUserMenuOpen"
                  class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1"
              >
                <router-link
                    v-for="item in userMenuItems"
                    :key="item.path"
                    :to="item.path"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {{ item.name }}
                </router-link>
                <button
                    @click="handleLogout"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Đăng xuất
                </button>
              </div>
            </div>

            <!-- Login/Register -->
            <template v-else>
              <router-link
                  to="/auth/login"
                  class="text-gray-700 hover:text-primary-600"
              >
                Đăng nhập
              </router-link>
              <router-link
                  to="/auth/register"
                  class="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
              >
                Đăng ký
              </router-link>
            </template>
          </div>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="flex-grow container mx-auto px-4 py-8">
      <router-view></router-view>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-8">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Company Info -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Về chúng tôi</h3>
            <p class="text-gray-300">
              Supermarket - Hệ thống siêu thị trực tuyến hàng đầu Việt Nam
            </p>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Liên kết nhanh</h3>
            <ul class="space-y-2">
              <li v-for="item in footerLinks" :key="item.path">
                <router-link
                    :to="item.path"
                    class="text-gray-300 hover:text-white"
                >
                  {{ item.name }}
                </router-link>
              </li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Liên hệ</h3>
            <ul class="space-y-2 text-gray-300">
              <li>Địa chỉ: 123 Đường ABC, Quận XYZ</li>
              <li>Email: contact@supermarket.com</li>
              <li>Hotline: 1900 1234</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import { useCartStore } from '@/stores/cart.store'

// Stores
const authStore = useAuthStore()
const cartStore = useCartStore()
const router = useRouter()

// State
const isUserMenuOpen = ref(false)

// Computed
const isAuthenticated = computed(() => authStore.isAuthenticated)
const userName = computed(() => authStore.user?.fullName || '')
const userAvatar = computed(() => authStore.user?.avatar || '/default-avatar.png')
const cartItemCount = computed(() => cartStore.totalItems)

// Navigation Items
const navigationItems = [
  { path: '/', name: 'Trang chủ' },
  { path: '/products', name: 'Sản phẩm' },
  { path: '/about', name: 'Về chúng tôi' },
  { path: '/contact', name: 'Liên hệ' }
]

// User Menu Items
const userMenuItems = [
  { path: '/profile', name: 'Thông tin cá nhân' },
  { path: '/orders', name: 'Đơn hàng của tôi' }
]

// Footer Links
const footerLinks = [
  { path: '/about', name: 'Về chúng tôi' },
  { path: '/contact', name: 'Liên hệ' },
  { path: '/privacy', name: 'Chính sách bảo mật' },
  { path: '/terms', name: 'Điều khoản sử dụng' }
]

// Methods
const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value
}

const handleLogout = async () => {
  await authStore.logout()
  router.push('/auth/login')
}

// Close user menu when clicking outside
const closeUserMenu = (event: MouseEvent) => {
  if (isUserMenuOpen.value) {
    isUserMenuOpen.value = false
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('click', closeUserMenu)
})

onUnmounted(() => {
  document.removeEventListener('click', closeUserMenu)
})
</script>

<style scoped>
/* Add any additional styles here */
</style>