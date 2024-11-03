<!-- src/components/ui/BaseCheckbox.vue -->
<template>
  <div class="relative flex items-start">
    <div class="flex h-5 items-center">
      <input
          :id="id"
          type="checkbox"
          :checked="modelValue"
          :disabled="disabled"
          :required="required"
          class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          :class="{ 'opacity-50 cursor-not-allowed': disabled }"
          @change="handleChange"
      />
    </div>
    <div class="ml-3 text-sm">
      <label
          v-if="label"
          :for="id"
          class="font-medium text-gray-700"
          :class="{ 'opacity-50': disabled }"
      >
        {{ label }}
        <span v-if="required" class="text-red-500">*</span>
      </label>
      <p
          v-if="helper"
          class="text-gray-500"
          :class="{ 'opacity-50': disabled }"
      >
        {{ helper }}
      </p>
    </div>
  </div>

  <!-- Error Message -->
  <p
      v-if="error"
      class="mt-1 text-sm text-red-600"
  >
    {{ error }}
  </p>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
  id?: string
  label?: string
  helper?: string
  required?: boolean
  disabled?: boolean
  error?: string
}

const props = withDefaults(props<Props>(), {
  required: false,
  disabled: false
})

const emit = defineEmits(['update:modelValue', 'change'])

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
  emit('change', target.checked)
}
</script>