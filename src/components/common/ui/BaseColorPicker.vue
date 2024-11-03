<!-- src/components/ui/BaseColorPicker.vue -->
<template>
  <div class="relative">
    <!-- Color Preview Button -->
    <button
        type="button"
        class="flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        :class="{ 'opacity-50': disabled }"
        :disabled="disabled"
        @click="togglePicker"
    >
      <div
          class="h-8 w-8 rounded"
          :style="{ backgroundColor: modelValue }"
      ></div>
    </button>

    <!-- Color Picker Panel -->
    <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
    >
      <div
          v-if="isOpen"
          class="absolute left-0 z-50 mt-2 origin-top-left rounded-md bg-white p-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <!-- Saturation-Value Picker -->
        <div
            ref="saturationRef"
            class="relative h-36 w-56 cursor-pointer rounded"
            :style="{ backgroundColor: hueColor }"
            @mousedown="startPickingSaturation"
            @touchstart="startPickingSaturation"
        >
          <!-- White Gradient -->
          <div
              class="absolute inset-0 rounded"
              style="background: linear-gradient(to right, #fff, transparent)"
          ></div>

          <!-- Black Gradient -->
          <div
              class="absolute inset-0 rounded"
              style="background: linear-gradient(to bottom, transparent, #000)"
          ></div>

          <!-- Picker Pointer -->
          <div
              class="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              :style="{
              left: `${saturation * 100}%`,
              top: `${(1 - value) * 100}%`
            }"
          >
            <div class="h-3 w-3 rounded-full border-2 border-white shadow-sm"></div>
          </div>
        </div>

        <!-- Hue Slider -->
        <div
            ref="hueRef"
            class="relative mt-4 h-4 w-56 cursor-pointer rounded"
            style="background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)"
            @mousedown="startPickingHue"
            @touchstart="startPickingHue"
        >
          <!-- Picker Pointer -->
          <div
              class="absolute top-0 -translate-x-1/2 cursor-pointer"
              :style="{ left: `${hue * 100}%` }"
          >
            <div class="h-4 w-2 rounded-sm border-2 border-white shadow-sm"></div>
          </div>
        </div>

        <!-- Color Inputs -->
        <div class="mt-4 grid grid-cols-2 gap-4">
          <!-- Hex Input -->
          <div>
            <label class="block text-xs font-medium text-gray-700">Hex</label>
            <input
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                :value="hexColor"
                @input="updateFromHex($event.target.value)"
                @focus="$event.target.select()"
            >
          </div>

          <!-- RGB Inputs -->
          <div class="grid grid-cols-3 gap-2">
            <div>
              <label class="block text-xs font-medium text-gray-700">R</label>
              <input
                  type="number"
                  min="0"
                  max="255"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  :value="rgb.r"
                  @input="updateFromRgb('r', parseInt($event.target.value))"
              >
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700">G</label>
              <input
                  type="number"
                  min="0"
                  max="255"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  :value="rgb.g"
                  @input="updateFromRgb('g', parseInt($event.target.value))"
              >
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700">B</label>
              <input
                  type="number"
                  min="0"
                  max="255"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  :value="rgb.b"
                  @input="updateFromRgb('b', parseInt($event.target.value))"
              >
            </div>
          </div>
        </div>

        <!-- Preset Colors -->
        <div v-if="presets.length" class="mt-4">
          <div class="mb-2 text-xs font-medium text-gray-700">Presets</div>
          <div class="grid grid-cols-8 gap-2">
            <button
                v-for="(color, index) in presets"
                :key="index"
                type="button"
                class="h-6 w-6 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                :style="{ backgroundColor: color }"
                @click="selectPreset(color)"
            ></button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Props {
  modelValue: string
  presets?: string[]
  disabled?: boolean
}

const props = withDefaults(props<Props>(), {
  presets: () => [],
  disabled: false
})

const emit = defineEmits(['update:modelValue'])

// Refs
const isOpen = ref(false)
const saturationRef = ref<HTMLElement | null>(null)
const hueRef = ref<HTMLElement | null>(null)

// State
const hue = ref(0)
const saturation = ref(1)
const value = ref(1)

// Color Computations
const hueColor = computed(() => {
  return hsvToHex(hue.value, 1, 1)
})

const hexColor = computed(() => {
  return hsvToHex(hue.value, saturation.value, value.value)
})

const rgb = computed(() => {
  return hexToRgb(hexColor.value)
})

