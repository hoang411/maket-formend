<template>
  <div class="flow-root">
    <ul role="list" class="-mb-8">
      <li v-for="(event, eventIdx) in events" :key="event.id">
        <div class="relative pb-8">
          <span
              v-if="eventIdx !== events.length - 1"
              class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
              aria-hidden="true"
          />
          <div class="relative flex space-x-3">
            <div>
              <span
                  class="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                  :class="[statusTypeToClass[event.type]]"
              >
                <component
                    :is="statusTypeToIcon[event.type]"
                    class="h-5 w-5 text-white"
                    aria-hidden="true"
                />
              </span>
            </div>
            <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
              <div>
                <p class="text-sm text-gray-500">
                  {{ event.content }}
                </p>
              </div>
              <div class="whitespace-nowrap text-right text-sm text-gray-500">
                <time :datetime="event.datetime">{{ formatDate(event.datetime) }}</time>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  CheckCircleIcon,
  XCircleIcon,
  TruckIcon,
  ClockIcon,
  CogIcon
} from '@heroicons/vue/24/solid';
import { formatDate } from '@/utils/format';
import type { OrderEvent } from '@/types/order.types';

const props = defineProps<{
  events: OrderEvent[];
}>();

const statusTypeToIcon = {
  completed: CheckCircleIcon,
  cancelled: XCircleIcon,
  shipping: TruckIcon,
  pending: ClockIcon,
  processing: CogIcon
};

const statusTypeToClass = {
  completed: 'bg-green-500',
  cancelled: 'bg-red-500',
  shipping: 'bg-indigo-500',
  pending: 'bg-yellow-500',
  processing: 'bg-blue-500'
};
</script>