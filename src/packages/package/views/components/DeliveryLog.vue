<template>
  <div class="deliver-log">
    <div class="timeline-new">
      <div
        v-for="(item, i) in items"
        :key="i"
        :class="{ 'first-item': i === 0 }"
        class="timeline-item-new"
      >
        <div class="item__right">
          <div class="title">{{ item.name }}</div>
        </div>
        <div
          v-for="(it, j) in item.data"
          :key="j"
          class="item__right__data"
          :class="{ 'first-data': j === 0 }"
        >
          <div class="time"> {{ it.ship_time | datetime('HH:mm:ss') }}</div>
          <div>
            <div class="des"> {{ it.description }}</div>
            <span class="location" v-if="it.location">
              ___{{ it.location }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { datetime } from '@/core/utils/datetime'
import { DELIVER_LOG_PACKAGE } from '../../constants'

export default {
  name: 'DeliveryLog',
  props: {
    logs: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    items() {
      const timelines = {}
      const logs = this.logs || []

      for (const log of logs) {
        const date = datetime(log.ship_time, 'dd/MM/yyyy')

        if (!timelines[date]) {
          timelines[date] = []
        }

        log.description =
          log.description != ''
            ? log.description
            : DELIVER_LOG_PACKAGE[log.type] || ''

        timelines[date].push(log)
      }

      const items = []
      for (const key in timelines) {
        if (Object.hasOwnProperty.call(timelines, key)) {
          items.push({ name: key, data: timelines[key] })
        }
      }

      return items
    },
  },
  methods: {},
}
</script>
