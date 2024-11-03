<!-- src/components/ui/BaseAccordion.vue -->
<template>
  <div
      class="divide-y divide-gray-200 rounded-lg bg-white shadow"
      :class="{ 'border border-gray-200': bordered }"
  >
    <div
        v-for="(item, index) in items"
        :key="index"
        class="relative"
    >
      <!-- Header -->
      <button
          type="button"
          class="flex w-full items-center justify-between px-4 py-5 text-left"
          :class="[
          'hover:bg-gray-50',
          { 'bg-gray-50': isExpanded(index) }
        ]"
          @click="toggleItem(index)"
      >
        <span class="flex items-center">
          <!-- Icon -->
          <i
              v-if="item.icon"
              :class="[
              'fas',
              item.icon,
              'mr-3 text-gray-400',
              { 'text-primary-500': isExpanded(index) }
            ]"
          ></i>

          <!-- Title -->
          <span
              class="text-sm font-medium text-gray-900"
              :class="{ 'text-primary-600': isExpanded(index) }"
          >
            {{ item.title }}
          </span>
        </span>

        <!-- Chevron -->
        <i
            class="fas fa-chevron-down text-gray-400 transition-transform duration-200"
            :class="{ 'rotate-180': isExpanded(index) }"
        ></i>
      </button>

      <!-- Content -->
      <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="transform scale-y-95 opacity-0"
          enter-to-class="transform scale-y-100 opacity-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="transform scale-y-100 opacity-100"
          leave-to-class="transform scale-y-95 opacity-0"
      >
        <div v-if="isExpanded(index)">
          <div
              class="px-4 pb-5 pt-0"
              :class="{ 'pl-11': item.icon }"
          >
            <slot :name="`content-${index}`">
              <div class="text-sm text-gray-500">
                {{ item.content }}
              </div>
            </slot>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface AccordionItem {
  title: string
  content?: string
  icon?: string
}

interface Props {
  items: AccordionItem[]
  multiple?: boolean
  bordered?: boolean
  defaultExpanded?: number[]
}

const props = withDefaults(props<Props>(), {
  multiple: false,
  bordered: true,
  defaultExpanded: () => []
})

// State
const expandedItems = ref<number[]>(props.defaultExpanded)

// Methods
const isExpanded = (index: number) => {
  return expandedItems.value.includes(index)
}

const toggleItem = (index: number) => {
  if (props.multiple) {
    const itemIndex = expandedItems.value.indexOf(index)
    if (itemIndex === -1) {
      expandedItems.value.push(index)
    } else {
      expandedItems.value.splice(itemIndex, 1)
    }
  } else {
    expandedItems.value = expandedItems.value.includes(index) ? [] : [index]
  }
}
</script>