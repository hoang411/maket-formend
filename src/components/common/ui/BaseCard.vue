<!-- src/components/ui/BaseCard.vue -->
<template>
  <div
      :class="[
      'overflow-hidden rounded-lg bg-white shadow',
      { 'hover:shadow-md transition-shadow duration-300': hover }
    ]"
  >
    <!-- Image -->
    <div v-if="$slots.image || image" class="relative">
      <slot name="image">
        <img
            :src="image"
            :alt="imageAlt"
            class="h-48 w-full object-cover"
        />
      </slot>

      <!-- Badge -->
      <div
          v-if="badge"
          class="absolute top-2 right-2"
      >
        <slot name="badge">
          <span
              :class="[
              'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
              badgeClasses[badgeVariant]
            ]"
          >
            {{ badge }}
          </span>
        </slot>
      </div>
    </div>

    <!-- Header -->
    <div
        v-if="$slots.header || title"
        class="border-b border-gray-200 px-4 py-5 sm:px-6"
    >
      <slot name="header">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          {{ title }}
        </h3>
        <p
            v-if="subtitle"
            class="mt-1 text-sm text-gray-500"
        >
          {{ subtitle }}
        </p>
      </slot>
    </div>

    <!-- Content -->
    <div
        :class="[
        'px-4 py-5 sm:p-6',
        { 'space-y-4': divided }
      ]"
    >
      <slot></slot>
    </div>

    <!-- Footer -->
    <div
        v-if="$slots.footer"
        class="border-t border-gray-200 px-4 py-4 sm:px-6"
    >
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
  image?: string
  imageAlt?: string
  badge?: string
  badgeVariant?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  hover?: boolean
  divided?: boolean
}

const props = withDefaults(props<Props>(), {
  badgeVariant: 'primary',
  hover: false,
  divided: false
})

const badgeClasses = {
  primary: 'bg-primary-100 text-primary-800',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  danger: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-800'
}
</script>