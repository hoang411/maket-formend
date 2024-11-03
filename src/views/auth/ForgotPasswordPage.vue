<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Quên mật khẩu
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Nhập email của bạn để nhận liên kết đặt lại mật khẩu
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <Input
              v-model="email"
              label="Email"
              type="email"
              :error="error"
              required
              autocomplete="email"
          />

          <div class="flex items-center justify-between">
            <router-link
                to="/auth/login"
                class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Quay lại đăng nhập
            </router-link>
          </div>

          <Button
              type="submit"
              :loading="isLoading"
              full-width
          >
            Gửi liên kết
          </Button>
        </form>
      </div>
    </div>

    <!-- Success Modal -->
    <Modal
        :is-open="showSuccessModal"
        title="Gửi email thành công"
        @close="handleCloseSuccessModal"
    >
      <div class="text-sm text-gray-500">
        <p>
          Chúng tôi đã gửi một email chứa liên kết đặt lại mật khẩu đến địa chỉ
          <span class="font-medium text-gray-900">{{ email }}</span>
        </p>
        <p class="mt-2">
          Vui lòng kiểm tra hộp thư đến và làm theo hướng dẫn để đặt lại mật khẩu.
        </p>
        <p class="mt-2">
          Nếu bạn không nhận được email, vui lòng kiểm tra thư mục spam hoặc thử lại sau.
        </p>
      </div>
      <template #footer>
        <div class="flex justify-end">
          <Button @click="handleCloseSuccessModal">
            Đã hiểu
          </Button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import { useToastStore } from '@/stores/toast.store';
import { validation } from '@/utils/validation';
import Button from '@/components/common/Button.vue';
import Input from '@/components/common/Input.vue';
import Modal from '@/components/common/Modal.vue';

const router = useRouter();
const authStore = useAuthStore();
const toastStore = useToastStore();

const email = ref('');
const error = ref('');
const isLoading = ref(false);
const showSuccessModal = ref(false);

const validateForm = () => {
  error.value = '';

  if (!validation.required(email.value)) {
    error.value = 'Vui lòng nhập email';
    return false;
  }

  if (!validation.email(email.value)) {
    error.value = 'Email không hợp lệ';
    return false;
  }

  return true;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  isLoading.value = true;
  try {
    await authStore.forgotPassword(email.value);
    showSuccessModal.value = true;
  } catch (error: any) {
    toastStore.showError(error.message || 'Có lỗi xảy ra khi gửi email');
  } finally {
    isLoading.value = false;
  }
};

const handleCloseSuccessModal = () => {
  showSuccessModal.value = false;
  router.push('/auth/login');
};
</script>