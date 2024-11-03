<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Đặt lại mật khẩu
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Nhập mật khẩu mới cho tài khoản của bạn
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <Input
              v-model="form.password"
              label="Mật khẩu mới"
              type="password"
              :error="errors.password"
              required
              autocomplete="new-password"
          />

          <Input
              v-model="form.password_confirmation"
              label="Xác nhận mật khẩu"
              type="password"
              :error="errors.password_confirmation"
              required
              autocomplete="new-password"
          />

          <Button
              type="submit"
              :loading="isLoading"
              full-width
          >
            Đặt lại mật khẩu
          </Button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import { useToastStore } from '@/stores/toast.store';
import { validation } from '@/utils/validation';
import Button from '@/components/common/Button.vue';
import Input from '@/components/common/Input.vue';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const toastStore = useToastStore();

const token = ref('');
const isLoading = ref(false);

const form = ref({
  password: '',
  password_confirmation: ''
});

const errors = ref({
  password: '',
  password_confirmation: ''
});

const validateForm = () => {
  let isValid = true;
  errors.value = {
    password: '',
    password_confirmation: ''
  };

  if (!validation.required(form.value.password)) {
    errors.value.password = 'Vui lòng nhập mật khẩu';
    isValid = false;
  } else if (!validation.password(form.value.password)) {
    errors.value.password = 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số';
    isValid = false;
  }

  if (!validation.required(form.value.password_confirmation)) {
    errors.value.password_confirmation = 'Vui lòng xác nhận mật khẩu';
    isValid = false;
  } else if (form.value.password !== form.value.password_confirmation) {
    errors.value.password_confirmation = 'Mật khẩu xác nhận không khớp';
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  isLoading.value = true;
  try {
    await authStore.resetPassword({
      token: token.value,
      password: form.value.password
    });

    toastStore.showSuccess('Đặt lại mật khẩu thành công');
    router.push('/auth/login');
  } catch (error: any) {
    toastStore.showError(error.message || 'Có lỗi xảy ra khi đặt lại mật khẩu');
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  token.value = route.query.token as string;
  if (!token.value) {
    toastStore.showError('Liên kết đặt lại mật khẩu không hợp lệ');
    router.push('/auth/login');
  }
});
</script>