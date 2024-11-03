<!-- src/components/ui/BaseGrid.vue -->
<template>
  <div
      :class="[
      'grid',
      gapClass,
      columnsClass,
      alignClass,
      justifyClass
    ]"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
type GridGap = 'none' | 'sm' | 'md' | 'lg' | 'xl'
type GridAlign = 'start' | 'center' | 'end' | 'stretch'
type GridJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'

interface Props {
  cols?: GridColumns | Record<string, GridColumns>
  gap?: GridGap
  align?: GridAlign
  justify?: GridJustify
}

const props = withDefaults(props<Props>(), {
  cols: 1,
  gap: 'md',
  align: 'stretch',
  justify: 'start'
})

const gapClass = computed(() => {
  const classes: Record<GridGap, string> = {
    none: 'gap-0',
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-10'
  }
  return classes[props.gap]
})

const columnsClass = computed(() => {
  if (typeof props.cols === 'number') {
    return `grid-cols-${props.cols}`
  }

  return Object.entries(props.cols)
      .map(([breakpoint, cols]) =>
          breakpoint === 'default'
              ? `grid-cols-${cols}`
              : `${breakpoint}:grid-cols-${cols}`
      )
      .join(' ')
})

const alignClass = computed(() => {
  const classes: Record<GridAlign, string> = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch'
  }
  return classes[props.align]
})

const justifyClass = computed(() => {
  const classes: Record<GridJustify, string> = {
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