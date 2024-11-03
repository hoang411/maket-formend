<!-- src/components/ui/BasePopover.vue -->
<template>
  <div>
    <!-- Trigger -->
    <div ref="triggerRef" @click="toggle">
      <slot name="trigger">
        <button
            type="button"
            class="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            :class="{ 'bg-gray-50': isOpen }"
        >
          {{ triggerText }}
        </button>
      </slot>
    </div>

    <!-- Popover -->
    <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-1"
    >
      <div
          v-if="isOpen"
          ref="contentRef"
          class="absolute z-50"
          :class="[widthClass]"
      >
        <div
            class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <!-- Arrow -->
          <div
              ref="arrowRef"
              class="absolute h-2 w-2 rotate-45 bg-white"
          ></div>

          <!-- Header -->
          <div
              v-if="$slots.header || title"
              class="bg-gray-50 p-3"
          >
            <slot name="header">
              <h3 class="text-sm font-medium text-gray-900">
                {{ title }}
              </h3>
            </slot>
          </div>

          <!-- Content -->
          <div class="relative bg-white p-3">
            <slot>
              <p class="text-sm text-gray-500">
                {{ content }}
              </p>
            </slot>
          </div>

          <!-- Footer -->
          <div
              v-if="$slots.footer"
              class="bg-gray-50 p-3"
          >
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import {
  computePosition,
  flip,
  shift,
  offset,
  arrow,
  Placement,
} from '@floating-ui/dom'

type PopoverWidth = 'auto' | 'sm' | 'md' | 'lg'

interface Props {
  triggerText?: string
  title?: string
  content?: string
  placement?: Placement
  width?: PopoverWidth
  offset?: number
  openOnHover?: boolean
  closeOnClickOutside?: boolean
}

const props = withDefaults(props<Props>(), {
  placement: 'bottom',
  width: 'auto',
  offset: 8,
  openOnHover: false,
  closeOnClickOutside: true
})

// Refs
const isOpen = ref(false)
const triggerRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const arrowRef = ref<HTMLElement | null>(null)

// Width Classes
const widthClass = computed(() => {
  const classes: Record<PopoverWidth, string> = {
    auto: '',
    sm: 'w-48',
    md: 'w-64',
    lg: 'w-80'
  }
  return classes[props.width]
})

// Methods
const updatePosition = async () => {
  if (!triggerRef.value || !contentRef.value || !arrowRef.value) return

  const { x, y, placement, middlewareData } = await computePosition(
      triggerRef.value,
      contentRef.value,
      {
        placement: props.placement,
        middleware: [
          offset(props.offset),
          flip(),
          shift({ padding: 8 }),
          arrow({ element: arrowRef.value })
        ]
      }
  )

  Object.assign(contentRef.value.style, {
    left: `${x}px`,
    top: `${y}px`
  })

  // Arrow positioning
  const { x: arrowX, y: arrowY } = middlewareData.arrow || {}

  const staticSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right'
  }[placement.split('-')[0]]

  Object.assign(arrowRef.value.style, {
    left: arrowX != null ? `${arrowX}px` : '',
    top: arrowY != null ? `${arrowY}px` : '',
    [staticSide]: '-4px'
  })
}

const show = () => {
  isOpen.value = true
  nextTick(() => {
    updatePosition()
  })
}

const hide = () => {
  isOpen.value = false
}

const toggle = () => {
  if (isOpen.value) {
    hide()
  } else {
    show()
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (
      props.closeOnClickOutside &&
      !triggerRef.value?.contains(event.target as Node) &&
      !contentRef.value?.contains(event.target as Node)
  ) {
    hide()
  }
}

// Event Handlers
const handleMouseEnter = () => {
  if (props.openOnHover) {
    show()
  }
}

const handleMouseLeave = () => {
  if (props.openOnHover) {
    hide()
  }
}

// Lifecycle
onMounted(() => {
  if (props.openOnHover) {
    triggerRef.value?.addEventListener('mouseenter', handleMouseEnter)
    triggerRef.value?.addEventListener('mouseleave', handleMouseLeave)
  }

  if (props.closeOnClickOutside) {
    document.addEventListener('click', handleClickOutside)
  }

  window.addEventListener('resize', updatePosition)
  window.addEventListener('scroll', updatePosition)
})

onUnmounted(() => {
  if (props.openOnHover) {
    triggerRef.value?.removeEventListener('mouseenter', handleMouseEnter)
    triggerRef.value?.removeEventListener('mouseleave', handleMouseLeave)
  }

  if (props.closeOnClickOutside) {
    document.removeEventListener('click', handleClickOutside)
  }

  window.removeEventListener('resize', updatePosition)
  window.removeEventListener('scroll', updatePosition)
})
</script>