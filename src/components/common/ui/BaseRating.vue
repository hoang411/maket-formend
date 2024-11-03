<!-- src/components/ui/BaseRating.vue -->
<template>
  <div>
    <!-- Label -->
    <label
        v-if="label"
        :id="id"
        class="block text-sm font-medium text-gray-700 mb-1"
    >
      {{ label }}
    </label>

    <!-- Rating Stars -->
    <div
        class="flex items-center"
        :class="{ 'opacity-50 cursor-not-allowed': disabled }"
    >
      <div class="flex space-x-1">
        <button
            v-for="index in maxRating"
            :key="index"
            type="button"
            :disabled="disabled"
            class="focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full p-1"
            @click="!disabled && updateRating(index)"
            @mouseenter="!disabled && (hoverRating = index)"
            @mouseleave="!disabled && (hoverRating = 0)"
        >
          <span class="sr-only">Rate {{ index }} out of {{ maxRating }}</span>
          <i
              :class="[
              'text-xl',
              {
                [filledIcon]: index <= (hoverRating || modelValue),
                [emptyIcon]: index > (hoverRating || modelValue),
                'text-yellow-400': index <= (hoverRating || modelValue),
                'text-gray-300': index > (hoverRating || modelValue)
              }
            ]"
          ></i>
        </button>
      </div>

      <!-- Display Value -->
      <span
          v-if="showValue"
          class="ml-2 text-sm text-gray-600"
      >
        {{ modelValue || 0 }}/{{ maxRating }}
      </span>
    </div>

    <!-- Helper Text -->
    <p
        v-if="helper"
        class="mt-1 text-sm text-gray-500"
    >
      {{ helper }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  modelValue: number
  id?: string
  label?: string
  helper?: string
  maxRating?: number
  disabled?: boolean
  showValue?: boolean
  filledIcon?: string
  emptyIcon?: string
}

const props = withDefaults(props<Props>(), {
  maxRating: 5,
  disabled: false,
  showValue: true,
  filledIcon: 'fas fa-star',
  emptyIcon: 'far fa-star'
})

const emit = defineEmits(['update:modelValue', 'change'])

const hoverRating = ref(0)

const updateRating = (value: number) => {
  // Toggle rating if clicking the same value
  const newValue = value === props.modelValue ? 0 : value
  emit('update:modelValue', newValue)
  emit('change', newValue)
}
</script>