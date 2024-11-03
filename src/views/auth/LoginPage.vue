<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Đăng nhập
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Hoặc
        <router-link
            to="/auth/register"
            class="font-medium text-indigo-600 hover:text-indigo-500"
        >
          đăng ký tài khoản mới
        </router-link>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <Input
              v-model="form.phone_number"
              label="Số điện thoại"
              type="tel"
              :error="errors.phone_number"
              required
              autocomplete="tel"
          />

          <Input
              v-model="form.password"
              label="Mật khẩu"
              type="password"
              :error="errors.password"
              required
              autocomplete="current-password"
          />

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                  id="remember_me"
                  v-model="form.remember"
                  type="checkbox"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                  for="remember_me"
                  class="ml-2 block text-sm text-gray-900"
              >
                Ghi nhớ đăng nhập
              </label>
            </div>

            <div class="text-sm">
              <router-link
                  to="/auth/forgot-password"
                  class="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Quên mật khẩu?
              </router-link>
            </div>
          </div>

          <Button
              type="submit"
              :loading="isLoading"
              full-width
          >
            Đăng nhập
          </Button>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">
                Hoặc đăng nhập với
              </span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-3">
            <Button
                type="button"
                variant="secondary"
                full-width
                @click="handleGoogleLogin"
            >
              <img
                  src="@/assets/google.svg"
                  alt="Google"
                  class="h-5 w-5 mr-2"
              />
              Google
            </Button>

            <Button
                type="button"
                variant="secondary"
                full-width
                @click="handleFacebookLogin"
            >
              <img
                  src="@/assets/facebook.svg"
                  alt="Facebook"
                  class="h-5 w-5 mr-2"
              />
              Facebook
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import { useToastStore } from '@/stores/toast.store';
import { validation } from '@/utils/validation';
import Button from '@/components/common/Button.vue';
import Input from '@/components/common/Input.vue';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const toastStore = useToastStore();

const isLoading = ref(false);

const form = ref({
  phone_number: '',
  password: '',
  remember: false
});

const errors = ref({
  phone_number: '',
  password: ''
});

const validateForm = () => {
  let isValid = true;
  errors.value = {
    phone_number: '',
    password: ''
  };

  if (!validation.required(form.value.phone_number)) {
    errors.value.phone_number = 'Vui lòng nhập số điện thoại';
    isValid = false;
  } else if (!validation.phone(form.value.phone_number)) {
    errors.value.phone_number = 'Số điện thoại không hợp lệ';
    isValid = false;
  }

  if (!validation.required(form.value.password)) {
    errors.value.password = 'Vui lòng nhập mật khẩu';
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  isLoading.value = true;
  try {
    await authStore.login(form.value.phone_number, form.value.password);

    const redirectPath = route.query.redirect as string;
    router.push(redirectPath || '/');
  } catch (error: any) {
    toastStore.showError(error.message || 'Đăng nhập thất bại');
  } finally {
    isLoading.value = false;
  }
};

const handleGoogleLogin = () => {
  // Implement Google login
  toastStore.showInfo('Tính năng đang được phát triển');
};

const handleFacebookLogin = () => {
  // Implement Facebook login
  toastStore.showInfo('Tính năng đang được phát triển');
};
</script>