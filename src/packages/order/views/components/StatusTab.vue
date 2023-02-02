<template>
  <div class="p-tabs nav-tabs-horizontal">
    <ul role="tablist" class="nav nav-tabs nav-tabs-line">
      <li
        role="presentation"
        class="nav-item"
        v-for="(item, i) in options"
        :id="getClass(i)"
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
import { ORDER_STATUS_TAB } from '../../constants'

export default {
  name: 'PackageStatusTab',
  props: {
    status: {
      type: Array,
      default: () => [],
    },
    countStatus: {
      type: Array,
      default: () => [],
    },
    value: {
      type: [String, Array],
      default: '',
    },
    hasAll: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      options: ORDER_STATUS_TAB,
      right: 0,
      el: 0,
    }
  },
  methods: {
    handleClick(item) {
      if (this.value !== item) {
        this.$emit('input', item)
        this.$emit('click', item)
      }
    },
    getClass(i) {
      return 'item_nav_' + i
    },
  },
}
</script>
