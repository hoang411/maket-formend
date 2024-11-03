<!-- src/components/ui/BaseContainer.vue -->
<template>
  <div
      class="mx-auto w-full px-4 sm:px-6 lg:px-8"
      :class="[
      maxWidthClass,
      { 'py-4 sm:py-6 lg:py-8': padded }
    ]"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
type ContainerWidth = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'

interface Props {
  maxWidth?: ContainerWidth
  padded?: boolean
}

const props = withDefaults(props<Props>(), {
  maxWidth: 'lg',
  padded: false
})

const maxWidthClass = computed(() => {
  const classes: Record<ContainerWidth, string> = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: ''
  }
  return classes[props.maxWidth]
})
</script>