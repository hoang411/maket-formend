<!-- src/components/ui/BaseTooltip.vue -->
<template>
  <div
      ref="tooltipRef"
      class="relative inline-block"
      @mouseenter="show"
      @mouseleave="hide"
      @focus="show"
      @blur="hide"
  >
    <!-- Trigger Element -->
    <slot></slot>

    <!-- Tooltip -->
    <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
    >
      <div
          v-if="isVisible"
          ref="contentRef"
          role="tooltip"
          :style="{
          position: strategy,
          top: `${y ?? 0}px`,
          left: `${x ?? 0}px`
        }"
          :class="[
          'absolute z-50 px-2 py-1 text-sm font-medium text-white bg-gray-900 rounded shadow-sm',
          maxWidthClass
        ]"
      >
        <!-- Content -->
        <div class="relative z-20">
          <slot name="content">{{ content }}</slot>
        </div>

        <!-- Arrow -->
        <div
            ref="arrowRef"
            :style="{
            position: 'absolute',
            background: '#111827',
            width: '8px',
            height: '8px',
            transform: 'rotate(45deg)',
            ...arrowStyle
          }"
        ></div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  computePosition,
  flip,
  shift,
  offset,
  arrow,
  Placement,
  Strategy
} from '@floating-ui/dom'

type TooltipPosition = 'top' | 'right' | 'bottom' | 'left'
type TooltipTrigger = 'hover' | 'click' | 'focus'
type TooltipWidth = 'auto' | 'sm' | 'md' | 'lg'

interface Props {
  content?: string
  position?: TooltipPosition
  trigger?: TooltipTrigger
  width?: TooltipWidth
  delay?: number
  disabled?: boolean
}

const props = withDefaults(props<Props>(), {
  position: 'top',
  trigger: 'hover',
  width: 'auto',
  delay: 0,
  disabled: false
})

// Refs
const tooltipRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const arrowRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
let showTimeout: NodeJS.Timeout | null = null
let hideTimeout: NodeJS.Timeout | null = null

// Position state
const x = ref<number | null>(null)
const y = ref<number | null>(null)
const strategy = ref<Strategy>('absolute')
const arrowStyle = ref({})

// Max Width Classes
const maxWidthClass = computed(() => {
  switch (props.width) {
    case 'sm': return 'max-w-xs'
    case 'md': return 'max-w-sm'
    case 'lg': return 'max-w-md'
    default: return ''
  }
})

// Methods
const updatePosition = async () => {
  if (!tooltipRef.value || !contentRef.value || !arrowRef.value) return

  const { x: newX, y: newY, placement, strategy: newStrategy, middlewareData } =
      await computePosition(tooltipRef.value, contentRef.value, {
        placement: props.position as Placement,
        middleware: [
          offset(8),
          flip(),
          shift({ padding: 8 }),
          arrow({ element: arrowRef.value })
        ]
      })

  x.value = newX
  y.value = newY
  strategy.value = newStrategy

  // Arrow positioning
  const { x: arrowX, y: arrowY } = middlewareData.arrow ?? {}

  const staticSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right'
  }[placement.split('-')[0]]

  arrowStyle.value = {
    left: arrowX != null ? `${arrowX}px` : '',
    top: arrowY != null ? `${arrowY}px` : '',
    [staticSide]: '-4px'
  }
}

const show = () => {
  if (props.disabled) return

  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }

  showTimeout = setTimeout(() => {
    isVisible.value = true
    nextTick(() => {
      updatePosition()
    })
  }, props.delay)
}

const hide = () => {
  if (showTimeout) {
    clearTimeout(showTimeout)
    showTimeout = null
  }

  hideTimeout = setTimeout(() => {
    isVisible.value = false
  }, 100)
}

// Click Outside Handler
const handleClickOutside = (event: MouseEvent) => {
  if (
      props.trigger === 'click' &&
      tooltipRef.value &&
      !tooltipRef.value.contains(event.target as Node)
  ) {
    hide()
  }
}

// Lifecycle
onMounted(() => {
  if (props.trigger === 'click') {
    document.addEventListener('click', handleClickOutside)
  }
  window.addEventListener('resize', updatePosition)
  window.addEventListener('scroll', updatePosition)
})

onUnmounted(() => {
  if (props.trigger === 'click') {
    document.removeEventListener('click', handleClickOutside)
  }
  window.removeEventListener('resize', updatePosition)
  window.removeEventListener('scroll', updatePosition)

  if (showTimeout) clearTimeout(showTimeout)
  if (hideTimeout) clearTimeout(hideTimeout)
})
</script>