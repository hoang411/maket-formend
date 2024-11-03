<!-- src/components/ui/BaseChart.vue -->
<template>
  <div
      class="relative"
      :class="{ 'animate-pulse': loading }"
  >
    <!-- Chart Container -->
    <div
        ref="chartRef"
        :style="{ height: height }"
    ></div>

    <!-- Loading Overlay -->
    <div
        v-if="loading"
        class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75"
    >
      <div class="text-center">
        <i class="fas fa-circle-notch fa-spin text-primary-500 text-2xl"></i>
        <p class="mt-2 text-sm text-gray-500">Loading...</p>
      </div>
    </div>

    <!-- Empty State -->
    <div
        v-if="!loading && isEmpty"
        class="absolute inset-0 flex items-center justify-center"
    >
      <div class="text-center">
        <i class="fas fa-chart-bar text-gray-400 text-3xl mb-2"></i>
        <p class="text-sm text-gray-500">No data available</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'

interface Props {
  type: 'line' | 'bar' | 'pie' | 'scatter' | 'radar'
  data: any
  options?: echarts.EChartsOption
  height?: string
  theme?: string
  loading?: boolean
  autoResize?: boolean
}

const props = withDefaults(props<Props>(), {
  height: '400px',
  theme: 'default',
  loading: false,
  autoResize: true
})

const emit = defineEmits(['ready', 'click', 'legendselectchanged'])

// Refs
const chartRef = ref<HTMLElement | null>(null)
let chartInstance: echarts.ECharts | null = null

// Computed
const isEmpty = computed(() => {
  if (!props.data) return true
  if (Array.isArray(props.data)) return props.data.length === 0
  if (typeof props.data === 'object') return Object.keys(props.data).length === 0
  return false
})

// Methods
function initChart() {
  if (!chartRef.value) return

  // Initialize ECharts instance
  chartInstance = echarts.init(chartRef.value, props.theme)

  // Register event handlers
  chartInstance.on('click', params => {
    emit('click', params)
  })

  chartInstance.on('legendselectchanged', params => {
    emit('legendselectchanged', params)
  })

  // Set options and data
  updateChart()

  // Emit ready event
  emit('ready', chartInstance)
}

function updateChart() {
  if (!chartInstance) return

  const defaultOptions: echarts.EChartsOption = {
    grid: {
      containLabel: true,
      left: '3%',
      right: '4%',
      bottom: '3%'
    },
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'shadow'
      }
    }
  }

  const options = {
    ...defaultOptions,
    ...props.options,
    series: [{
      type: props.type,
      data: props.data,
      ...(props.options?.series?.[0] || {})
    }]
  }

  chartInstance.setOption(options, true)
}

function resizeChart() {
  chartInstance?.resize()
}

// Lifecycle
onMounted(() => {
  initChart()

  if (props.autoResize) {
    window.addEventListener('resize', resizeChart)
  }
})

onUnmounted(() => {
  if (props.autoResize) {
    window.removeEventListener('resize', resizeChart)
  }

  chartInstance?.dispose()
})

// Watch
watch(
    () => props.data,
    () => {
      updateChart()
    },
    { deep: true }
)

watch(
    () => props.options,
    () => {
      updateChart()
    },
    { deep: true }
)

watch(
    () => props.type,
    () => {
      updateChart()
    }
)

// Expose chart instance
defineExpose({
  chart: chartInstance
})
</script>