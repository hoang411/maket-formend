<!-- src/components/ui/BaseSwitch.vue -->
<template>
  <div class="relative flex items-start">
    <!-- Switch -->
    <div class="flex h-6 items-center">
      <button
          :id="id"
          type="button"
          role="switch"
          :aria-checked="modelValue"
          :disabled="disabled"
          class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          :class="[
          modelValue ? 'bg-primary-600' : 'bg-gray-200',
          { 'opacity-50 cursor-not-allowed': disabled }
        ]"
          @click="toggle"
      >
        <span
            class="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
            :class="[
            modelValue ? 'translate-x-5' : 'translate-x-0'
          ]"
        >
          <span
              class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
              :class="[
              modelValue
                ? 'opacity-0 duration-100 ease-out'
                : 'opacity-100 duration-200 ease-in'
            ]"
              aria-hidden="true"
          >
            <slot name="off-icon">
              <i v-if="offIcon" :class="['fas', offIcon]"></i>
            </slot>
          </span>
          <span
              class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
              :class="[
              modelValue
                ? 'opacity-100 duration-200 ease-in'
                : 'opacity-0 duration-100 ease-out'
            ]"
              aria-hidden="true"
          >
            <slot name="on-icon">
              <i v-if="onIcon" :class="['fas', onIcon]"></i>
            </slot>
          </span>
        </span>
      </button>
    </div>

    <!-- Label -->
    <div class="ml-3">
      <label
          v-if="label"
          :for="id"
          class="text-sm font-medium text-gray-700"
          :class="{ 'opacity-50': disabled }"
      >
        {{ label }}
      </label>
      <p
          v-if="helper"
          class="text-sm text-gray-500"
          :class="{ 'opacity-50': disabled }"
      >
        {{ helper }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
  id?: string
  label?: string
  helper?: string
  disabled?: boolean
  onIcon?: string
  offIcon?: string
}

const props = withDefaults(props<Props>(), {
  disabled: false
})

const emit = defineEmits(['update:modelValue', 'change'])

const toggle = () => {
  if (!props.disabled) {
    const newValue = !props.modelValue
    emit('update:modelValue', newValue)
    emit('change', newValue)
  }
}
</script>