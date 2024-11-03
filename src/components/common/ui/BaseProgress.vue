<!-- src/components/ui/BaseProgress.vue -->
<template>
  <div>
    <!-- Label -->
    <div
        v-if="label || showValue"
        class="flex justify-between mb-1"
    >
      <span
          v-if="label"
          class="text-sm font-medium text-gray-700"
      >
        {{ label }}
      </span>
      <span
          v-if="showValue"
          class="text-sm font-medium text-gray-500"
      >
        {{ formattedValue }}
      </span>
    </div>

    <!-- Progress Bar -->
    <div
        class="relative"
        :class="[
        sizeClasses[size],
        { 'overflow-hidden rounded-full': !square }
      ]"
    >
      <!-- Background -->
      <div
          class="w-full bg-gray-200"
          :class="[
          { 'rounded-full': !square },
          { 'animate-pulse': loading }
        ]"
      >
        <!-- Foreground -->
        <div
            class="transition-all duration-300 ease-out"
            :class="[
            colorClasses[color],
            { 'rounded-full': !square },
            { 'animate-progress': animated },
            { 'striped': striped }
          ]"
            :style="{
            width: `${clampedValue}%`,
            height: '100%'
          }"
        >
          <!-- Label Inside -->
          <span
              v-if="labelInside"
              class="absolute inset-0 flex items-center justify-center text-xs font-medium text-white"
          >
            {{ formattedValue }}
          </span>
        </div>
      </div>

      <!-- Steps -->
      <div
          v-if="steps > 0"
          class="absolute inset-0 flex"
      >
        <div
            v-for="step in steps"
            :key="step"
            class="flex-1 border-l border-white"
            :class="{ 'border-l-0': step === 1 }"
        ></div>
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

type ProgressSize = 'xs' | 'sm' | 'md' | 'lg'
type ProgressColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'

interface Props {
  value: number
  max?: number
  label?: string
  helper?: string
  size?: ProgressSize
  color?: ProgressColor
  showValue?: boolean
  labelInside?: boolean
  square?: boolean
  striped?: boolean
  animated?: boolean
  loading?: boolean
  steps?: number
  format?: (value: number, max: number) => string
}

const props = withDefaults(props<Props>(), {
  max: 100,
  size: 'md',
  color: 'primary',
  showValue: false,
  labelInside: false,
  square: false,
  striped: false,
  animated: false,
  loading: false,
  steps: 0
})

// Size Classes
const sizeClasses: Record<ProgressSize, string> = {
  xs: 'h-1',
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4'
}

// Color Classes
const colorClasses: Record<ProgressColor, string> = {
  primary: 'bg-primary-600',
  secondary: 'bg-gray-600',
  success: 'bg-green-600',
  danger: 'bg-red-600',
  warning: 'bg-yellow-600',
  info: 'bg-blue-600'
}

// Computed
const clampedValue = computed(() => {
  return Math.min(100, Math.max(0, (props.value / props.max) * 100))
})

const formattedValue = computed(() => {
  if (props.format) {
    return props.format(props.value, props.max)
  }
  return `${Math.round(clampedValue.value)}%`
})
</script>

<style scoped>
.striped {
  background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.15) 75%,
      transparent 75%,
      transparent
  );
  background-size: 1rem 1rem;
}

.animate-progress {
  animation: progress-bar-stripes 1s linear infinite;
}

@keyframes progress-bar-stripes {
  0% {
    background-position: 1rem 0;
  }
  100% {
    background-position: 0 0;
  }
}
</style>