<!-- src/components/ui/BaseTextarea.vue -->
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

    <!-- Textarea Container -->
    <div class="relative">
      <textarea
          :id="id"
          :value="modelValue"
          :placeholder="placeholder"
          :rows="rows"
          :maxlength="maxLength"
          :required="required"
          :disabled="disabled"
          :class="[
          'block w-full rounded-md shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm',
          { 'border-red-300': error },
          { 'bg-gray-50': disabled },
          { 'resize-none': !resizable }
        ]"
          @input="handleInput"
          @blur="$emit('blur', $event)"
      ></textarea>

      <!-- Character Count -->
      <div
          v-if="showCharCount && maxLength"
          class="absolute bottom-2 right-2 text-xs text-gray-500"
      >
        {{ currentLength }}/{{ maxLength }}
      </div>
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
import { computed } from 'vue'

interface Props {
  modelValue: string
  id?: string
  label?: string
  placeholder?: string
  rows?: number
  maxLength?: number
  required?: boolean
  disabled?: boolean
  resizable?: boolean
  showCharCount?: boolean
  error?: string
  helper?: string
}

const props = withDefaults(props<Props>(), {
  rows: 3,
  required: false,
  disabled: false,
  resizable: true,
  showCharCount: false
})

const emit = defineEmits(['update:modelValue', 'blur'])

// Computed
const currentLength = computed(() => props.modelValue.length)

// Methods
const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}
</script>