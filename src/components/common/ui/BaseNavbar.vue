<!-- src/components/ui/BaseNavbar.vue -->
<template>
  <nav
      class="bg-white shadow"
      :class="{ 'border-b border-gray-200': bordered }"
  >
    <div
        class="mx-auto px-4 sm:px-6 lg:px-8"
        :class="[containerClass]"
    >
      <div class="flex h-16 justify-between">
        <!-- Left Section -->
        <div class="flex">
          <!-- Logo -->
          <div class="flex flex-shrink-0 items-center">
            <slot name="logo">
              <img
                  v-if="logo"
                  :src="logo"
                  :alt="logoAlt"
                  class="block h-8 w-auto"
              >
            </slot>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <slot name="desktop-nav">
              <template v-for="(item, index) in items" :key="index">
                <router-link
                    v-if="item.to"
                    :to="item.to"
                    class="inline-flex items-center px-1 pt-1 text-sm font-medium"
                    :class="[
                    isActive(item)
                      ? 'border-b-2 border-primary-500 text-gray-900'
                      : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  ]"
                >
                  {{ item.label }}
                </router-link>
              </template>
            </slot>
          </div>
        </div>

        <!-- Right Section -->
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <slot name="right-items"></slot>
        </div>

        <!-- Mobile Menu Button -->
        <div class="flex items-center sm:hidden">
          <button
              type="button"
              class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              @click="toggleMobileMenu"
          >
            <span class="sr-only">Open main menu</span>
            <i
                class="fas"
                :class="isOpen ? 'fa-times' : 'fa-bars'"
            ></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
    >
      <div v-if="isOpen" class="sm:hidden">
        <div class="space-y-1 pb-3 pt-2">
          <slot name="mobile-nav">
            <template v-for="(item, index) in items" :key="index">
              <router-link
                  v-if="item.to"
                  :to="item.to"
                  class="block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
                  :class="[
                  isActive(item)
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                ]"
                  @click="isOpen = false"
              >
                {{ item.label }}
              </router-link>
            </template>
          </slot>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

interface NavItem {
  label: string
  to: string | Record<string, any>
  [key: string]: any
}

interface Props {
  items?: NavItem[]
  logo?: string
  logoAlt?: string
  bordered?: boolean
  containerClass?: string
  exact?: boolean
}

const props = withDefaults(props<Props>(), {
  items: () => [],
  logoAlt: 'Logo',
  bordered: true,
  containerClass: 'max-w-7xl',
  exact: false
})

// Composables
const route = useRoute()

// State
const isOpen = ref(false)

// Methods
const isActive = (item: NavItem) => {
  if (typeof item.to === 'string') {
    return props.exact
        ? route.path === item.to
        : route.path.startsWith(item.to)
  }
  return false
}

const toggleMobileMenu = () => {
  isOpen.value = !isOpen.value
}
</script>