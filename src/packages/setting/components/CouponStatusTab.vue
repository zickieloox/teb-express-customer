<template>
  <div class="p-tabs nav-tabs-horizontal" id="tab-coupon">
    <ul role="tablist" class="nav nav-tabs nav-tabs-line">
      <li
        role="presentation"
        class="nav-item"
        v-for="item in tabs"
        :id="item.id"
        :key="item.id"
      >
        <a
          href="#"
          class="nav-link"
          :class="{ active: item.active }"
          @click.prevent="handleClick(item.value)"
        >
          {{ item.text }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { COUPON_STATUS_TAB } from '../constants'
import { capitalize } from '@core/utils/string'
import { numFormatter } from '@core/utils/formatter'
export default {
  name: 'CouponStatusTab',
  props: {
    value: {
      type: [String, Array],
      default: '',
    },
    countStatus: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    tabs() {
      const status = []
      COUPON_STATUS_TAB.forEach((item) => {
        let count
        this.countStatus.forEach((obj) => {
          if (obj.key === item.value) {
            count = obj.value
          }
        })

        let countText = count ? ' (' + numFormatter(count) + ')' : ' (0)'
        status.push({
          id: `item_nav_${item.value}`,
          value: item.value,
          text: capitalize(item.text) + countText,
          active: item.value === this.value,
        })
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
<style scoped>
#tab-coupon li a {
  min-width: 100px;
  text-align: center;
  border-radius: 28px;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: -0.32px;
  padding: 8px 10px;
  color: #525252;
  margin-right: 4px !important;
  border: 1px solid #e0e0e0;
}
#tab-coupon .nav-link.active {
  font-weight: 600;
  color: #161616;
  border-color: #8d8d8d;
  background-color: #fff;
}
#tab-coupon .nav-link.active:after,
#tab-coupon .nav-tabs .nav-link:hover:after {
  width: 0;
}
#tab-coupon .nav-tabs {
  border: none;
  padding: 0;
}
#tab-coupon .nav-tabs .nav-item {
  margin-bottom: unset;
}
#tab-coupon {
  margin-bottom: 24px;
}
</style>
