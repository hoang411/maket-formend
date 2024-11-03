<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="md:grid md:grid-cols-4 md:gap-6">
      <ProfileSidebar :user="user" />
      <ProfileContent
          :user="user"
          :isLoadingProfile="isLoadingProfile"
          @edit="handleEdit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import { useToast } from 'vue-toastification';
import ProfileSidebar from '@/components/profile/ProfileSidebar.vue';
import ProfileContent from '@/components/profile/ProfileContent.vue';

const authStore = useAuthStore();
const toast = useToast();

const user = computed(() => authStore.user);
const isLoadingProfile = computed(() => authStore.isLoadingProfile);

const handleEdit = () => {
  toast.info('Tính năng đang được phát triển');
};

onMounted(async () => {
  if (authStore.isAuthenticated) {
    try {
      await authStore.getUserProfile();
    } catch (error) {
      toast.error('Không thể tải thông tin người dùng');
    }
  }
});
</script>