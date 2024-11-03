<!-- src/components/ui/BaseDropdown.vue -->
<template>
  <div class="relative inline-block text-left">
    <!-- Trigger -->
    <div>
      <slot name="trigger" :toggle="toggle" :isOpen="isOpen">
        <button
            type="button"
            class="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            :class="[
            { 'bg-gray-50': isOpen },
            triggerClass
          ]"
            @click="toggle"
        >
          {{ label }}
          <i
              class="fas fa-chevron-down ml-2 -mr-1 text-xs"
              :class="{ 'rotate-180': isOpen }"
          ></i>
        </button>
      </slot>
    </div>

    <!-- Dropdown Menu -->
    <Transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
    >
      <div
          v-if="isOpen"
          ref="contentRef"
          class="absolute z-50 mt-2 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          :class="[
          widthClass,
          positionClass,
          contentClass
        ]"
          @click="handleContentClick"
      >
        <div class="py-1">
          <!-- Header -->
          <div
              v-if="$slots.header"
              class="px-4 py-2 text-sm text-gray-700 border-b border-gray-100"
          >
            <slot name="header"></slot>
          </div>

          <!-- Items -->
          <slot>
            <template v-for="(item, index) in items" :key="index">
              <!-- Divider -->
              <div
                  v-if="item.divider"
                  class="my-1 h-px bg-gray-100"
              ></div>

              <!-- Item -->
              <template v-else>
                <router-link
                    v-if="item.to"
                    :to="item.to"
                    class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    :class="{ 'text-gray-400': item.disabled }"
                    @click="handleItemClick(item)"
                >
                  <i
                      v-if="item.icon"
                      :class="['fas', item.icon, 'mr-3 text-gray-400']"
                  ></i>
                  {{ item.label }}
                </router-link>
                <button
                    v-else
                    type="button"
                    class="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    :class="{ 'text-gray-400': item.disabled }"
                    :disabled="item.disabled"
                    @click="handleItemClick(item)"
                >
                  <i
                      v-if="item.icon"
                      :class="['fas', item.icon, 'mr-3 text-gray-400']"
                  ></i>
                  {{ item.label }}
                </button>
              </template>
            </template>
          </slot>

          <!-- Footer -->
          <div
              v-if="$slots.footer"
              class="px-4 py-2 text-sm text-gray-700 border-t border-gray-100"
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

interface DropdownItem {
  label: string
  icon?: string
  to?: string | Record<string, any>
  disabled?: boolean
  divider?: boolean
  [key: string]: any
}

interface Props {
  items?: DropdownItem[]
  label?: string
  width?: 'auto' | 'sm' | 'md' | 'lg'
  position?: 'left' | 'right'
  closeOnClick?: boolean
  triggerClass?: string
  contentClass?: string
}

const props = withDefaults(props<Props>(), {
  items: () => [],
  width: 'auto',
  position: 'left',
  closeOnClick: true
})

const emit = defineEmits(['click'])

// State
const isOpen = ref(false)
const contentRef = ref<HTMLElement | null>(null)

// Computed
const widthClass = computed(() => {
  switch (props.width) {
    case 'sm': return 'w-48'
    case 'md': return 'w-56'
    case 'lg': return 'w-64'
    default: return 'w-auto'
  }
})

const positionClass = computed(() => {
  return props.position === 'right' ? 'right-0' : 'left-0'
})

// Methods
const toggle = () => {
  isOpen.value = !isOpen.value
}

const close = () => {
  isOpen.value = false
}

const handleItemClick = (item: DropdownItem) => {
  if (item.disabled) return

  emit('click', item)

  if (props.closeOnClick) {
    close()
  }
}

const handleContentClick = (event: MouseEvent) => {
  event.stopPropagation()
}

const handleClickOutside = (event: MouseEvent) => {
  if (contentRef.value && !contentRef.value.contains(event.target as Node)) {
    close()
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>