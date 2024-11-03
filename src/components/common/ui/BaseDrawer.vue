<!-- src/components/ui/BaseDrawer.vue -->
<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition
        enter-active-class="ease-out duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="ease-in duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
      <div
          v-if="modelValue"
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          :class="{ 'cursor-pointer': closeOnClickOutside }"
          @click="handleBackdropClick"
      ></div>
    </Transition>

    <!-- Drawer -->
    <Transition
        :enter-active-class="transitionClasses[placement].enter"
        :enter-from-class="transitionClasses[placement].enterFrom"
        :enter-to-class="transitionClasses[placement].enterTo"
        :leave-active-class="transitionClasses[placement].leave"
        :leave-from-class="transitionClasses[placement].leaveFrom"
        :leave-to-class="transitionClasses[placement].leaveTo"
    >
      <div
          v-if="modelValue"
          class="fixed inset-0 overflow-hidden"
      >
        <div class="absolute inset-0 overflow-hidden">
          <div
              class="pointer-events-none fixed inset-y-0 flex max-w-full"
              :class="[
              placementClasses[placement],
              { 'pl-10': placement === 'right' },
              { 'pr-10': placement === 'left' }
            ]"
          >
            <div
                class="pointer-events-auto relative"
                :class="[widthClass]"
            >
              <!-- Close button -->
              <div
                  v-if="showClose"
                  class="absolute right-0 top-0 -mr-12 pt-2"
              >
                <button
                    type="button"
                    class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    @click="close"
                >
                  <span class="sr-only">Close drawer</span>
                  <i class="fas fa-times h-6 w-6 text-white"></i>
                </button>
              </div>

              <!-- Content -->
              <div
                  class="flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl"
                  :class="{ 'rounded-l-xl': placement === 'right', 'rounded-r-xl': placement === 'left' }"
              >
                <!-- Header -->
                <div
                    v-if="$slots.header || title"
                    class="px-4 sm:px-6"
                >
                  <slot name="header">
                    <h2 class="text-lg font-medium text-gray-900">
                      {{ title }}
                    </h2>
                  </slot>
                </div>

                <!-- Body -->
                <div class="relative mt-6 flex-1 px-4 sm:px-6">
                  <slot></slot>
                </div>

                <!-- Footer -->
                <div
                    v-if="$slots.footer"
                    class="mt-6 border-t border-gray-200 px-4 py-4 sm:px-6"
                >
                  <slot name="footer"></slot>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

type DrawerPlacement = 'left' | 'right'
type DrawerWidth = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'

interface Props {
  modelValue: boolean
  title?: string
  placement?: DrawerPlacement
  width?: DrawerWidth
  showClose?: boolean
  closeOnClickOutside?: boolean
  closeOnEsc?: boolean
}

const props = withDefaults(props<Props>(), {
  placement: 'right',
  width: 'md',
  showClose: true,
  closeOnClickOutside: true,
  closeOnEsc: true
})

const emit = defineEmits(['update:modelValue', 'close'])

// Classes
const placementClasses: Record<DrawerPlacement, string> = {
  left: 'left-0',
  right: 'right-0'
}

const widthClass = computed(() => {
  const classes: Record<DrawerWidth, string> = {
    sm: 'w-screen max-w-md',
    md: 'w-screen max-w-lg',
    lg: 'w-screen max-w-xl',
    xl: 'w-screen max-w-2xl',
    '2xl': 'w-screen max-w-3xl',
    full: 'w-screen'
  }
  return classes[props.width]
})

const transitionClasses: Record<DrawerPlacement, Record<string, string>> = {
  right: {
    enter: 'transform transition ease-in-out duration-500 sm:duration-700',
    enterFrom: 'translate-x-full',
    enterTo: 'translate-x-0',
    leave: 'transform transition ease-in-out duration-500 sm:duration-700',
    leaveFrom: 'translate-x-0',
    leaveTo: 'translate-x-full'
  },
  left: {
    enter: 'transform transition ease-in-out duration-500 sm:duration-700',
    enterFrom: '-translate-x-full',
    enterTo: 'translate-x-0',
    leave: 'transform transition ease-in-out duration-500 sm:duration-700',
    leaveFrom: 'translate-x-0',
    leaveTo: '-translate-x-full'
  }
}

// Methods
const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleBackdropClick = () => {
  if (props.closeOnClickOutside) {
    close()
  }
}

const handleEscKey = (event: KeyboardEvent) => {
  if (props.closeOnEsc && event.key === 'Escape' && props.modelValue) {
    close()
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('keydown', handleEscKey)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscKey)
})

// Watch for changes
watch(() => props.modelValue, (value) => {
  if (value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>