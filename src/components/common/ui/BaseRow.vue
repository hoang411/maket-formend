<!-- src/components/ui/BaseRow.vue -->
<template>
  <div
      :class="[
      'flex flex-wrap',
      gapClass,
      alignClass,
      justifyClass,
      { 'flex-col': vertical },
      { 'flex-row-reverse': reverse }
    ]"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
type RowGap = 'none' | 'sm' | 'md' | 'lg' | 'xl'
type RowAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
type RowJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'

interface Props {
  gap?: RowGap
  align?: RowAlign
  justify?: RowJustify
  vertical?: boolean
  reverse?: boolean
}

const props = withDefaults(props<Props>(), {
  gap: 'md',
  align: 'start',
  justify: 'start',
  vertical: false,
  reverse: false
})

const gapClass = computed(() => {
  const classes: Record<RowGap, string> = {
    none: 'gap-0',
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-10'
  }
  return classes[props.gap]
})

const alignClass = computed(() => {
  const classes: Record<RowAlign, string> = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
    baseline: 'items-baseline'
  }
  return classes[props.align]
})

const justifyClass = computed(() => {
  const classes: Record<RowJustify, string> = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly'
  }
  return classes[props.justify]
})
</script>