<template>
  <div class="mt-5 md:mt-0 md:col-span-3">
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900 mb-4">
          Thông tin cá nhân
        </h3>

        <div v-if="isLoadingProfile" class="text-center py-4">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          <p class="mt-2 text-sm text-gray-500">Đang tải thông tin...</p>
        </div>

        <div v-else-if="user" class="space-y-6">
          <div class="grid grid-cols-6 gap-6">
            <div class="col-span-6 sm:col-span-3">
              <label class="block text-sm font-medium text-gray-700">Họ và tên</label>
              <div class="mt-1 p-2 bg-gray-50 rounded-md">{{ user.full_name }}</div>
            </div>

            <div class="col-span-6 sm:col-span-3">
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <div class="mt-1 p-2 bg-gray-50 rounded-md">{{ user.email }}</div>
            </div>

            <div class="col-span-6 sm:col-span-3">
              <label class="block text-sm font-medium text-gray-700">Số điện thoại</label>
              <div class="mt-1 p-2 bg-gray-50 rounded-md">{{ user.phone_number }}</div>
            </div>

            <div class="col-span-6 sm:col-span-3">
              <label class="block text-sm font-medium text-gray-700">Ngày sinh</label>
              <div class="mt-1 p-2 bg-gray-50 rounded-md">
                {{ formatDate(user.date_of_birth) }}
              </div>
            </div>

            <div class="col-span-6">
              <label class="block text-sm font-medium text-gray-700">Địa chỉ</label>
              <div class="mt-1 p-2 bg-gray-50 rounded-md">{{ user.address }}</div>
            </div>
          </div>

          <div class="flex justify-end">
            <button
                type="button"
                @click="$emit('edit')"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Chỉnh sửa thông tin
            </button>
          </div>
        </div>

        <div v-else class="text-center py-4">
          <p class="text-sm text-gray-500">Không có thông tin người dùng</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/types/user.types';

const props = defineProps<{
  user: User | null;
  isLoadingProfile: boolean;
}>();

defineEmits<{
  (e: 'edit'): void;
}>();

const formatDate = (dateString?: string) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('vi-VN');
};
</script>