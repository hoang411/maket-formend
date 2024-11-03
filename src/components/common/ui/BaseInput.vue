<!-- src/components/ui/BaseInput.vue -->
<template>
  <div>
    <!-- Label -->
    <label
        v-if="label"
        :for="id"
        class="block text-sm font-medium text-gray-700 mb-1"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <!-- Input Group -->
    <div class="relative">
      <!-- Prefix Icon -->
      <div
          v-if="prefixIcon"
          class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <i :class="['fas', prefixIcon, 'text-gray-400']"></i>
      </div>

      <!-- Input -->
      <input
          :id="id"
          :type="type"
          :value="modelValue"
          :placeholder="placeholder"
          :required="required"
          :disabled="disabled"
          :class="[
          'block w-full rounded-md shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm',
          { 'pl-10': prefixIcon },
          { 'pr-10': suffixIcon || clearable },
          { 'border-red-300': error },
          { 'bg-gray-50': disabled }
        ]"
          @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
          @blur="$emit('blur', $event)"
      />

      <!-- Suffix Icon -->
      <div
          v-if="suffixIcon"
          class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
      >
        <i :class="['fas', suffixIcon, 'text-gray-400']"></i>
      </div>

      <!-- Clear Button -->
      <button
          v-if="clearable && modelValue"
          type="button"
          class="absolute inset-y-0 right-0 pr-3 flex items-center"
          @click="$emit('update:modelValue', '')"
      >
        <i class="fas fa-times-circle text-gray-400 hover:text-gray-600"></i>
      </button>
    </div>

    <!-- Error Message -->
    <p
        v-if="error"
        class="mt-1 text-sm text-red-600"
    >
      {{ error }}
    </p>

    <!-- Helper Text -->
    <p
        v-else-if="helper"
        class="mt-1 text-sm text-gray-500"
    >
      {{ helper }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string
  id?: string
  label?: string
  type?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  clearable?: boolean
  prefixIcon?: string
  suffixIcon?: string
  error?: string
  helper?: string
}

const props = withDefaults(props<Props>(), {
  type: 'text',
  required: false,
  disabled: false,
  clearable: false
})

defineEmits(['update:modelValue', 'blur'])
</script>