// Methods
function hsvToHex(h: number, s: number, v: number): string {
  let r: number, g: number, b: number

  const i = Math.floor(h * 6)
  const f = h * 6 - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)

  switch (i % 6) {
    case 0: r = v; g = t; b = p; break
    case 1: r = q; g = v; b = p; break
    case 2: r = p; g = v; b = t; break
    case 3: r = p; g = q; b = v; break
    case 4: r = t; g = p; b = v; break
    case 5: r = v; g = p; b = q; break
    default: r = 0; g = 0; b = 0
  }

  const toHex = (n: number) => {
    const hex = Math.round(n * 255).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

function hexToHsv(hex: string): { h: number; s: number; v: number } {
  const { r, g, b } = hexToRgb(hex)
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const d = max - min
  let h = 0

  if (d === 0) h = 0
  else if (max === r) h = ((g - b) / d) % 6
  else if (max === g) h = (b - r) / d + 2
  else if (max === b) h = (r - g) / d + 4

  h = h < 0 ? h + 6 : h
  h /= 6

  const s = max === 0 ? 0 : d / max
  const v = max

  return { h, s, v }
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return { r: 0, g: 0, b: 0 }

  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  }
}

function updateColor() {
  emit('update:modelValue', hexColor.value)
}

function updateFromHex(hex: string) {
  if (/^#[0-9A-F]{6}$/i.test(hex)) {
    const { h, s, v } = hexToHsv(hex)
    hue.value = h
    saturation.value = s
    value.value = v
    updateColor()
  }
}

function updateFromRgb(channel: 'r' | 'g' | 'b', value: number) {
  const newRgb = { ...rgb.value, [channel]: Math.min(255, Math.max(0, value)) }
  const hex = '#' + Object.values(newRgb)
      .map(n => n.toString(16).padStart(2, '0'))
      .join('')
  updateFromHex(hex)
}

function handleSaturationChange(event: MouseEvent | TouchEvent) {
  if (!saturationRef.value) return

  const rect = saturationRef.value.getBoundingClientRect()
  const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX
  const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY

  saturation.value = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
  value.value = Math.min(1, Math.max(0, 1 - (clientY - rect.top) / rect.height))
  updateColor()
}

function handleHueChange(event: MouseEvent | TouchEvent) {
  if (!hueRef.value) return

  const rect = hueRef.value.getBoundingClientRect()
  const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX

  hue.value = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
  updateColor()
}

function startPickingSaturation(event: MouseEvent | TouchEvent) {
  handleSaturationChange(event)

  const moveHandler = (e: MouseEvent | TouchEvent) => {
    e.preventDefault()
    handleSaturationChange(e)
  }

  const upHandler = () => {
    document.removeEventListener('mousemove', moveHandler)
    document.removeEventListener('mouseup', upHandler)
    document.removeEventListener('touchmove', moveHandler)
    document.removeEventListener('touchend', upHandler)
  }

  document.addEventListener('mousemove', moveHandler)
  document.addEventListener('mouseup', upHandler)
  document.addEventListener('touchmove', moveHandler)
  document.addEventListener('touchend', upHandler)
}

function startPickingHue(event: MouseEvent | TouchEvent) {
  handleHueChange(event)

  const moveHandler = (e: MouseEvent | TouchEvent) => {
    e.preventDefault()
    handleHueChange(e)
  }

  const upHandler = () => {
    document.removeEventListener('mousemove', moveHandler)
    document.removeEventListener('mouseup', upHandler)
    document.removeEventListener('touchmove', moveHandler)
    document.removeEventListener('touchend', upHandler)
  }

  document.addEventListener('mousemove', moveHandler)
  document.addEventListener('mouseup', upHandler)
  document.addEventListener('touchmove', moveHandler)
  document.addEventListener('touchend', upHandler)
}

function togglePicker() {
  if (!props.disabled) {
    isOpen.value = !isOpen.value
  }
}

function selectPreset(color: string) {
  updateFromHex(color)
  isOpen.value = false
}

function handleClickOutside(event: MouseEvent) {
  if (
      isOpen.value &&
      event.target instanceof Node &&
      !event.target.closest('.color-picker')
  ) {
    isOpen.value = false
  }
}

// Initialize color from prop
watch(() => props.modelValue, (newValue) => {
  if (/^#[0-9A-F]{6}$/i.test(newValue)) {
    const { h, s, v } = hexToHsv(newValue)
    hue.value = h
    saturation.value = s
    value.value = v
  }
}, { immediate: true })

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>