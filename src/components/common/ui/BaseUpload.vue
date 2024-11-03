<!-- src/components/ui/BaseUpload.vue -->
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

    <!-- Upload Area -->
    <div
        class="relative"
        @dragover.prevent="handleDragOver"
        @dragleave.prevent="handleDragLeave"
        @drop.prevent="handleDrop"
    >
      <input
          :id="id"
          ref="fileInput"
          type="file"
          :accept="accept"
          :multiple="multiple"
          class="sr-only"
          @change="handleFileChange"
      />

      <!-- Upload Zone -->
      <div
          class="flex justify-center rounded-lg border-2 border-dashed p-6"
          :class="[
          isDragging ? 'border-primary-500 bg-primary-50' : 'border-gray-300',
          { 'opacity-50 cursor-not-allowed': disabled }
        ]"
      >
        <div class="text-center">
          <!-- Icon -->
          <i
              class="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"
          ></i>

          <!-- Text -->
          <div class="flex text-sm text-gray-600">
            <label
                :for="id"
                class="relative cursor-pointer rounded-md font-medium text-primary-600 hover:text-primary-500"
            >
              <span>Upload a file</span>
              <span class="text-gray-500 mx-1">or drag and drop</span>
            </label>
          </div>

          <!-- File Types -->
          <p class="text-xs text-gray-500 mt-1">
            {{ acceptedFileTypes }}
          </p>

          <!-- File Size -->
          <p
              v-if="maxSize"
              class="text-xs text-gray-500"
          >
            Max file size: {{ formatFileSize(maxSize) }}
          </p>
        </div>
      </div>

      <!-- File List -->
      <ul
          v-if="files.length"
          class="mt-4 space-y-2"
      >
        <li
            v-for="(file, index) in files"
            :key="index"
            class="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-md"
        >
          <!-- File Info -->
          <div class="flex items-center">
            <i
                class="fas fa-file text-gray-400 mr-2"
            ></i>
            <div>
              <p class="text-sm font-medium text-gray-700">
                {{ file.name }}
              </p>
              <p class="text-xs text-gray-500">
                {{ formatFileSize(file.size) }}
              </p>
            </div>
          </div>

          <!-- Remove Button -->
          <button
              type="button"
              class="text-gray-400 hover:text-gray-500"
              @click="removeFile(index)"
          >
            <i class="fas fa-times"></i>
          </button>
        </li>
      </ul>
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
import { ref, computed } from 'vue'

interface Props {
  modelValue: File | File[]
  id?: string
  label?: string
  helper?: string
  accept?: string
  multiple?: boolean
  maxSize?: number // in bytes
  required?: boolean
  disabled?: boolean
  error?: string
}

const props = withDefaults(props<Props>(), {
  multiple: false,
  required: false,
  disabled: false
})

const emit = defineEmits(['update:modelValue', 'change'])

// Refs
const fileInput = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)
const files = ref<File[]>([])

// Computed
const acceptedFileTypes = computed(() => {
  if (!props.accept) return 'All files are allowed'
  return `Allowed files: ${props.accept.split(',').join(', ')}`
})

// Methods
const handleDragOver = () => {
  if (!props.disabled) {
    isDragging.value = true
  }
}

const handleDragLeave = () => {
  isDragging.value = false
}

const handleDrop = (event: DragEvent) => {
  if (props.disabled) return

  isDragging.value = false
  const droppedFiles = Array.from(event.dataTransfer?.files || [])
  handleFiles(droppedFiles)
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const selectedFiles = Array.from(target.files || [])
  handleFiles(selectedFiles)
}

const handleFiles = (newFiles: File[]) => {
  // Validate file types
  if (props.accept) {
    const acceptedTypes = props.accept.split(',')
    newFiles = newFiles.filter(file =>
        acceptedTypes.some(type =>
            file.type.match(type.replace('*', '.*'))
        )
    )
  }

  // Validate file size
  if (props.maxSize) {
    newFiles = newFiles.filter(file => file.size <= props.maxSize!)
  }

  // Update files
  if (props.multiple) {
    files.value = [...files.value, ...newFiles]
  } else {
    files.value = newFiles.slice(0, 1)
  }

  // Emit update
  const value = props.multiple ? files.value : files.value[0]
  emit('update:modelValue', value)
  emit('change', value)
}

const removeFile = (index: number) => {
  files.value.splice(index, 1)
  const value = props.multiple ? files.value : files.value[0]
  emit('update:modelValue', value)
  emit('change', value)
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}
</script>