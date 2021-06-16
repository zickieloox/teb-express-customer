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
    }
  },
  computed: {
    cleanStatus() {
      const status = this.hasAll ? [{ value: '', text: 'All' }] : []

      this.status.forEach((item) => {
        if (typeof item === 'object') {
          status.push({ value: item.value, text: capitalize(item.text) })
        } else {
          status.push({ value: item, text: capitalize(item) })
        }
      })

      return status
    },
    setRight() {
      return 'right:' + this.right + '%;'
    },
  },
  methods: {
    handleClick(item) {
      if (this.value !== item) {
        this.$emit('input', item)
        this.$emit('click', item)
      }
    },
    clickLeftNav() {
      if (!this.right) return
      this.right -= 10
    },
    clickRightNav() {
      this.right += 10
    },
  },
}
</script>
<style>
ul#nav_packages {
  z-index: 1;
  width: 200%;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
}
#nav_container {
  position: relative;
  overflow: hidden;
}
.icon-nav {
  position: absolute;
  border: none;
  background-color: #fff;
  z-index: 9999;
  bottom: 10px;
  display: none;
}
.icon-nav.next {
  left: 0;
}
.icon-nav.prev {
  right: 0;
}
@media only screen and (max-width: 1280px) {
  .icon-nav {
    display: block !important;
  }
  ul#nav_packages {
    padding-left: 35px !important;
  }
}
</style>
