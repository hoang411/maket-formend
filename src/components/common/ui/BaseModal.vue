<!-- src/components/ui/BaseModal.vue -->
<template>
  <Teleport to="body">
    <Transition
        enter-active-class="ease-out duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="ease-in duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
      <!-- Backdrop -->
      <div
          v-if="modelValue"
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          :class="{ 'cursor-pointer': closeOnClickOutside }"
          @click="handleBackdropClick"
      ></div>
    </Transition>

    <Transition
        enter-active-class="ease-out duration-300"
        enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enter-to-class="opacity-100 translate-y-0 sm:scale-100"
        leave-active-class="ease-in duration-200"
        leave-from-class="opacity-100 translate-y-0 sm:scale-100"
        leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    >
      <div
          v-if="modelValue"
          class="fixed inset-0 z-50 overflow-y-auto"
          @click.self="handleBackdropClick"
      >
        <div
            class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
            :class="{ 'items-center': centered }"
        >
          <!-- Modal Panel -->
          <div
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8"
              :class="[
              sizeClasses[size],
              { 'w-full': fullWidth }
            ]"
          >
            <!-- Close Button -->
            <div
                v-if="showClose"
                class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block"
            >
              <button
                  type="button"
                  class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  @click="close"
              >
                <span class="sr-only">Close</span>
                <i class="fas fa-times h-6 w-6"></i>
              </button>
            </div>

            <!-- Header -->
            <div
                v-if="$slots.header || title"
                class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4"
            >
              <slot name="header">
                <h3 class="text-lg font-medium leading-6 text-gray-900">
                  {{ title }}
                </h3>
              </slot>
            </div>

            <!-- Content -->
            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <slot></slot>
            </div>

            <!-- Footer -->
            <div
                v-if="$slots.footer"
                class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
            >
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'

interface Props {
  modelValue: boolean
  title?: string
  size?: ModalSize
  fullWidth?: boolean
  centered?: boolean
  showClose?: boolean
  closeOnClickOutside?: boolean
  closeOnEsc?: boolean
}

const props = withDefaults(props<Props>(), {
  size: 'md',
  fullWidth: false,
  centered: true,
  showClose: true,
  closeOnClickOutside: true,
  closeOnEsc: true
})

const emit = defineEmits(['update:modelValue', 'close'])

// Size Classes
const sizeClasses: Record<ModalSize, string> = {
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
  xl: 'sm:max-w-xl',
  '2xl': 'sm:max-w-2xl',
  full: 'sm:max-w-full sm:m-4'
}

// Methods
const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleBackdropClick = () => {
  if (props.closeOnClickOutside) {
    close()
  }
}

const handleEscKey = (event: KeyboardEvent) => {
  if (props.closeOnEsc && event.key === 'Escape' && props.modelValue) {
    close()
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('keydown', handleEscKey)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscKey)
})

// Watch for changes
watch(() => props.modelValue, (value) => {
  if (value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>