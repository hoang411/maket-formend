<template>
  <Modal
      :is-open="isOpen"
      title="Đổi mật khẩu"
      @close="handleClose"
  >
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <Input
          v-model="form.current_password"
          label="Mật khẩu hiện tại"
          type="password"
          :error="errors.current_password"
          required
      />

      <Input
          v-model="form.new_password"
          label="Mật khẩu mới"
          type="password"
          :error="errors.new_password"
          required
      />

      <Input
          v-model="form.new_password_confirmation"
          label="Xác nhận mật khẩu mới"
          type="password"
          :error="errors.new_password_confirmation"
          required
      />

      <template #footer>
        <div class="flex justify-end space-x-3">
          <Button
              type="button"
              variant="secondary"
              :disabled="isLoading"
              @click="handleClose"
          >
            Hủy
          </Button>
          <Button
              type="submit"
              :loading="isLoading"
          >
            Xác nhận
          </Button>
        </div>
      </template>
    </form>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import { useToastStore } from '@/stores/toast.store';
import Modal from '@/components/common/Modal.vue';
import Button from '@/components/common/Button.vue';
import Input from '@/components/common/Input.vue';

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'success'): void;
}>();

const authStore = useAuthStore();
const toastStore = useToastStore();

const isLoading = ref(false);

const form = ref({
  current_password: '',
  new_password: '',
  new_password_confirmation: ''
});

const errors = ref({
  current_password: '',
  new_password: '',
  new_password_confirmation: ''
});

const resetForm = () => {
  form.value = {
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
  };
  errors.value = {
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
  };
};

const handleClose = () => {
  resetForm();
  emit('close');
};

const validateForm = () => {
  let isValid = true;
  errors.value = {
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
  };

  if (!form.value.current_password) {
    errors.value.current_password = 'Vui lòng nhập mật khẩu hiện tại';
    isValid = false;
  }

  if (!form.value.new_password) {
    errors.value.new_password = 'Vui lòng nhập mật khẩu mới';
    isValid = false;
  }

  if (!form.value.new_password_confirmation) {
    errors.value.new_password_confirmation = 'Vui lòng xác nhận mật khẩu mới';
    isValid = false;
  }

  if (form.value.new_password !== form.value.new_password_confirmation) {
    errors.value.new_password_confirmation = 'Mật khẩu xác nhận không khớp';
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  isLoading.value = true;
  try {
    await authStore.changePassword(
        form.value.current_password,
        form.value.new_password
    );

    toastStore.showSuccess('Đổi mật khẩu thành công');
    emit('success');
    handleClose();
  } catch (error: any) {
    toastStore.showError(error.message || 'Có lỗi xảy ra khi đổi mật khẩu');
  } finally {
    isLoading.value = false;
  }
};
</script>