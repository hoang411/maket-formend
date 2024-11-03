<!-- src/components/ui/BaseDivider.vue -->
<template>
  <div
      :class="[
      orientation === 'horizontal' ? 'border-t' : 'border-l h-full',
      alignClass,
      spaceClass,
      borderClass,
      { 'border-dashed': dashed }
    ]"
  >
    <div
        v-if="$slots.default"
        :class="[
        'flex',
        orientation === 'horizontal' ? '-mt-3' : '-ml-3',
        textAlignClass
      ]"
    >
      <span
          :class="[
          'bg-white px-2',
          textColorClass
        ]"
      >
        <slot></slot>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
type DividerOrientation = 'horizontal' | 'vertical'
type DividerAlign = 'start' | 'center' | 'end'
type DividerSpace = 'none' | 'sm' | 'md' | 'lg' | 'xl'
type DividerColor = 'gray' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'

interface Props {
  orientation?: DividerOrientation
  align?: DividerAlign
  space?: DividerSpace
  color?: DividerColor
  dashed?: boolean
}

const props = withDefaults(props<Props>(), {
  orientation: 'horizontal',
  align: 'center',
  space: 'md',
  color: 'gray',
  dashed: false
})

const alignClass = computed(() => {
  const classes: Record<DividerAlign, string> = {
    start: 'text-left',
    center: 'text-center',
    end: 'text-right'
  }
  return classes[props.align]
})

const spaceClass = computed(() => {
  const classes: Record<DividerSpace, string> = {
    none: 'my-0',
    sm: 'my-4',
    md: 'my-6',
    lg: 'my-8',
    xl: 'my-10'
  }
  return props.orientation === 'horizontal' ? classes[props.space] : ''
})

const borderClass = computed(() => {
  const classes: Record<DividerColor, string> = {
    gray: 'border-gray-200',
    primary: 'border-primary-200',
    secondary: 'border-secondary-200',
    success: 'border-green-200',
    warning: 'border-yellow-200',
    danger: 'border-red-200'
  }
  return classes[props.color]
})

const textColorClass = computed(() => {
  const classes: Record<DividerColor, string> = {
    gray: 'text-gray-500',
    primary: 'text-primary-500',
    secondary: 'text-secondary-500',
    success: 'text-green-500',
    warning: 'text-yellow-500',
    danger: 'text-red-500'
  }
  return classes[props.color]
})

const textAlignClass = computed(() => {
  const classes: Record<DividerAlign, string> = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end'
  }
  return classes[props.align]
})
</script>