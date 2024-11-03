<!-- src/components/ui/BaseTabs.vue -->
<template>
  <div>
    <!-- Tab List -->
    <div
        class="border-b border-gray-200"
        :class="{ 'mb-4': !fitted }"
    >
      <nav
          class="-mb-px flex"
          :class="{ 'space-x-8': !fitted }"
          aria-label="Tabs"
      >
        <button
            v-for="(tab, index) in tabs"
            :key="index"
            type="button"
            class="group relative min-w-0 flex-1 overflow-hidden py-4 px-1 text-center text-sm font-medium focus:z-10 focus:outline-none"
            :class="[
            fitted ? 'flex-1' : 'flex-none',
            isActive(tab)
              ? 'border-b-2 border-primary-500 text-primary-600'
              : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
            { 'cursor-not-allowed opacity-50': tab.disabled }
          ]"
            :disabled="tab.disabled"
            @click="selectTab(tab)"
        >
          <!-- Icon -->
          <i
              v-if="tab.icon"
              :class="[
              'fas',
              tab.icon,
              { 'mr-2': tab.label },
              isActive(tab) ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500'
            ]"
          ></i>

          <!-- Label -->
          <span
              v-if="tab.label"
              :class="{ 'truncate': truncate }"
          >
            {{ tab.label }}
          </span>

          <!-- Badge -->
          <span
              v-if="tab.badge"
              class="ml-2 inline-flex items-center rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800"
          >
            {{ tab.badge }}
          </span>
        </button>
      </nav>
    </div>

    <!-- Tab Panels -->
    <div class="relative">
      <TransitionGroup
          enter-active-class="transition ease-out duration-200"
          enter-from-class="opacity-0 translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-1"
      >
        <div
            v-for="(tab, index) in tabs"
            v-show="isActive(tab)"
            :key="index"
            class="focus:outline-none"
            tabindex="0"
            role="tabpanel"
        >
          <slot
              :name="`panel-${index}`"
              :tab="tab"
          >
            {{ tab.content }}
          </slot>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Tab {
  label?: string
  icon?: string
  badge?: string | number
  content?: string
  disabled?: boolean
  [key: string]: any
}

interface Props {
  tabs: Tab[]
  modelValue?: number | string
  fitted?: boolean
  truncate?: boolean
}

const props = withDefaults(props<Props>(), {
  fitted: false,
  truncate: false
})

const emit = defineEmits(['update:modelValue', 'change'])

// State
const activeTab = ref(props.modelValue ?? 0)

// Methods
const isActive = (tab: Tab) => {
  const index = props.tabs.indexOf(tab)
  return index === activeTab.value
}

const selectTab = (tab: Tab) => {
  if (tab.disabled) return

  const index = props.tabs.indexOf(tab)
  activeTab.value = index
  emit('update:modelValue', index)
  emit('change', { index, tab })
}

// Watch
watch(
    () => props.modelValue,
    (newValue) => {
      if (newValue !== undefined) {
        activeTab.value = newValue
      }
    }
)
</script>