<!-- src/layouts/AuthLayout.vue -->
<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <!-- Logo -->
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <router-link to="/">
        <img
            src="@/assets/logo.png"
            alt="Logo"
            class="mx-auto h-12 w-auto"
        />
      </router-link>
    </div>

    <!-- Auth Card -->
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <!-- Auth Navigation -->
        <div class="mb-8 border-b border-gray-200">
          <nav class="-mb-px flex space-x-8" aria-label="Tabs">
            <router-link
                v-for="item in navigationItems"
                :key="item.name"
                :to="item.to"
                class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                :class="[
                route.name === item.name
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              {{ item.label }}
            </router-link>
          </nav>
        </div>

        <!-- Auth Form Container -->
        <div>
          <Transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
          >
            <router-view v-slot="{ Component }">
              <component :is="Component" />
            </router-view>
          </Transition>
        </div>

        <!-- Divider -->
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">
                Hoặc tiếp tục với
              </span>
            </div>
          </div>
        </div>

        <!-- Social Login -->
        <div class="mt-6 grid grid-cols-2 gap-3">
          <button
              type="button"
              class="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              @click="handleSocialLogin('google')"
          >
            <img
                src="@/assets/icons/google.svg"
                alt="Google"
                class="h-5 w-5 mr-2"
            />
            Google
          </button>

          <button
              type="button"
              class="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              @click="handleSocialLogin('facebook')"
          >
            <img
                src="@/assets/icons/facebook.svg"
                alt="Facebook"
                class="h-5 w-5 mr-2"
            />
            Facebook
          </button>
        </div>

        <!-- Back to Home -->
        <div class="mt-6 text-center">
          <router-link
              to="/"
              class="text-sm text-gray-600 hover:text-primary-500"
          >
            ← Quay về trang chủ
          </router-link>
        </div>
      </div>
    </div>

    <!-- Footer Links -->
    <div class="mt-8 text-center text-sm text-gray-600">
      <router-link
          v-for="item in footerLinks"
          :key="item.to"
          :to="item.to"
          class="hover:text-primary-500 mx-2"
      >
        {{ item.label }}
      </router-link>
    </div>
  </div>

  <!-- Loading Overlay -->
  <Transition
      enter-active-class="transition-opacity ease-linear duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity ease-linear duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
  >
    <div
        v-if="loading"
        class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
    >
      <div class="bg-white p-4 rounded-full">
        <svg
            class="animate-spin h-8 w-8 text-primary-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
          <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
          />
          <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    </div>
  </Transition>

  <!-- Notification -->
  <Transition
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
  >
    <div
        v-if="notification"
        class="fixed bottom-0 right-0 m-4 max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden z-50"
    >
      <div class="p-4">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <i
                :class="[
                'fas',
                notification.type === 'success' ? 'fa-check-circle text-green-400' :
                notification.type === 'error' ? 'fa-times-circle text-red-400' :
                'fa-exclamation-circle text-yellow-400'
              ]"
            ></i>
          </div>
          <div class="ml-3 w-0 flex-1 pt-0.5">
            <p class="text-sm font-medium text-gray-900">
              {{ notification.message }}
            </p>
          </div>
          <div class="ml-4 flex-shrink-0 flex">
            <button
                type="button"
                class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                @click="clearNotification"
            >
              <span class="sr-only">Đóng</span>
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import { useUIStore } from '@/stores/ui.store'

// Stores
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const uiStore = useUIStore()

// Computed
const loading = computed(() => uiStore.loading.global)
const notification = computed(() => uiStore.notifications[0])

// Navigation Items
const navigationItems = [
  {
    name: 'login',
    to: '/auth/login',
    label: 'Đăng nhập'
  },
  {
    name: 'register',
    to: '/auth/register',
    label: 'Đăng ký'
  }
]

// Footer Links
const footerLinks = [
  {
    to: '/privacy',
    label: 'Chính sách bảo mật'
  },
  {
    to: '/terms',
    label: 'Điều khoản sử dụng'
  },
  {
    to: '/contact',
    label: 'Liên hệ'
  }
]

// Methods
const handleSocialLogin = async (provider: 'google' | 'facebook') => {
  try {
    await authStore.socialLogin(provider)
    router.push('/')
  } catch (error) {
    console.error('Social login failed:', error)
  }
}

const clearNotification = () => {
  uiStore.removeNotification(notification.value?.id)
}
</script>

<style scoped>
/* Add any additional styles here */
</style>