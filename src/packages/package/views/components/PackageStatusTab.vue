<template>
  <div id="nav_container" class="p-tabs nav-tabs-horizontal mt-24">
    <button class="icon-nav next" @click="clickLeftNav">
      <img src="~@/assets/img/left_nav.png" />
    </button>
    <button class="icon-nav prev" @click="clickRightNav">
      <img src="~@/assets/img/right_nav.svg" />
    </button>
    <ul
      role="tablist"
      class="nav nav-tabs nav-tabs-line"
      id="nav_packages"
      :style="setRight"
    >
      <li
        role="presentation"
        class="nav-item"
        v-for="(item, i) in cleanStatus"
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
import { capitalize } from '@core/utils/string'

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
      type: String,
      default: '',
    },
    hasAll: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      right: 0,
      el: 0,
    }
  },
  computed: {
    cleanStatus() {
      const status = this.hasAll ? [{ value: '', text: 'All' }] : []
      this.status.forEach((item) => {
        if (typeof item === 'object') {
          let count
          let total = 0
          this.countStatus.forEach((obj) => {
            total += parseInt(obj.count)
            if (obj.status === item.value) {
              count = obj.count
            }
          })

          let countText = count ? ' (' + count + ')' : ' (0)'
          if (item.value === '') {
            countText = ' (' + total + ')'
          }

          status.push({
            value: item.value,
            text: capitalize(item.text) + countText,
          })
        } else {
          status.push({ value: item, text: capitalize(item) })
        }
      })

      return status
    },
    setRight() {
      return 'right:' + this.right + 'px;'
    },
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
    clickLeftNav() {
      if (!this.el) {
        return
      }
      this.el--
      let selector = 'item_nav_' + this.el
      this.right = document.getElementById(selector).offsetLeft - 34
    },
    clickRightNav() {
      let width = 0
      let stop = 0
      for (
        let index = document.getElementById('nav_packages').children.length - 1;
        index >= 0;
        index--
      ) {
        const el = 'item_nav_' + index
        width += document.getElementById(el).offsetWidth
        if (width > document.getElementById('nav_container').offsetWidth - 68) {
          stop = index + 1
          break
        }
      }
      if (this.el === stop) {
        return
      }

      this.el++
      let selector = 'item_nav_' + this.el

      this.right = document.getElementById(selector).offsetLeft - 34
    },
  },
}
</script>
<style>
ul#nav_packages {
  z-index: 1;
  width: 200%;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
#nav_container {
  position: relative;
  overflow: hidden;
}
.icon-nav {
  position: absolute;
  border: none;
  background-color: #fff;
  z-index: 999;
  bottom: 10px;
  display: none;
}
.icon-nav.next {
  left: 0;
}
.icon-nav.prev {
  right: 0;
}
@media only screen and (max-width: 1366px) {
  .icon-nav {
    display: block !important;
  }
  ul#nav_packages {
    padding-left: 35px !important;
    width: 400%;
  }
}
@media only screen and (min-width: 1367px) {
  ul#nav_packages {
    right: 0 !important;
  }
}
</style>
