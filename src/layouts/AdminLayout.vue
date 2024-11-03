<!-- src/layouts/AdminLayout.vue -->
<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside
        :class="[
        'fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 transition-transform duration-300 ease-in-out',
        { '-translate-x-full': !isSidebarOpen }
      ]"
    >
      <!-- Logo -->
      <div class="flex items-center justify-between h-16 px-4 bg-gray-900">
        <router-link to="/" class="flex items-center">
          <img src="@/assets/logo-white.png" alt="Logo" class="h-8 w-auto" />
        </router-link>
        <button
            @click="toggleSidebar"
            class="md:hidden text-white hover:text-gray-200"
        >
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>

      <!-- User Info -->
      <div class="p-4 border-b border-gray-700">
        <div class="flex items-center space-x-3">
          <img
              :src="userAvatar"
              alt="User avatar"
              class="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <p class="text-white font-medium">{{ userName }}</p>
            <p class="text-gray-400 text-sm">{{ userRole }}</p>
          </div>
        </div>
      </div>

      <!-- Navigation Menu -->
      <nav class="p-4">
        <ul class="space-y-2">
          <li v-for="item in navigationItems" :key="item.path">
            <!-- Menu Item -->
            <template v-if="!item.children">
              <router-link
                  :to="item.path"
                  class="flex items-center space-x-3 px-3 py-2 rounded-md transition-colors"
                  :class="[
                  isActiveRoute(item.path)
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                ]"
              >
                <i :class="['fas', item.icon]"></i>
                <span>{{ item.name }}</span>
              </router-link>
            </template>

            <!-- Menu Group -->
            <template v-else>
              <button
                  @click="toggleSubmenu(item.name)"
                  class="flex items-center justify-between w-full px-3 py-2 text-gray-300 hover:bg-gray-700 rounded-md transition-colors"
              >
                <div class="flex items-center space-x-3">
                  <i :class="['fas', item.icon]"></i>
                  <span>{{ item.name }}</span>
                </div>
                <i
                    class="fas fa-chevron-down transition-transform"
                    :class="{ 'rotate-180': openSubmenus.includes(item.name) }"
                ></i>
              </button>

              <!-- Submenu -->
              <ul
                  v-show="openSubmenus.includes(item.name)"
                  class="mt-2 ml-8 space-y-2"
              >
                <li v-for="child in item.children" :key="child.path">
                  <router-link
                      :to="child.path"
                      class="flex items-center space-x-3 px-3 py-2 rounded-md transition-colors"
                      :class="[
                      isActiveRoute(child.path)
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700'
                    ]"
                  >
                    <i :class="['fas', child.icon]"></i>
                    <span>{{ child.name }}</span>
                  </router-link>
                </li>
              </ul>
            </template>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <div
        :class="[
        'transition-all duration-300 ease-in-out',
        isSidebarOpen ? 'md:ml-64' : ''
      ]"
    >
      <!-- Header -->
      <header class="bg-white shadow-sm">
        <div class="flex items-center justify-between h-16 px-4">
          <!-- Toggle Sidebar Button -->
          <button
              @click="toggleSidebar"
              class="text-gray-500 hover:text-gray-700"
          >
            <i class="fas fa-bars text-xl"></i>
          </button>

          <!-- Header Right -->
          <div class="flex items-center space-x-4">
            <!-- Notifications -->
            <div class="relative">
              <button
                  @click="toggleNotifications"
                  class="relative text-gray-500 hover:text-gray-700"
              >
                <i class="fas fa-bell text-xl"></i>
                <span
                    v-if="unreadNotifications.length"
                    class="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
                >
                  {{ unreadNotifications.length }}
                </span>
              </button>

              <!-- Notifications Dropdown -->
              <div
                  v-show="isNotificationsOpen"
                  class="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1"
              >
                <div class="px-4 py-2 border-b border-gray-200">
                  <h3 class="font-medium">Thông báo</h3>
                </div>
                <div class="max-h-96 overflow-y-auto">
                  <template v-if="notifications.length">
                    <div
                        v-for="notification in notifications"
                        :key="notification.id"
                        class="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                        :class="{ 'bg-blue-50': !notification.isRead }"
                    >
                      <p class="text-sm text-gray-900">{{ notification.message }}</p>
                      <p class="text-xs text-gray-500 mt-1">
                        {{ formatDate(notification.createdAt) }}
                      </p>
                    </div>
                  </template>
                  <div v-else class="px-4 py-3 text-sm text-gray-500">
                    Không có thông báo mới
                  </div>
                </div>
              </div>
            </div>

            <!-- User Menu -->
            <div class="relative">
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

              <!-- User Dropdown -->
              <div
                  v-show="isUserMenuOpen"
                  class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1"
              >
                <router-link
                    to="/profile"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Thông tin cá nhân
                </router-link>
                <button
                    @click="handleLogout"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Breadcrumb -->
        <div class="px-4 py-2 bg-gray-50 border-t">
          <nav class="flex" aria-label="Breadcrumb">
            <ol class="flex items-center space-x-2">
              <li v-for="(item, index) in breadcrumbs" :key="index">
                <div class="flex items-center">
                  <template v-if="index > 0">
                    <i class="fas fa-chevron-right text-gray-400 mx-2"></i>
                  </template>
                  <router-link
                      v-if="item.to"
                      :to="item.to"
                      class="text-sm text-gray-500 hover:text-gray-700"
                  >
                    {{ item.title }}
                  </router-link>
                  <span
                      v-else
                      class="text-sm text-gray-900 font-medium"
                  >
                    {{ item.title }}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-4">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import { useUIStore } from '@/stores/ui.store'
