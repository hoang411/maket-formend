<!-- src/components/ui/BasePagination.vue -->
<template>
  <div class="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
    <!-- Mobile View -->
    <div class="flex flex-1 justify-between sm:hidden">
      <button
          :disabled="currentPage === 1"
          class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
          @click="handlePageChange(currentPage - 1)"
      >
        Trước
      </button>
      <button
          :disabled="currentPage === totalPages"
          class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
          @click="handlePageChange(currentPage + 1)"
      >
        Sau
      </button>
    </div>

    <!-- Desktop View -->
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <!-- Page Info -->
      <div>
        <p class="text-sm text-gray-700">
          Hiển thị
          <span class="font-medium">{{ startItem }}</span>
          đến
          <span class="font-medium">{{ endItem }}</span>
          trong số
          <span class="font-medium">{{ totalItems }}</span>
          kết quả
        </p>
      </div>

      <!-- Page Numbers -->
      <div>
        <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <!-- Previous Button -->
          <button
              :disabled="currentPage === 1"
              class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
              @click="handlePageChange(currentPage - 1)"
          >
            <span class="sr-only">Previous</span>
            <i class="fas fa-chevron-left h-5 w-5"></i>
          </button>

          <!-- First Page -->
          <button
              v-if="showFirstPage"
              class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              @click="handlePageChange(1)"
          >
            1
          </button>

          <!-- Left Ellipsis -->
          <span
              v-if="showLeftEllipsis"
              class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300"
          >
            ...
          </span>

          <!-- Page Numbers -->
          <button
              v-for="page in visiblePages"
              :key="page"
              :class="[
              'relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300',
              page === currentPage
                ? 'z-10 bg-primary-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600'
                : 'text-gray-900 hover:bg-gray-50'
            ]"
              @click="handlePageChange(page)"
          >
            {{ page }}
          </button>

          <!-- Right Ellipsis -->
          <span
              v-if="showRightEllipsis"
              class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300"
          >
            ...
          </span>

          <!-- Last Page -->
          <button
              v-if="showLastPage"
              class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              @click="handlePageChange(totalPages)"
          >
            {{ totalPages }}
          </button>

          <!-- Next Button -->
          <button
              :disabled="currentPage === totalPages"
              class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
              @click="handlePageChange(currentPage + 1)"
          >
            <span class="sr-only">Next</span>
            <i class="fas fa-chevron-right h-5 w-5"></i>
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  currentPage: number
  totalPages: number
  totalItems: number
  pageSize: number
  maxVisiblePages?: number
}

const props = withDefaults(props<Props>(), {
  maxVisiblePages: 5
})

const emit = defineEmits(['update:currentPage'])

// Computed
const startItem = computed(() => {
  return (props.currentPage - 1) * props.pageSize + 1
})

const endItem = computed(() => {
  return Math.min(props.currentPage * props.pageSize, props.totalItems)
})

const visiblePages = computed(() => {
  let start = Math.max(1, props.currentPage - Math.floor(props.maxVisiblePages / 2))
  let end = Math.min(props.totalPages, start + props.maxVisiblePages - 1)

  if (end - start + 1 < props.maxVisiblePages) {
    start = Math.max(1, end - props.maxVisiblePages + 1)
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

const showFirstPage = computed(() => {
  return visiblePages.value[0] > 1
})

const showLastPage = computed(() => {
  return visiblePages.value[visiblePages.value.length - 1] < props.totalPages
})

const showLeftEllipsis = computed(() => {
  return visiblePages.value[0] > 2
})

const showRightEllipsis = computed(() => {
  return visiblePages.value[visiblePages.value.length - 1] < props.totalPages - 1
})

// Methods
const handlePageChange = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('update:currentPage', page)
  }
}
</script>