<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Đăng ký tài khoản
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Hoặc
        <router-link
            to="/auth/login"
            class="font-medium text-indigo-600 hover:text-indigo-500"
        >
          đăng nhập nếu đã có tài khoản
        </router-link>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <Input
              v-model="form.full_name"
              label="Họ và tên"
              :error="errors.full_name"
              required
              autocomplete="name"
          />

          <Input
              v-model="form.phone_number"
              label="Số điện thoại"
              type="tel"
              :error="errors.phone_number"
              required
              autocomplete="tel"
          />

          <Input
              v-model="form.email"
              label="Email"
              type="email"
              :error="errors.email"
              required
              autocomplete="email"
          />

          <Input
              v-model="form.password"
              label="Mật khẩu"
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

          <div class="flex items-center">
            <input
                id="terms"
                v-model="form.agree_terms"
                type="checkbox"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                required
            />
            <label for="terms" class="ml-2 block text-sm text-gray-900">
              Tôi đồng ý với
              <a
                  href="#"
                  class="font-medium text-indigo-600 hover:text-indigo-500"
                  @click.prevent="showTerms = true"
              >
                điều khoản sử dụng
              </a>
              và
              <a
                  href="#"
                  class="font-medium text-indigo-600 hover:text-indigo-500"
                  @click.prevent="showPrivacy = true"
              >
                chính sách bảo mật
              </a>
            </label>
          </div>

          <Button
              type="submit"
              :loading="isLoading"
              full-width
          >
            Đăng ký
          </Button>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">
                Hoặc đăng ký với
              </span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-3">
            <Button
                type="button"
                variant="secondary"
                full-width
                @click="handleGoogleRegister"
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
                @click="handleFacebookRegister"
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

    <!-- Terms Modal -->
    <Modal
        :is-open="showTerms"
        title="Điều khoản sử dụng"
        @close="showTerms = false"
    >
      <div class="prose prose-sm">
        <h3>1. Điều khoản chung</h3>
        <p>
          Bằng việc truy cập và sử dụng website này, bạn đồng ý tuân thủ và chịu
          ràng buộc bởi các điều khoản và điều kiện sau đây.
        </p>
        <!-- Add more terms content -->
      </div>
    </Modal>

    <!-- Privacy Modal -->
    <Modal
        :is-open="showPrivacy"
        title="Chính sách bảo mật"
        @close="showPrivacy = false"
    >
      <div class="prose prose-sm">
        <h3>1. Thu thập thông tin</h3>
        <p>
          Chúng tôi thu thập các thông tin khi bạn đăng ký tài khoản, đăng nhập
          và sử dụng các dịch vụ trên website.
        </p>
        <!-- Add more privacy content -->
      </div>
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

const isLoading = ref(false);
const showTerms = ref(false);
const showPrivacy = ref(false);

const form = ref({
  full_name: '',
  phone_number: '',
  email: '',
  password: '',
  password_confirmation: '',
  agree_terms: false
});

const errors = ref({
  full_name: '',
  phone_number: '',
  email: '',
  password: '',
  password_confirmation: ''
});

const validateForm = () => {
  let isValid = true;
  errors.value = {
    full_name: '',
    phone_number: '',
    email: '',
    password: '',
    password_confirmation: ''
  };

  if (!validation.required(form.value.full_name)) {
    errors.value.full_name = 'Vui lòng nhập họ tên';
    isValid = false;
  }

  if (!validation.required(form.value.phone_number)) {
    errors.value.phone_number = 'Vui lòng nhập số điện thoại';
    isValid = false;
  } else if (!validation.phone(form.value.phone_number)) {
    errors.value.phone_number = 'Số điện thoại không hợp lệ';
    isValid = false;
  }

  if (!validation.required(form.value.email)) {
    errors.value.email = 'Vui lòng nhập email';
    isValid = false;
  } else if (!validation.email(form.value.email)) {
    errors.value.email = 'Email không hợp lệ';
    isValid = false;
  }

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

  if (!form.value.agree_terms) {
    toastStore.showError('Vui lòng đồng ý với điều khoản sử dụng và chính sách bảo mật');
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  isLoading.value = true;
  try {
    await authStore.register({
      full_name: form.value.full_name,
      phone_number: form.value.phone_number,
      email: form.value.email,
      password: form.value.password,
      password_confirmation: form.value.password_confirmation
    });

    toastStore.showSuccess('Đăng ký thành công');
    router.push('/auth/login');
  } catch (error: any) {
    toastStore.showError(error.message || 'Đăng ký thất bại');
  } finally {
    isLoading.value = false;
  }
};

const handleGoogleRegister = () => {
  // Implement Google registration
  toastStore.showInfo('Tính năng đang được phát triển');
};

const handleFacebookRegister = () => {
  // Implement Facebook registration
  toastStore.showInfo('Tính năng đang được phát triển');
};
</script>