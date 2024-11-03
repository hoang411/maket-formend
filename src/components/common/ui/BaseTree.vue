<!-- src/components/ui/BaseTree.vue -->
<template>
  <div class="select-none">
    <ul class="space-y-1">
      <li
          v-for="(node, index) in nodes"
          :key="node.id || index"
      >
        <TreeNode
            :node="node"
            :level="0"
            :selectable="selectable"
            :checkbox="checkbox"
            :expanded-keys="expandedKeys"
            :selected-keys="selectedKeys"
            :checked-keys="checkedKeys"
            @toggle="handleToggle"
            @select="handleSelect"
            @check="handleCheck"
        />
      </li>
    </ul>

    <!-- Empty State -->
    <div
        v-if="!nodes.length"
        class="py-3 text-center text-sm text-gray-500"
    >
      <slot name="empty">
        No data available
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import TreeNode from './TreeNode.vue'

interface TreeNodeType {
  id: string | number
  label: string
  icon?: string
  children?: TreeNodeType[]
  disabled?: boolean
  [key: string]: any
}

interface Props {
  nodes: TreeNodeType[]
  selectable?: boolean
  checkbox?: boolean
  defaultExpandAll?: boolean
  defaultExpandedKeys?: (string | number)[]
  defaultSelectedKeys?: (string | number)[]
  defaultCheckedKeys?: (string | number)[]
}

const props = withDefaults(props<Props>(), {
  selectable: false,
  checkbox: false,
  defaultExpandAll: false,
  defaultExpandedKeys: () => [],
  defaultSelectedKeys: () => [],
  defaultCheckedKeys: () => []
})

const emit = defineEmits(['update:expandedKeys', 'update:selectedKeys', 'update:checkedKeys', 'select', 'check'])

// State
const expandedKeys = ref<(string | number)[]>(
    props.defaultExpandAll
        ? getAllKeys(props.nodes)
        : props.defaultExpandedKeys
)
const selectedKeys = ref<(string | number)[]>(props.defaultSelectedKeys)
const checkedKeys = ref<(string | number)[]>(props.defaultCheckedKeys)

// Provide context to child components
provide('treeContext', {
  selectable: props.selectable,
  checkbox: props.checkbox
})

// Methods
function getAllKeys(nodes: TreeNodeType[]): (string | number)[] {
  return nodes.reduce((keys: (string | number)[], node) => {
    keys.push(node.id)
    if (node.children?.length) {
      keys.push(...getAllKeys(node.children))
    }
    return keys
  }, [])
}

function handleToggle(nodeId: string | number) {
  const index = expandedKeys.value.indexOf(nodeId)
  if (index > -1) {
    expandedKeys.value.splice(index, 1)
  } else {
    expandedKeys.value.push(nodeId)
  }
  emit('update:expandedKeys', expandedKeys.value)
}

function handleSelect(nodeId: string | number) {
  selectedKeys.value = [nodeId]
  emit('update:selectedKeys', selectedKeys.value)
  emit('select', nodeId)
}

function handleCheck(nodeId: string | number, checked: boolean) {
  const index = checkedKeys.value.indexOf(nodeId)
  if (checked && index === -1) {
    checkedKeys.value.push(nodeId)
  } else if (!checked && index > -1) {
    checkedKeys.value.splice(index, 1)
  }
  emit('update:checkedKeys', checkedKeys.value)
  emit('check', nodeId, checked)
}
</script>

<!-- TreeNode.vue component -->
<template>
  <div
      :class="[
      'flex items-center py-1 px-2 rounded-lg',
      {
        'hover:bg-gray-100': !node.disabled,
        'opacity-50 cursor-not-allowed': node.disabled,
        'bg-primary-50': isSelected
      }
    ]"
      :style="{ paddingLeft: `${level * 1.5 + 0.5}rem` }"
  >
    <!-- Expand/Collapse -->
    <button
        v-if="hasChildren"
        type="button"
        class="p-1 rounded-full hover:bg-gray-200"
        :class="{ 'opacity-0': !hasChildren }"
        @click="toggle"
    >
      <i
          class="fas fa-chevron-right transition-transform"
          :class="{ 'rotate-90': isExpanded }"
      ></i>
    </button>
    <div v-else class="w-7"></div>

    <!-- Checkbox -->
    <div
        v-if="checkbox"
        class="mr-2"
    >
      <input
          type="checkbox"
          :checked="isChecked"
          :disabled="node.disabled"
          class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          @change="handleCheck"
      />
    </div>

    <!-- Icon -->
    <i
        v-if="node.icon"
        :class="['fas', node.icon, 'mr-2 text-gray-400']"
    ></i>

    <!-- Label -->
    <span
        class="flex-1 truncate"
        :class="[
        { 'cursor-pointer': selectable && !node.disabled },
        { 'text-primary-600 font-medium': isSelected }
      ]"
        @click="handleSelect"
    >
      {{ node.label }}
    </span>

    <!-- Actions -->
    <slot
        name="actions"
        :node="node"
    ></slot>
  </div>

  <!-- Children -->
  <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-y-95 opacity-0"
      enter-to-class="transform scale-y-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-y-100 opacity-100"
      leave-to-class="transform scale-y-95 opacity-0"
  >
    <ul v-if="hasChildren && isExpanded">
      <li
          v-for="(child, index) in node.children"
          :key="child.id || index"
      >
        <TreeNode
            :node="child"
            :level="level + 1"
            :selectable="selectable"
            :checkbox="checkbox"
            :expanded-keys="expandedKeys"
            :selected-keys="selectedKeys"
            :checked-keys="checkedKeys"
            @toggle="$emit('toggle', $event)"
            @select="$emit('select', $event)"
            @check="$emit('check', $event)"
        />
      </li>
    </ul>
  </Transition>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'

interface TreeNodeType {
  id: string | number
  label: string
  icon?: string
  children?: TreeNodeType[]
  disabled?: boolean
  [key: string]: any
}

interface Props {
  node: TreeNodeType
  level: number
  selectable?: boolean
  checkbox?: boolean
  expandedKeys: (string | number)[]
  selectedKeys: (string | number)[]
  checkedKeys: (string | number)[]
}

const props = defineProps<Props>()
const emit = defineEmits(['toggle', 'select', 'check'])

// Inject context
const treeContext = inject('treeContext', {
  selectable: false,
  checkbox: false
})

// Computed
const hasChildren = computed(() => {
  return props.node.children?.length > 0
})

const isExpanded = computed(() => {
  return props.expandedKeys.includes(props.node.id)
})

const isSelected = computed(() => {
  return props.selectedKeys.includes(props.node.id)
})

const isChecked = computed(() => {
  return props.checkedKeys.includes(props.node.id)
})

// Methods
function toggle() {
  if (hasChildren.value) {
    emit('toggle', props.node.id)
  }
}

function handleSelect() {
  if (props.selectable && !props.node.disabled) {
    emit('select', props.node.id)
  }
}

function handleCheck(event: Event) {
  const target = event.target as HTMLInputElement
  emit('check', props.node.id, target.checked)
}
</script>