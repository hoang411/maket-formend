<!-- src/components/ui/BaseSlider.vue -->
<template>
  <div>
    <!-- Label -->
    <label
        v-if="label"
        :for="id"
        class="block text-sm font-medium text-gray-700 mb-1"
    >
      {{ label }}
    </label>

    <div class="relative">
      <!-- Range Input -->
      <input
          :id="id"
          type="range"
          :min="min"
          :max="max"
          :step="step"
          :disabled="disabled"
          :value="modelValue"
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          :class="{ 'opacity-50 cursor-not-allowed': disabled }"
          @input="handleInput"
          @change="handleChange"
      />

      <!-- Custom Track -->
      <div
          class="absolute pointer-events-none h-2 bg-primary-500 rounded-l-lg"
          :style="{ width: `${percentage}%` }"
      ></div>

      <!-- Value Tooltip -->
      <div
          v-if="showTooltip"
          class="absolute -top-8 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded"
          :style="{ left: `${percentage}%` }"
      >
        {{ formatValue(modelValue) }}
      </div>

      <!-- Min/Max Labels -->
      <div
          v-if="showLabels"
          class="flex justify-between mt-2"
      >
        <span class="text-sm text-gray-500">{{ formatValue(min) }}</span>
        <span class="text-sm text-gray-500">{{ formatValue(max) }}</span>
      </div>
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
import { computed } from 'vue'

interface Props {
  modelValue: number
  id?: string
  label?: string
  helper?: string
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  showTooltip?: boolean
  showLabels?: boolean
  formatter?: (value: number) => string
}

const props = withDefaults(props<Props>(), {
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  showTooltip: true,
  showLabels: true
})

const emit = defineEmits(['update:modelValue', 'change'])

// Computed
const percentage = computed(() => {
  return ((props.modelValue - props.min) / (props.max - props.min)) * 100
})

// Methods
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', Number(target.value))
}

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('change', Number(target.value))
}

const formatValue = (value: number) => {
  if (props.formatter) {
    return props.formatter(value)
  }
  return value.toString()
}
</script>

<style scoped>
input[type='range'] {
  -webkit-appearance: none;
  @apply bg-transparent;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  @apply h-4 w-4 rounded-full bg-white border-2 border-primary-500 cursor-pointer relative;
  margin-top: -6px;
}

input[type='range']::-moz-range-thumb {
  @apply h-4 w-4 rounded-full bg-white border-2 border-primary-500 cursor-pointer relative;
}

input[type='range']:focus {
  outline: none;
}

input[type='range']:focus::-webkit-slider-thumb {
  @apply ring-2 ring-primary-500 ring-offset-2;
}

input[type='range']:focus::-moz-range-thumb {
  @apply ring-2 ring-primary-500 ring-offset-2;
}
</style>