<!-- src/components/ui/BaseToast.vue -->
<template>
  <TransitionGroup
      tag="div"
      class="fixed z-50 flex flex-col items-end space-y-4 p-6"
      :class="positionClasses[position]"
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
  >
    <div
        v-for="toast in toasts"
        :key="toast.id"
        class="w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
    >
      <div class="p-4">
        <div class="flex items-start">
          <!-- Icon -->
          <div v-if="toast.icon || defaultIcons[toast.variant]" class="flex-shrink-0">
            <i
                :class="[
                'fas',
                toast.icon || defaultIcons[toast.variant],
                'h-6 w-6',
                iconColorClasses[toast.variant]
              ]"
            ></i>
          </div>

          <!-- Content -->
          <div class="ml-3 w-0 flex-1 pt-0.5">
            <p
                v-if="toast.title"
                class="text-sm font-medium text-gray-900"
            >
              {{ toast.title }}
            </p>
            <p
                class="mt-1 text-sm text-gray-500"
                :class="{ 'mt-0': !toast.title }"
            >
              {{ toast.message }}
            </p>
          </div>

          <!-- Close Button -->
          <div class="ml-4 flex flex-shrink-0">
            <button
                type="button"
                class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                @click="removeToast(toast.id)"
            >
              <span class="sr-only">Close</span>
              <i class="fas fa-times h-5 w-5"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Progress Bar -->
      <div
          v-if="toast.timeout > 0"
          class="h-1 bg-gray-100"
      >
        <div
            class="h-full transition-all duration-300"
            :class="[
            progressColorClasses[toast.variant],
            { 'w-0': toast.progress === 0 }
          ]"
            :style="{ width: `${toast.progress}%` }"
        ></div>
      </div>
    </div>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

type ToastVariant = 'info' | 'success' | 'warning' | 'error'
type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

interface Toast {
  id: number
  title?: string
  message: string
  variant?: ToastVariant
  icon?: string
  timeout?: number
  progress: number
}

interface Props {
  position?: ToastPosition
  maxToasts?: number
}

const props = withDefaults(props<Props>(), {
  position: 'top-right',
  maxToasts: 5
})

// State
const toasts = ref<Toast[]>([])
const counter = ref(0)
const progressIntervals: Record<number, NodeJS.Timer> = {}

// Position Classes
const positionClasses: Record<ToastPosition, string> = {
  'top-right': 'top-0 right-0',
  'top-left': 'top-0 left-0',
  'bottom-right': 'bottom-0 right-0',
  'bottom-left': 'bottom-0 left-0'
}

// Default Icons
const defaultIcons: Record<ToastVariant, string> = {
  info: 'fa-info-circle',
  success: 'fa-check-circle',
  warning: 'fa-exclamation-triangle',
  error: 'fa-times-circle'
}

// Color Classes
const iconColorClasses: Record<ToastVariant, string> = {
  info: 'text-blue-500',
  success: 'text-green-500',
  warning: 'text-yellow-500',
  error: 'text-red-500'
}

const progressColorClasses: Record<ToastVariant, string> = {
  info: 'bg-blue-500',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  error: 'bg-red-500'
}

// Methods
const addToast = (toast: Omit<Toast, 'id' | 'progress'>) => {
  const id = ++counter.value
  const newToast = {
    id,
    variant: 'info' as ToastVariant,
    timeout: 5000,
    progress: 100,
    ...toast
  }

  toasts.value.unshift(newToast)

  if (toasts.value.length > props.maxToasts) {
    const removedToast = toasts.value.pop()
    if (removedToast) {
      clearInterval(progressIntervals[removedToast.id])
      delete progressIntervals[removedToast.id]
    }
  }

  if (newToast.timeout > 0) {
    const startTime = Date.now()
    const endTime = startTime + newToast.timeout

    progressIntervals[id] = setInterval(() => {
      const now = Date.now()
      const remaining = endTime - now
      const progress = (remaining / newToast.timeout) * 100

      if (progress <= 0) {
        removeToast(id)
      } else {
        const toast = toasts.value.find(t => t.id === id)
        if (toast) {
          toast.progress = progress
        }
      }
    }, 10)
  }
}

const removeToast = (id: number) => {
  const index = toasts.value.findIndex(toast => toast.id === id)
  if (index > -1) {
    clearInterval(progressIntervals[id])
    delete progressIntervals[id]
    toasts.value.splice(index, 1)
  }
}

// Lifecycle
onUnmounted(() => {
  Object.values(progressIntervals).forEach(clearInterval)
})

// Expose methods
defineExpose({
  addToast,
  removeToast
})
</script>