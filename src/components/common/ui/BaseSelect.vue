<!-- src/components/ui/BaseSelect.vue -->
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

    <!-- Select Container -->
    <div class="relative">
      <select
          :id="id"
          :value="modelValue"
          :required="required"
          :disabled="disabled"
          :multiple="multiple"
          :class="[
          'block w-full rounded-md shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm',
          { 'border-red-300': error },
          { 'bg-gray-50': disabled }
        ]"
          @change="handleChange"
      >
        <!-- Placeholder Option -->
        <option v-if="placeholder" value="" disabled selected hidden>
          {{ placeholder }}
        </option>

        <!-- Option Groups -->
        <template v-if="hasOptionGroups">
          <optgroup
              v-for="group in options"
              :key="group.label"
              :label="group.label"
          >
            <option
                v-for="option in group.options"
                :key="getOptionValue(option)"
                :value="getOptionValue(option)"
                :disabled="option.disabled"
            >
              {{ getOptionLabel(option) }}
            </option>
          </optgroup>
        </template>

        <!-- Regular Options -->
        <template v-else>
          <option
              v-for="option in options"
              :key="getOptionValue(option)"
              :value="getOptionValue(option)"
              :disabled="option.disabled"
          >
            {{ getOptionLabel(option) }}
          </option>
        </template>
      </select>

      <!-- Arrow Icon -->
      <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <i class="fas fa-chevron-down text-gray-400"></i>
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

interface Option {
  label?: string
  value?: any
  disabled?: boolean
  [key: string]: any
}

interface OptionGroup {
  label: string
  options: Option[]
}

interface Props {
  modelValue: any
  options: Option[] | OptionGroup[]
  id?: string
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  multiple?: boolean
  valueKey?: string
  labelKey?: string
  error?: string
  helper?: string
}

const props = withDefaults(props<Props>(), {
  valueKey: 'value',
  labelKey: 'label',
  required: false,
  disabled: false,
  multiple: false
})

const emit = defineEmits(['update:modelValue', 'change'])

// Check if options are grouped
const hasOptionGroups = computed(() => {
  return props.options.length > 0 && 'options' in props.options[0]
})

// Get option value
const getOptionValue = (option: Option) => {
  return option[props.valueKey] ?? option
}

// Get option label
const getOptionLabel = (option: Option) => {
  return option[props.labelKey] ?? option
}

// Handle change event
const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const value = props.multiple
      ? Array.from(target.selectedOptions).map(option => option.value)
      : target.value

  emit('update:modelValue', value)
  emit('change', value)
}
</script>