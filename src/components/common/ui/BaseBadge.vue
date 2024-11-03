<!-- src/components/ui/BaseBadge.vue -->
<template>
  <span
      :class="[
      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
      sizeClasses[size],
      variantClasses[variant][color],
      { 'cursor-pointer hover:opacity-80': clickable }
    ]"
      @click="handleClick"
  >
    <!-- Dot -->
    <span
        v-if="dot"
        :class="[
        'mr-1.5 h-2 w-2 rounded-full',
        dotColorClasses[color]
      ]"
    ></span>

    <!-- Icon -->
    <i
        v-if="icon"
        :class="[
        'fas',
        icon,
        { 'mr-1': $slots.default }
      ]"
    ></i>

    <!-- Content -->
    <slot>{{ label }}</slot>

    <!-- Remove Button -->
    <button
        v-if="removable"
        type="button"
        class="ml-1 -mr-1 inline-flex rounded-full p-0.5 hover:bg-black/10"
        @click.stop="handleRemove"
    >
      <span class="sr-only">Remove</span>
      <i class="fas fa-times text-[10px]"></i>
    </button>
  </span>
</template>

<script setup lang="ts">
type BadgeSize = 'sm' | 'md' | 'lg'
type BadgeVariant = 'solid' | 'soft' | 'outline'
type BadgeColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'

interface Props {
  label?: string
  size?: BadgeSize
  variant?: BadgeVariant
  color?: BadgeColor
  icon?: string
  dot?: boolean
  removable?: boolean
  clickable?: boolean
}

const props = withDefaults(props<Props>(), {
  size: 'md',
  variant: 'solid',
  color: 'primary',
  dot: false,
  removable: false,
  clickable: false
})

const emit = defineEmits(['click', 'remove'])

// Size Classes
const sizeClasses: Record<BadgeSize, string> = {
  sm: 'text-[10px] px-2',
  md: 'text-xs px-2.5',
  lg: 'text-sm px-3'
}

// Variant Classes
const variantClasses: Record<BadgeVariant, Record<BadgeColor, string>> = {
  solid: {
    primary: 'bg-primary-500 text-white',
    secondary: 'bg-gray-500 text-white',
    success: 'bg-green-500 text-white',
    danger: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-white',
    info: 'bg-blue-500 text-white'
  },
  soft: {
    primary: 'bg-primary-50 text-primary-700',
    secondary: 'bg-gray-50 text-gray-700',
    success: 'bg-green-50 text-green-700',
    danger: 'bg-red-50 text-red-700',
    warning: 'bg-yellow-50 text-yellow-700',
    info: 'bg-blue-50 text-blue-700'
  },
  outline: {
    primary: 'border border-primary-500 text-primary-500',
    secondary: 'border border-gray-500 text-gray-500',
    success: 'border border-green-500 text-green-500',
    danger: 'border border-red-500 text-red-500',
    warning: 'border border-yellow-500 text-yellow-500',
    info: 'border border-blue-500 text-blue-500'
  }
}

// Dot Color Classes
const dotColorClasses: Record<BadgeColor, string> = {
  primary: 'bg-primary-400',
  secondary: 'bg-gray-400',
  success: 'bg-green-400',
  danger: 'bg-red-400',
  warning: 'bg-yellow-400',
  info: 'bg-blue-400'
}

// Methods
const handleClick = (event: MouseEvent) => {
  if (props.clickable) {
    emit('click', event)
  }
}

const handleRemove = (event: MouseEvent) => {
  emit('remove', event)
}
</script>