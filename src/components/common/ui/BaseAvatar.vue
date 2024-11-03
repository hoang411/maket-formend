<!-- src/components/ui/BaseAvatar.vue -->
<template>
  <div
      class="relative inline-block"
      :class="[sizeClasses[size]]"
  >
    <!-- Image Avatar -->
    <img
        v-if="src && !error"
        :src="src"
        :alt="alt"
        @error="handleImageError"
        class="rounded-full object-cover"
        :class="[
        sizeClasses[size],
        borderClasses[variant],
        { 'ring-2 ring-white': bordered }
      ]"
    />

    <!-- Fallback Initial Avatar -->
    <div
        v-else
        class="flex items-center justify-center rounded-full text-white font-medium"
        :class="[
        sizeClasses[size],
        colorClasses[color],
        borderClasses[variant],
        { 'ring-2 ring-white': bordered }
      ]"
    >
      {{ initials }}
    </div>

    <!-- Status Indicator -->
    <span
        v-if="status"
        class="absolute bottom-0 right-0 block rounded-full ring-2 ring-white"
        :class="[
        statusSizeClasses[size],
        statusColorClasses[status]
      ]"
    />

    <!-- Badge -->
    <div
        v-if="badge"
        class="absolute -top-1 -right-1"
    >
      <slot name="badge">
        <span
            class="flex items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold"
            :class="[badgeSizeClasses[size]]"
        >
          {{ badge }}
        </span>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type AvatarVariant = 'circle' | 'rounded' | 'square'
type AvatarColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'
type AvatarStatus = 'online' | 'offline' | 'busy' | 'away'

interface Props {
  src?: string
  alt?: string
  name?: string
  size?: AvatarSize
  variant?: AvatarVariant
  color?: AvatarColor
  status?: AvatarStatus
  badge?: string | number
  bordered?: boolean
}

const props = withDefaults(props<Props>(), {
  size: 'md',
  variant: 'circle',
  color: 'primary',
  bordered: false
})

// State
const error = ref(false)

// Size Classes
const sizeClasses: Record<AvatarSize, string> = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-12 w-12 text-lg',
  xl: 'h-14 w-14 text-xl'
}

// Border Classes
const borderClasses: Record<AvatarVariant, string> = {
  circle: 'rounded-full',
  rounded: 'rounded-lg',
  square: 'rounded-none'
}

// Color Classes
const colorClasses: Record<AvatarColor, string> = {
  primary: 'bg-primary-500',
  secondary: 'bg-gray-500',
  success: 'bg-green-500',
  danger: 'bg-red-500',
  warning: 'bg-yellow-500',
  info: 'bg-blue-500'
}

// Status Classes
const statusSizeClasses: Record<AvatarSize, string> = {
  xs: 'h-1.5 w-1.5',
  sm: 'h-2 w-2',
  md: 'h-2.5 w-2.5',
  lg: 'h-3 w-3',
  xl: 'h-3.5 w-3.5'
}

const statusColorClasses: Record<AvatarStatus, string> = {
  online: 'bg-green-500',
  offline: 'bg-gray-500',
  busy: 'bg-red-500',
  away: 'bg-yellow-500'
}

// Badge Classes
const badgeSizeClasses: Record<AvatarSize, string> = {
  xs: 'h-3 w-3 text-[8px]',
  sm: 'h-4 w-4 text-[10px]',
  md: 'h-5 w-5 text-[11px]',
  lg: 'h-6 w-6 text-xs',
  xl: 'h-7 w-7 text-sm'
}

// Computed
const initials = computed(() => {
  if (!props.name) return '?'
  return props.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
})

// Methods
const handleImageError = () => {
  error.value = true
}
</script>