<!-- src/components/ui/BaseDatePicker.vue -->
<template>
  <div class="relative">
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
      <input
          :id="id"
          ref="inputRef"
          type="text"
          :value="formattedValue"
          :placeholder="placeholder"
          :disabled="disabled"
          :required="required"
          readonly
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          :class="{
          'border-red-300': error,
          'bg-gray-50': disabled
        }"
          @click="!disabled && (isOpen = true)"
      />

      <!-- Calendar Icon -->
      <div class="absolute inset-y-0 right-0 flex items-center pr-3">
        <i class="fas fa-calendar text-gray-400"></i>
      </div>
    </div>

    <!-- Calendar Dropdown -->
    <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-1"
    >
      <div
          v-if="isOpen"
          class="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg"
      >
        <div class="p-4">
          <!-- Calendar Header -->
          <div class="flex items-center justify-between mb-4">
            <button
                type="button"
                class="p-1 hover:bg-gray-100 rounded-full"
                @click="previousMonth"
            >
              <i class="fas fa-chevron-left"></i>
            </button>
            <span class="text-sm font-medium">
              {{ currentMonthName }} {{ currentYear }}
            </span>
            <button
                type="button"
                class="p-1 hover:bg-gray-100 rounded-full"
                @click="nextMonth"
            >
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>

          <!-- Calendar Grid -->
          <div class="grid grid-cols-7 gap-1">
            <!-- Weekday Headers -->
            <div
                v-for="day in weekDays"
                :key="day"
                class="text-center text-xs font-medium text-gray-500"
            >
              {{ day }}
            </div>

            <!-- Calendar Days -->
            <button
                v-for="date in calendarDays"
                :key="date.toISOString()"
                type="button"
                class="p-2 text-sm rounded-full hover:bg-gray-100"
                :class="[
                isSelectedDate(date) && 'bg-primary-500 text-white hover:bg-primary-600',
                isToday(date) && !isSelectedDate(date) && 'border border-primary-500',
                !isCurrentMonth(date) && 'text-gray-400'
              ]"
                @click="selectDate(date)"
            >
              {{ date.getDate() }}
            </button>
          </div>

          <!-- Today Button -->
          <div class="mt-4 text-center">
            <button
                type="button"
                class="text-sm text-primary-600 hover:text-primary-500"
                @click="selectToday"
            >
              Today
            </button>
          </div>
        </div>
      </div>
    </Transition>

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
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Props {
  modelValue: Date | null
  id?: string
  label?: string
  placeholder?: string
  format?: string
  helper?: string
  required?: boolean
  disabled?: boolean
  error?: string
  minDate?: Date
  maxDate?: Date
}

const props = withDefaults(props<Props>(), {
  format: 'MM/DD/YYYY',
  required: false,
  disabled: false
})

const emit = defineEmits(['update:modelValue', 'change'])

// Refs
const inputRef = ref<HTMLInputElement | null>(null)
const isOpen = ref(false)
const currentDate = ref(new Date())

// Weekdays
const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

// Computed
const currentYear = computed(() => currentDate.value.getFullYear())
const currentMonth = computed(() => currentDate.value.getMonth())
const currentMonthName = computed(() => {
  return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(currentDate.value)
})

const formattedValue = computed(() => {
  if (!props.modelValue) return ''
  return formatDate(props.modelValue)
})

const calendarDays = computed(() => {
  const days = []
  const firstDay = new Date(currentYear.value, currentMonth.value, 1)
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0)

  // Previous month days
  const prevMonthDays = firstDay.getDay()
  for (let i = prevMonthDays - 1; i >= 0; i--) {
    days.push(new Date(currentYear.value, currentMonth.value, -i))
  }

  // Current month days
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(currentYear.value, currentMonth.value, i))
  }

  // Next month days
  const remainingDays = 42 - days.length
  for (let i = 1; i <= remainingDays; i++) {
    days.push(new Date(currentYear.value, currentMonth.value + 1, i))
  }

  return days
})

// Methods
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US').format(date)
}

const isSelectedDate = (date: Date) => {
  if (!props.modelValue) return false
  return date.toDateString() === props.modelValue.toDateString()
}

const isToday = (date: Date) => {
  return date.toDateString() === new Date().toDateString()
}

const isCurrentMonth = (date: Date) => {
  return date.getMonth() === currentMonth.value
}

const selectDate = (date: Date) => {
  emit('update:modelValue', date)
  emit('change', date)
  isOpen.value = false
}

const selectToday = () => {
  const today = new Date()
  currentDate.value = today
  selectDate(today)
}

const previousMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value - 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value + 1)
}

const handleClickOutside = (event: MouseEvent) => {
  if (inputRef.value && !inputRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>