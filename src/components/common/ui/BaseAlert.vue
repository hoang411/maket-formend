<!-- src/components/ui/BaseAlert.vue -->
<template>
  <Transition
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
  >
    <div
        v-if="modelValue"
        :class="[
        'rounded-md p-4',
        colorClasses[variant].bg,
        { 'border': bordered }
      ]"
    >
      <div class="flex">
        <!-- Icon -->
        <div v-if="icon || $slots.icon" class="flex-shrink-0">
          <slot name="icon">
            <i
                :class="[
                'fas',
                icon || defaultIcons[variant],
                'h-5 w-5',
                colorClasses[variant].text
              ]"
            ></i>
          </slot>
        </div>

        <!-- Content -->
        <div class="ml-3 flex-1">
          <!-- Title -->
          <h3
              v-if="title"
              :class="[
              'text-sm font-medium',
              colorClasses[variant].title
            ]"
          >
            {{ title }}
          </h3>

          <!-- Message -->
          <div
              :class="[
              'text-sm',
              colorClasses[variant].text,
              { 'mt-2': title }
            ]"
          >
            <slot>{{ message }}</slot>
          </div>

          <!-- Actions -->
          <div v-if="$slots.actions" class="mt-4">
            <div class="-mx-2 -my-1.5 flex">
              <slot name="actions"></slot>
            </div>
          </div>
        </div>

        <!-- Close Button -->
        <div v-if="dismissible" class="ml-auto pl-3">
          <div class="-mx-1.5 -my-1.5">
            <button
                type="button"
                :class="[
                'inline-flex rounded-md p-1.5',
                colorClasses[variant].close
              ]"
                @click="dismiss"
            >
              <span class="sr-only">Dismiss</span>
              <i class="fas fa-times h-5 w-5"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
type AlertVariant = 'info' | 'success' | 'warning' | 'error'

interface Props {
  modelValue: boolean
  title?: string
  message?: string
  variant?: AlertVariant
  icon?: string
  dismissible?: boolean
  bordered?: boolean
  timeout?: number
}

const props = withDefaults(props<Props>(), {
  variant: 'info',
  dismissible: true,
  bordered: false,
  timeout: 0
})

const emit = defineEmits(['update:modelValue', 'dismiss'])

// Default Icons
const defaultIcons: Record<AlertVariant, string> = {
  info: 'fa-info-circle',
  success: 'fa-check-circle',
  warning: 'fa-exclamation-triangle',
  error: 'fa-times-circle'
}

// Color Classes
const colorClasses: Record<AlertVariant, Record<string, string>> = {
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    title: 'text-blue-800',
    text: 'text-blue-700',
    close: 'bg-blue-50 text-blue-500 hover:bg-blue-100 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2'
  },
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    title: 'text-green-800',
    text: 'text-green-700',
    close: 'bg-green-50 text-green-500 hover:bg-green-100 focus:ring-2 focus:ring-green-400 focus:ring-offset-2'
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    title: 'text-yellow-800',
    text: 'text-yellow-700',
    close: 'bg-yellow-50 text-yellow-500 hover:bg-yellow-100 focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2'
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    title: 'text-red-800',
    text: 'text-red-700',
    close: 'bg-red-50 text-red-500 hover:bg-red-100 focus:ring-2 focus:ring-red-400 focus:ring-offset-2'
  }
}

// Methods
const dismiss = () => {
  emit('update:modelValue', false)
  emit('dismiss')
}

// Auto-dismiss
if (props.timeout > 0) {
  watch(() => props.modelValue, (value) => {
    if (value) {
      setTimeout(() => {
        dismiss()
      }, props.timeout)
    }
  }, { immediate: true })
}
</script>