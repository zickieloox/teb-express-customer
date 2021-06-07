<template>
  <div class="p-tabs nav-tabs-horizontal mb-32">
    <ul role="tablist" class="nav nav-tabs nav-tabs-line">
      <li
        role="presentation"
        class="nav-item"
        v-for="(item, i) in cleanStatus"
        :key="i"
      >
        <a
          href="#"
          class="nav-link"
          :class="{ active: item.value === value }"
          @click.prevent="handleClick(item.value)"
        >
          {{ item.text }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { capitalize } from '@core/utils/string'

export default {
  name: 'StatusTab',
  props: {
    status: {
      type: Array,
      default: () => [],
    },
    value: {
      type: String,
      default: '',
    },
    hasAll: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    cleanStatus() {
      const status = this.hasAll ? [{ value: '', text: 'All' }] : []

      this.status.forEach((item) => {
        status.push({ value: item, text: capitalize(item) })
      })

      return status
    },
  },
  methods: {
    handleClick(item) {
      if (this.value !== item) {
        this.$emit('input', item)
        this.$emit('click', item)
      }
    },
  },
}
</script>
