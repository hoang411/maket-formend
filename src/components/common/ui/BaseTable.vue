<!-- src/components/ui/BaseTable.vue -->
<template>
  <div class="overflow-x-auto">
    <!-- Table Container -->
    <div class="min-w-full shadow ring-1 ring-black ring-opacity-5 rounded-lg">
      <table class="min-w-full divide-y divide-gray-300">
        <!-- Table Header -->
        <thead class="bg-gray-50">
        <tr>
          <!-- Checkbox Column -->
          <th
              v-if="selectable"
              scope="col"
              class="relative w-12 px-6 sm:w-16 sm:px-8"
          >
            <input
                type="checkbox"
                class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300"
                :checked="isAllSelected"
                :indeterminate="isIndeterminate"
                @change="toggleAll"
            />
          </th>

          <!-- Column Headers -->
          <th
              v-for="column in columns"
              :key="column.key"
              scope="col"
              :class="[
                'px-3 py-3.5 text-left text-sm font-semibold text-gray-900',
                column.class,
                { 'cursor-pointer hover:bg-gray-100': column.sortable }
              ]"
              @click="column.sortable && handleSort(column.key)"
          >
            <div class="flex items-center space-x-1">
              <span>{{ column.label }}</span>
              <!-- Sort Icon -->
              <span v-if="column.sortable">
                  <i
                      class="fas"
                      :class="{
                      'fa-sort': sortKey !== column.key,
                      'fa-sort-up': sortKey === column.key && sortOrder === 'asc',
                      'fa-sort-down': sortKey === column.key && sortOrder === 'desc'
                    }"
                  ></i>
                </span>
            </div>
          </th>

          <!-- Actions Column -->
          <th
              v-if="hasActions"
              scope="col"
              class="relative py-3.5 pl-3 pr-4 sm:pr-6"
          >
            <span class="sr-only">Actions</span>
          </th>
        </tr>
        </thead>

        <!-- Table Body -->
        <tbody class="divide-y divide-gray-200 bg-white">
        <!-- Empty State -->
        <tr v-if="!items.length">
          <td
              :colspan="totalColumns"
              class="px-3 py-4 text-center text-sm text-gray-500"
          >
            <div class="flex flex-col items-center py-6">
              <i class="fas fa-inbox text-4xl text-gray-400 mb-2"></i>
              <p>{{ emptyText }}</p>
            </div>
          </td>
        </tr>

        <!-- Data Rows -->
        <tr
            v-for="item in items"
            :key="getItemKey(item)"
            :class="{ 'bg-gray-50': isSelected(item) }"
        >
          <!-- Selection Checkbox -->
          <td
              v-if="selectable"
              class="relative w-12 px-6 sm:w-16 sm:px-8"
          >
            <input
                type="checkbox"
                class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300"
                :checked="isSelected(item)"
                @change="toggleSelection(item)"
            />
          </td>

          <!-- Data Cells -->
          <td
              v-for="column in columns"
              :key="column.key"
              :class="['whitespace-nowrap px-3 py-4 text-sm text-gray-500', column.class]"
          >
            <slot
                :name="column.key"
                :item="item"
                :value="getColumnValue(item, column)"
            >
              {{ getColumnValue(item, column) }}
            </slot>
          </td>

          <!-- Actions -->
          <td
              v-if="hasActions"
              class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
          >
            <slot name="actions" :item="item">
              <button
                  v-if="$slots.edit"
                  class="text-primary-600 hover:text-primary-900 mr-2"
                  @click="$emit('edit', item)"
              >
                Edit
              </button>
              <button
                  v-if="$slots.delete"
                  class="text-red-600 hover:text-red-900"
                  @click="$emit('delete', item)"
              >
                Delete
              </button>
            </slot>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Column {
  key: string
  label: string
  sortable?: boolean
  class?: string
  format?: (value: any) => any
}

interface Props {
  columns: Column[]
  items: any[]
  selectable?: boolean
  selected?: any[]
  sortKey?: string
  sortOrder?: 'asc' | 'desc'
  itemKey?: string
  emptyText?: string
}

const props = withDefaults(props<Props>(), {
  selectable: false,
  selected: () => [],
  itemKey: 'id',
  emptyText: 'Không có dữ liệu'
})

const emit = defineEmits([
  'update:selected',
  'update:sortKey',
  'update:sortOrder',
  'edit',
  'delete'
])

// Computed
const hasActions = computed(() => {
  return !!slots.actions || !!slots.edit || !!slots.delete
})

const totalColumns = computed(() => {
  return props.columns.length + (props.selectable ? 1 : 0) + (hasActions.value ? 1 : 0)
})

const isAllSelected = computed(() => {
  return props.items.length > 0 && props.items.every(item => isSelected(item))
})

const isIndeterminate = computed(() => {
  return !isAllSelected.value && props.items.some(item => isSelected(item))
})

// Methods
const getItemKey = (item: any) => {
  return item[props.itemKey]
}

const getColumnValue = (item: any, column: Column) => {
  const value = item[column.key]
  return column.format ? column.format(value) : value
}

const isSelected = (item: any) => {
  return props.selected.some(selectedItem =>
      getItemKey(selectedItem) === getItemKey(item)
  )
}

const toggleSelection = (item: any) => {
  const selected = [...props.selected]
  const index = selected.findIndex(selectedItem =>
      getItemKey(selectedItem) === getItemKey(item)
  )

  if (index === -1) {
    selected.push(item)
  } else {
    selected.splice(index, 1)
  }

  emit('update:selected', selected)
}

const toggleAll = () => {
  emit('update:selected', isAllSelected.value ? [] : [...props.items])
}

const handleSort = (key: string) => {
  if (props.sortKey === key) {
    emit('update:sortOrder', props.sortOrder === 'asc' ? 'desc' : 'asc')
  } else {
    emit('update:sortKey', key)
    emit('update:sortOrder', 'asc')
  }
}
</script>