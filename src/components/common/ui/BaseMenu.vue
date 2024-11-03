<!-- src/components/ui/BaseMenu.vue -->
<template>
  <nav class="space-y-1">
    <template v-for="(item, index) in items" :key="index">
      <!-- Divider -->
      <div
          v-if="item.divider"
          class="my-3 h-px bg-gray-200"
      ></div>

      <!-- Section Title -->
      <div
          v-else-if="item.title"
          class="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider"
      >
        {{ item.title }}
      </div>

      <!-- Menu Item -->
      <template v-else>
        <router-link
            v-if="item.to"
            :to="item.to"
            :class="[
            'group flex items-center px-3 py-2 text-sm font-medium rounded-md',
            isActive(item)
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
            { 'cursor-not-allowed opacity-50': item.disabled }
          ]"
            @click="handleClick(item)"
        >
          <i
              v-if="item.icon"
              :class="[
              'fas',
              item.icon,
              'mr-3 flex-shrink-0 text-gray-400',
              { 'text-gray-500': isActive(item) }
            ]"
          ></i>
          <span class="truncate">{{ item.label }}</span>
          <span
              v-if="item.badge"
              :class="[
              'ml-auto inline-block py-0.5 px-2 text-xs rounded-full',
              getBadgeClasses(item.badgeVariant)
            ]"
          >
            {{ item.badge }}
          </span>
        </router-link>

        <!-- Collapsible Menu -->
        <div v-else-if="item.children" class="space-y-1">
          <button
              type="button"
              class="group w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
              :class="{ 'bg-gray-100 text-gray-900': isExpanded(item) }"
              @click="toggleSubmenu(item)"
          >
            <i
                v-if="item.icon"
                :class="[
                'fas',
                item.icon,
                'mr-3 flex-shrink-0 text-gray-400',
                { 'text-gray-500': isExpanded(item) }
              ]"
            ></i>
            <span class="flex-1 truncate">{{ item.label }}</span>
            <i
                class="fas fa-chevron-down ml-3 text-gray-400 transition-transform duration-200"
                :class="{ 'rotate-180': isExpanded(item) }"
            ></i>
          </button>

          <Transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
          >
            <div v-if="isExpanded(item)" class="space-y-1">
              <router-link
                  v-for="(child, childIndex) in item.children"
                  :key="childIndex"
                  :to="child.to"
                  class="group flex items-center pl-10 pr-3 py-2 text-sm font-medium rounded-md"
                  :class="[
                  isActive(child)
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                  { 'cursor-not-allowed opacity-50': child.disabled }
                ]"
                  @click="handleClick(child)"
              >
                <span class="truncate">{{ child.label }}</span>
                <span
                    v-if="child.badge"
                    :class="[
                    'ml-auto inline-block py-0.5 px-2 text-xs rounded-full',
                    getBadgeClasses(child.badgeVariant)
                  ]"
                >
                  {{ child.badge }}
                </span>
              </router-link>
            </div>
          </Transition>
        </div>

        <button
            v-else
            type="button"
            class="group w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
            :class="{ 'cursor-not-allowed opacity-50': item.disabled }"
            :disabled="item.disabled"
            @click="handleClick(item)"
        >
          <i
              v-if="item.icon"
              :class="['fas', item.icon, 'mr-3 flex-shrink-0 text-gray-400']"
          ></i>
          <span class="truncate">{{ item.label }}</span>
          <span
              v-if="item.badge"
              :class="[
              'ml-auto inline-block py-0.5 px-2 text-xs rounded-full',
              getBadgeClasses(item.badgeVariant)
            ]"
          >
            {{ item.badge }}
          </span>
        </button>
      </template>
    </template>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'

interface MenuItem {
  label: string
  icon?: string
  to?: string | Record<string, any>
  disabled?: boolean
  badge?: string | number
  badgeVariant?: BadgeVariant
  children?: MenuItem[]
  divider?: boolean
  title?: string
  [key: string]: any
}

interface Props {
  items: MenuItem[]
  exact?: boolean
}

const props = withDefaults(props<Props>(), {
  exact: false
})

const emit = defineEmits(['click'])

// Composables
const route = useRoute()

// State
const expandedItems = ref<MenuItem[]>([])

// Methods
const isActive = (item: MenuItem) => {
  if (!item.to) return false

  if (typeof item.to === 'string') {
    return props.exact
        ? route.path === item.to
        : route.path.startsWith(item.to)
  }

  return false
}

const isExpanded = (item: MenuItem) => {
  return expandedItems.value.includes(item)
}

const toggleSubmenu = (item: MenuItem) => {
  const index = expandedItems.value.indexOf(item)
  if (index === -1) {
    expandedItems.value.push(item)
  } else {
    expandedItems.value.splice(index, 1)
  }
}

const handleClick = (item: MenuItem) => {
  if (item.disabled) return
  emit('click', item)
}

const getBadgeClasses = (variant: BadgeVariant = 'primary') => {
  const classes = {
    primary: 'bg-primary-100 text-primary-800',
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800'
  }
  return classes[variant]
}
</script>