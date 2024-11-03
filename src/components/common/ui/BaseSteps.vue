<!-- src/components/ui/BaseSteps.vue -->
<template>
  <nav aria-label="Progress">
    <ol
        class="flex"
        :class="{ 'divide-x divide-gray-300': !vertical }"
    >
      <li
          v-for="(step, index) in steps"
          :key="index"
          :class="[
          'relative',
          vertical ? 'pb-10' : 'flex-1',
          { 'pb-0': vertical && isLast(index) }
        ]"
      >
        <!-- Step Container -->
        <div class="flex items-center">
          <!-- Vertical Line -->
          <div
              v-if="vertical"
              class="absolute left-4 top-14 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"
              :class="{ hidden: isLast(index) }"
              aria-hidden="true"
          ></div>

          <!-- Step Circle -->
          <div
              class="relative flex h-8 w-8 items-center justify-center rounded-full"
              :class="[
              getStepStatusClasses(step).circle,
              { 'cursor-pointer': clickable && !step.disabled }
            ]"
              @click="handleStepClick(index, step)"
          >
            <template v-if="isComplete(step)">
              <i class="fas fa-check text-white"></i>
            </template>
            <template v-else-if="isError(step)">
              <i class="fas fa-times text-white"></i>
            </template>
            <template v-else>
              <span>{{ index + 1 }}</span>
            </template>
          </div>

          <!-- Step Content -->
          <div
              class="ml-4"
              :class="{ 'flex-1': !vertical }"
          >
            <span
                class="text-sm font-medium"
                :class="[
                getStepStatusClasses(step).text,
                { 'cursor-pointer': clickable && !step.disabled }
              ]"
                @click="handleStepClick(index, step)"
            >
              {{ step.label }}
            </span>
            <p
                v-if="step.description"
                class="text-sm text-gray-500"
            >
              {{ step.description }}
            </p>
          </div>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
interface Step {
  label: string
  description?: string
  status?: 'complete' | 'current' | 'upcoming' | 'error'
  disabled?: boolean
  [key: string]: any
}

interface Props {
  steps: Step[]
  vertical?: boolean
  clickable?: boolean
  modelValue?: number
}

const props = withDefaults(props<Props>(), {
  vertical: false,
  clickable: false
})

const emit = defineEmits(['update:modelValue', 'click'])

// Methods
const isComplete = (step: Step) => step.status === 'complete'
const isCurrent = (step: Step) => step.status === 'current'
const isError = (step: Step) => step.status === 'error'
const isLast = (index: number) => index === props.steps.length - 1

const getStepStatusClasses = (step: Step) => {
  if (isComplete(step)) {
    return {
      circle: 'bg-primary-600',
      text: 'text-primary-600'
    }
  }
  if (isCurrent(step)) {
    return {
      circle: 'bg-primary-600 text-white',
      text: 'text-primary-600'
    }
  }
  if (isError(step)) {
    return {
      circle: 'bg-red-600 text-white',
      text: 'text-red-600'
    }
  }
  return {
    circle: 'bg-gray-200 text-gray-500',
    text: 'text-gray-500'
  }
}

const handleStepClick = (index: number, step: Step) => {
  if (!props.clickable || step.disabled) return

  emit('update:modelValue', index)
  emit('click', { index, step })
}
</script>