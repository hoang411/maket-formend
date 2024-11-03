<!-- src/components/ui/BaseCol.vue -->
<template>
  <div :class="colClasses">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
type ColSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto' | 'full'
type ColOffset = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
type ColOrder = 'first' | 'last' | 'none' | number

interface Props {
  span?: ColSpan | Record<string, ColSpan>
  offset?: ColOffset | Record<string, ColOffset>
  order?: ColOrder | Record<string, ColOrder>
}

const props = withDefaults(props<Props>(), {
  span: 'full'
})

const colClasses = computed(() => {
  const classes: string[] = []

  // Handle span
  if (typeof props.span === 'string' || typeof props.span === 'number') {
    classes.push(getSpanClass('', props.span))
  } else if (props.span) {
    Object.entries(props.span).forEach(([breakpoint, value]) => {
      classes.push(getSpanClass(breakpoint, value))
    })
  }

  // Handle offset
  if (props.offset) {
    if (typeof props.offset === 'number') {
      classes.push(getOffsetClass('', props.offset))
    } else {
      Object.entries(props.offset).forEach(([breakpoint, value]) => {
        classes.push(getOffsetClass(breakpoint, value))
      })
    }
  }

  // Handle order
  if (props.order) {
    if (typeof props.order === 'string' || typeof props.order === 'number') {
      classes.push(getOrderClass('', props.order))
    } else {
      Object.entries(props.order).forEach(([breakpoint, value]) => {
        classes.push(getOrderClass(breakpoint, value))
      })
    }
  }

  return classes
})

function getSpanClass(breakpoint: string, span: ColSpan): string {
  const prefix = breakpoint ? `${breakpoint}:` : ''
  if (span === 'auto') return `${prefix}flex-auto`
  if (span === 'full') return `${prefix}w-full`
  return `${prefix}w-${(span / 12) * 100}/100`
}

function getOffsetClass(breakpoint: string, offset: ColOffset): string {
  const prefix = breakpoint ? `${breakpoint}:` : ''
  return `${prefix}ml-${(offset / 12) * 100}/100`
}

function getOrderClass(breakpoint: string, order: ColOrder): string {
  const prefix = breakpoint ? `${breakpoint}:` : ''
  if (order === 'first') return `${prefix}order-first`
  if (order === 'last') return `${prefix}order-last`
  if (order === 'none') return `${prefix}order-none`
  return `${prefix}order-${order}`
}
</script>