<template>
  <div class="md:col-span-1">
    <div class="bg-white shadow rounded-lg p-4">
      <div class="flex items-center space-x-4 mb-6 p-2">
        <div class="relative">
          <img
              :src="user?.avatar || '/default-avatar.png'"
              alt="Avatar"
              class="h-16 w-16 rounded-full object-cover"
          />
          <div class="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-green-400"></div>
        </div>
        <div>
          <h2 class="text-lg font-medium text-gray-900">{{ user?.full_name }}</h2>
          <p class="text-sm text-gray-500">{{ user?.email }}</p>
        </div>
      </div>

      <nav class="space-y-2">
        <router-link
            to="/profile"
            class="flex items-center px-4 py-2 text-sm font-medium rounded-md"
            :class="[
            isActive('profile')
              ? 'text-gray-900 bg-gray-50'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          ]"
        >
          <svg class="mr-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Hồ sơ của tôi
        </router-link>

        <router-link
            to="/profile/orders"
            class="flex items-center px-4 py-2 text-sm font-medium rounded-md"
            :class="[
            isActive('orders')
              ? 'text-gray-900 bg-gray-50'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          ]"
        >
          <svg class="mr-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          Đơn hàng của tôi
        </router-link>

        <router-link
            to="/profile/settings"
            class="flex items-center px-4 py-2 text-sm font-medium rounded-md"
            :class="[
            isActive('settings')
              ? 'text-gray-900 bg-gray-50'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          ]"
        >
          <svg class="mr-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Cài đặt
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import type { User } from '@/types/user.types';

const props = defineProps<{
  user: User | null;
}>();

const route = useRoute();

const isActive = (path: string) => {
  return route.path.includes(path);
};
</script>