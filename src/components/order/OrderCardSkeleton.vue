<template>
  <div class="bg-white shadow rounded-lg overflow-hidden animate-pulse">
    <!-- Header Skeleton -->
    <div class="px-4 py-5 sm:px-6 flex justify-between items-center border-b">
      <div class="space-y-2">
        <div class="h-5 bg-gray-200 rounded w-32" />
        <div class="h-4 bg-gray-200 rounded w-40" />
      </div>
      <div class="h-6 bg-gray-200 rounded w-24" />
    </div>

    <!-- Items Skeleton -->
    <div class="px-4 py-5 sm:p-6">
      <div class="space-y-4">
        <div
            v-for="n in 2"
            :key="n"
            class="flex items-center space-x-4"
        >
          <div class="h-16 w-16 bg-gray-200 rounded-md" />
          <div class="flex-1 space-y-2">
            <div class="h-4 bg-gray-200 rounded w-3/4" />
            <div class="h-4 bg-gray-200 rounded w-1/4" />
          </div>
          <div class="h-4 bg-gray-200 rounded w-20" />
        </div>
      </div>

      <!-- Summary Skeleton -->
      <div class="mt-6 border-t border-gray-200 pt-4">
        <div class="space-y-2">
          <div class="flex justify-between">
            <div class="h-4 bg-gray-200 rounded w-20" />
            <div class="h-4 bg-gray-200 rounded w-24" />
          </div>
          <div class="flex justify-between">
            <div class="h-4 bg-gray-200 rounded w-20" />
            <div class="h-4 bg-gray-200 rounded w-24" />
          </div>
          <div class="flex justify-between">
            <div class="h-4 bg-gray-200 rounded w-20" />
            <div class="h-4 bg-gray-200 rounded w-24" />
          </div>
          <div class="flex justify-between pt-2 border-t border-gray-200">
            <div class="h-5 bg-gray-200 rounded w-24" />
            <div class="h-6 bg-gray-200 rounded w-32" />
          </div>
        </div>
      </div>

      <!-- Actions Skeleton -->
      <div class="mt-6 flex justify-end space-x-3">
        <div class="h-9 bg-gray-200 rounded w-24" />
        <div class="h-9 bg-gray-200 rounded w-24" />
      </div>
    </div>
  </div>
</template>