<template>
  <div class="bg-white shadow rounded-lg p-4 animate-pulse">
    <div class="flex items-center space-x-4">
      <!-- Image Skeleton -->
      <div class="flex-shrink-0">
        <div class="h-20 w-20 bg-gray-200 rounded-md" />
      </div>

      <!-- Content Skeleton -->
      <div class="flex-1">
        <div class="space-y-3">
          <!-- Title -->
          <div class="h-4 bg-gray-200 rounded w-3/4" />

          <!-- Category -->
          <div class="h-3 bg-gray-200 rounded w-1/4" />

          <!-- Bottom Row -->
          <div class="flex justify-between items-center pt-2">
            <!-- Quantity Control -->
            <div class="h-8 bg-gray-200 rounded w-24" />

            <!-- Price -->
            <div class="h-5 bg-gray-200 rounded w-20" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>