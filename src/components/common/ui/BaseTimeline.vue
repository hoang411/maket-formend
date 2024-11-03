<!-- src/components/ui/BaseTimeline.vue -->
<template>
  <div class="flow-root">
    <ul class="-mb-8">
      <li
          v-for="(item, index) in items"
          :key="index"
          class="relative pb-8"
      >
        <!-- Connector Line -->
        <div
            v-if="index !== items.length - 1"
            class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
            :class="{ 'left-5': size === 'lg' }"
            aria-hidden="true"
        ></div>

        <div class="relative flex items-start space-x-3">
          <!-- Icon/Dot -->
          <div
              class="relative flex items-center justify-center"
              :class="[
              iconSizeClasses[size],
              { 'bg-gray-100 rounded-full': !item.icon }
            ]"
          >
            <template v-if="item.icon">
              <i
                  :class="[
                  'fas',
                  item.icon,
                  iconColorClasses[item.color || 'primary']
                ]"
              ></i>
            </template>
            <template v-else>
              <div
                  :class="[
                  dotSizeClasses[size],
                  'rounded-full',
                  dotColorClasses[item.color || 'primary']
                ]"
              ></div>
            </template>
          </div>

          <!-- Content -->
          <div class="min-w-0 flex-1">
            <div>
              <div class="flex items-center text-sm">
                <!-- Title -->
                <p
                    class="font-medium text-gray-900"
                    :class="{ 'truncate': truncate }"
                >
                  {{ item.title }}
                </p>

                <!-- Date -->
                <p
                    v-if="item.date"
                    class="ml-2 text-sm text-gray-500"
                >
                  {{ item.date }}
                </p>

                <!-- Badge -->
                <div
                    v-if="item.badge"
                    class="ml-2"
                >
                  <BaseBadge
                      :label="item.badge"
                      :color="item.badgeColor || 'primary'"
                      variant="soft"
                      size="sm"
                  />
                </div>
              </div>

              <!-- Description -->
              <p
                  v-if="item.description"
                  class="mt-1 text-sm text-gray-500"
                  :class="{ 'line-clamp-2': truncate }"
              >
                {{ item.description }}
              </p>

              <!-- Custom Content -->
              <slot
                  :name="`content-${index}`"
                  :item="item"
              ></slot>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import BaseBadge from './BaseBadge.vue'

type TimelineSize = 'sm' | 'md' | 'lg'
type TimelineColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'

interface TimelineItem {
  title: string
  description?: string
  date?: string
  icon?: string
  color?: TimelineColor
  badge?: string
  badgeColor?: TimelineColor
  [key: string]: any
}

interface Props {
  items: TimelineItem[]
  size?: TimelineSize
  truncate?: boolean
}

const props = withDefaults(props<Props>(), {
  size: 'md',
  truncate: false
})

// Icon Size Classes
const iconSizeClasses: Record<TimelineSize, string> = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-10 w-10'
}

// Dot Size Classes
const dotSizeClasses: Record<TimelineSize, string> = {
  sm: 'h-2 w-2',
  md: 'h-3 w-3',
  lg: 'h-4 w-4'
}

// Color Classes
const iconColorClasses: Record<TimelineColor, string> = {
  primary: 'text-primary-500',
  secondary: 'text-gray-500',
  success: 'text-green-500',
  danger: 'text-red-500',
  warning: 'text-yellow-500',
  info: 'text-blue-500'
}

const dotColorClasses: Record<TimelineColor, string> = {
  primary: 'bg-primary-500',
  secondary: 'bg-gray-500',
  success: 'bg-green-500',
  danger: 'bg-red-500',
  warning: 'bg-yellow-500',
  info: 'bg-blue-500'
}
</script>