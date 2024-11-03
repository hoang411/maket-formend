<!-- src/components/ui/BaseBreadcrumb.vue -->
<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol class="flex items-center space-x-2">
      <!-- Home -->
      <li v-if="showHome">
        <div class="flex items-center">
          <router-link
              :to="homeLink"
              class="text-gray-500 hover:text-gray-700"
              :class="{ 'cursor-default': !homeLink }"
          >
            <i
                class="fas fa-home"
                :class="{ 'mr-2': homeLabel }"
            ></i>
            <span v-if="homeLabel">{{ homeLabel }}</span>
          </router-link>
        </div>
      </li>

      <!-- Items -->
      <template v-for="(item, index) in items" :key="index">
        <!-- Separator -->
        <li v-if="showHome || index > 0">
          <div class="flex items-center">
            <i
                :class="[
                'fas',
                separator === 'arrow' ? 'fa-chevron-right' : 'fa-slash',
                'text-gray-400 mx-2'
              ]"
            ></i>
          </div>
        </li>

        <!-- Item -->
        <li>
          <div class="flex items-center">
            <router-link
                v-if="item.to && !isLast(index)"
                :to="item.to"
                class="text-gray-500 hover:text-gray-700"
            >
              <i
                  v-if="item.icon"
                  :class="['fas', item.icon, { 'mr-2': item.label }]"
              ></i>
              <span v-if="item.label">{{ item.label }}</span>
            </router-link>
            <span
                v-else
                class="text-gray-900 font-medium"
                :class="{ 'cursor-default': !item.to }"
            >
              <i
                  v-if="item.icon"
                  :class="['fas', item.icon, { 'mr-2': item.label }]"
              ></i>
              <span v-if="item.label">{{ item.label }}</span>
            </span>
          </div>
        </li>
      </template>
    </ol>
  </nav>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  label?: string
  icon?: string
  to?: string | Record<string, any>
}

interface Props {
  items: BreadcrumbItem[]
  showHome?: boolean
  homeLabel?: string
  homeLink?: string | Record<string, any>
  separator?: 'arrow' | 'slash'
}

const props = withDefaults(props<Props>(), {
  showHome: true,
  separator: 'arrow'
})

// Methods
const isLast = (index: number) => {
  return index === props.items.length - 1
}
</script>