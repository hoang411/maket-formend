<!-- src/components/ui/BaseDialog.vue -->
<template>
  <BaseModal
      v-model="isOpen"
      :title="title"
      :size="size"
      :centered="centered"
      :show-close="showClose"
      :close-on-click-outside="closeOnClickOutside"
      :close-on-esc="closeOnEsc"
      @close="handleClose"
  >
    <!-- Content -->
    <div class="sm:flex sm:items-start">
      <!-- Icon -->
      <div
          v-if="icon"
          :class="[
          'mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10',
          iconBackgroundClass
        ]"
      >
        <i
            :class="[
            'fas',
            icon,
            'h-6 w-6 text-white'
          ]"
        ></i>
      </div>

      <!-- Message -->
      <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
        <h3
            v-if="title"
            class="text-lg font-medium leading-6 text-gray-900"
        >
          {{ title }}
        </h3>
        <div class="mt-2">
          <p class="text-sm text-gray-500">
            {{ message }}
          </p>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <template #footer>
      <button
          v-if="showConfirm"
          type="button"
          :class="[
          'inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto',
          confirmButtonClass
        ]"
          @click="confirm"
      >
        {{ confirmText }}
      </button>
      <button
          v-if="showCancel"
          type="button"
          class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          @click="cancel"
      >
        {{ cancelText }}
      </button>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseModal from './BaseModal.vue'

type DialogType = 'info' | 'success' | 'warning' | 'error'
type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

interface Props {
  modelValue: boolean
  type?: DialogType
  title?: string
  message: string
  icon?: string
  size?: ModalSize
  centered?: boolean
  showClose?: boolean
  closeOnClickOutside?: boolean
  closeOnEsc?: boolean
  showConfirm?: boolean
  showCancel?: boolean
  confirmText?: string
  cancelText?: string
}

const props = withDefaults(props<Props>(), {
  type: 'info',
  size: 'sm',
  centered: true,
  showClose: false,
  closeOnClickOutside: false,
  closeOnEsc: true,
  showConfirm: true,
  showCancel: true,
  confirmText: 'Confirm',
  cancelText: 'Cancel'
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

// State
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// Default Icons
const defaultIcons: Record<DialogType, string> = {
  info: 'fa-info',
  success: 'fa-check',
  warning: 'fa-exclamation',
  error: 'fa-times'
}

// Computed
const iconBackgroundClass = computed(() => {
  const classes: Record<DialogType, string> = {
    info: 'bg-blue-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    error: 'bg-red-600'
  }
  return classes[props.type]
})

const confirmButtonClass = computed(() => {
  const classes: Record<DialogType, string> = {
    info: 'bg-blue-600 hover:bg-blue-500',
    success: 'bg-green-600 hover:bg-green-500',
    warning: 'bg-yellow-600 hover:bg-yellow-500',
    error: 'bg-red-600 hover:bg-red-500'
  }
  return classes[props.type]
})

// Methods
const confirm = () => {
  emit('confirm')
  isOpen.value = false
}

const cancel = () => {
  emit('cancel')
  isOpen.value = false
}

const handleClose = () => {
  emit('cancel')
}
</script>