import { formatDate } from '@/utils/format'
import type { BreadcrumbItem } from '@/router/types'

// Stores
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const uiStore = useUIStore()

// State
const isSidebarOpen = ref(true)
const isUserMenuOpen = ref(false)
const isNotificationsOpen = ref(false)
const openSubmenus = ref<string[]>([])

// Computed
const userAvatar = computed(() => authStore.user?.avatar || '/default-avatar.png')
const userName = computed(() => authStore.user?.fullName || '')
const userRole = computed(() => {
  const role = authStore.user?.role
  switch (role) {
    case 'ADMIN': return 'Quản trị viên'
    case 'WAREHOUSE': return 'Nhân viên kho'
    case 'SALES': return 'Nhân viên bán hàng'
    default: return ''
  }
})

const notifications = computed(() => uiStore.notifications)
const unreadNotifications = computed(() =>
    notifications.value.filter(n => !n.isRead)
)

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  // Implement breadcrumb logic based on current route
  return []
})

// Navigation items based on user role
const navigationItems = computed(() => {
  const role = authStore.user?.role

  const adminItems = [
    {
      path: '/admin',
      name: 'Dashboard',
      icon: 'fa-chart-line'
    },
    {
      name: 'Quản lý sản phẩm',
      icon: 'fa-box',
      children: [
        {
          path: '/admin/products',
          name: 'Danh sách sản phẩm',
          icon: 'fa-list'
        },
        {
          path: '/admin/products/create',
          name: 'Thêm sản phẩm',
          icon: 'fa-plus'
        }
      ]
    },
    {
      path: '/admin/orders',
      name: 'Quản lý đơn hàng',
      icon: 'fa-shopping-cart'
    },
    {
      path: '/admin/users',
      name: 'Quản lý người dùng',
      icon: 'fa-users'
    },
    {
      path: '/admin/inventory',
      name: 'Quản lý kho',
      icon: 'fa-warehouse'
    },
    {
      path: '/admin/receipts',
      name: 'Quản lý phiếu nhập',
      icon: 'fa-file-invoice'
    },
    {
      path: '/admin/partners',
      name: 'Quản lý đối tác',
      icon: 'fa-handshake'
    }
  ]

  const warehouseItems = [
    {
      path: '/warehouse',
      name: 'Dashboard',
      icon: 'fa-chart-line'
    },
    {
      path: '/warehouse/inventory',
      name: 'Quản lý kho',
      icon: 'fa-warehouse'
    },
    {
      path: '/warehouse/receipts',
      name: 'Quản lý phiếu nhập',
      icon: 'fa-file-invoice'
    }
  ]

  const salesItems = [
    {
      path: '/sales',
      name: 'Dashboard',
      icon: 'fa-chart-line'
    },
    {
      path: '/sales/orders',
      name: 'Quản lý đơn hàng',
      icon: 'fa-shopping-cart'
    }
  ]

  switch (role) {
    case 'ADMIN': return adminItems
    case 'WAREHOUSE': return warehouseItems
    case 'SALES': return salesItems
    default: return []
  }
})

// Methods
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value
  if (isUserMenuOpen.value) {
    isNotificationsOpen.value = false
  }
}

const toggleNotifications = () => {
  isNotificationsOpen.value = !isNotificationsOpen.value
  if (isNotificationsOpen.value) {
    isUserMenuOpen.value = false
  }
}

const toggleSubmenu = (name: string) => {
  const index = openSubmenus.value.indexOf(name)
  if (index === -1) {
    openSubmenus.value.push(name)
  } else {
    openSubmenus.value.splice(index, 1)
  }
}

const isActiveRoute = (path: string): boolean => {
  return route.path.startsWith(path)
}

const handleLogout = async () => {
  await authStore.logout()
  router.push('/auth/login')
}

// Close dropdowns when clicking outside
const closeDropdowns = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.user-menu')) {
    isUserMenuOpen.value = false
  }
  if (!target.closest('.notifications')) {
    isNotificationsOpen.value = false
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('click', closeDropdowns)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdowns)
})
</script>

<style scoped>
/* Add any additional styles here */
</style>