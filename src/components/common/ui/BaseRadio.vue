<!-- src/components/ui/BaseRadio.vue -->
<template>
  <div class="space-y-4">
    <div
        v-for="option in options"
        :key="getOptionValue(option)"
        class="relative flex items-start"
    >
      <div class="flex h-5 items-center">
        <input
            :id="getOptionId(option)"
            type="radio"
            :name="name"
            :value="getOptionValue(option)"
            :checked="modelValue === getOptionValue(option)"
            :disabled="disabled || option.disabled"
            :required="required"
            class="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
            :class="{ 'opacity-50 cursor-not-allowed': disabled || option.disabled }"
            @change="handleChange($event, option)"
        />
      </div>
      <div class="ml-3 text-sm">
        <label
            :for="getOptionId(option)"
            class="font-medium text-gray-700"
            :class="{ 'opacity-50': disabled || option.disabled }"
        >
          {{ getOptionLabel(option) }}
        </label>
        <p
            v-if="option.helper"
            class="text-gray-500"
            :class="{ 'opacity-50': disabled || option.disabled }"
        >
          {{ option.helper }}
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
  </div>
</template>

<script setup lang="ts">
interface Option {
  label?: string
  value?: any
  helper?: string
  disabled?: boolean
  [key: string]: any
}

interface Props {
  modelValue: any
  options: Option[]
  name: string
  labelKey?: string
  valueKey?: string
  required?: boolean
  disabled?: boolean
  error?: string
}

const props = withDefaults(props<Props>(), {
  labelKey: 'label',
  valueKey: 'value',
  required: false,
  disabled: false
})

const emit = defineEmits(['update:modelValue', 'change'])

// Methods
const getOptionValue = (option: Option) => {
  return option[props.valueKey] ?? option
}

const getOptionLabel = (option: Option) => {
  return option[props.labelKey] ?? option
}

const getOptionId = (option: Option) => {
  return `${props.name}-${getOptionValue(option)}`
}

const handleChange = (event: Event, option: Option) => {
  const value = getOptionValue(option)
  emit('update:modelValue', value)
  emit('change', value)
}
</script>