<template>
  <div class="site-menubar">
    <div class="site-menubar-body">
      <ul class="site-menu">
        <li
          v-for="(menu, i) in availableMenus"
          class="site-menu-item  has-sub"
          :class="{
            active: isActive(menu.route) || childrenNameRoute(menu.title),
            hover: hoverIndex === i,
            open: isActive(menu.route) && menu.sub,
            vstep2: menu.class == 'vstep2',
          }"
          :key="i"
          @mouseover="onHover(i)"
          @mouseout="onHover(-1)"
        >
          <router-link :to="menu.route">
            <img class="site-menu-icon default" :src="menu.icon" />
            <img class="site-menu-icon active" :src="menu.iconActive" />
            <span class="site-menu-title">{{ menu.title }}</span>
          </router-link>
          <ul class="site-menu-sub" v-if="menu.sub">
            <li class="site-menu-item" v-for="(sub, j) in menu.sub" :key="j">
              <router-link :to="sub.route" class="animsition-link">
                <span class="site-menu-title">{{ sub.title }}</span>
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.dropdown-toggle:after {
  content: none;
}

.package-user {
  margin-left: 15px;
  font-size: 12px;
  line-height: 160%;
  color: #b0b3b9;
}

.focus {
  font-weight: 500;
  color: #0554f2;
  background: rgb(244, 246, 248, 0.6);
  border-radius: 4px;
}
.shop-name {
  padding: 9px 0px 9px 16px;
}
</style>

<script>
import { isObject } from '@core/utils/type'

export default {
  name: 'Sidebar',
  props: {
    shop: {
      type: Object,
      default: () => {},
    },
    shops: {
      type: Array,
      default: () => [],
    },
    isSidebarOpen: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    validShops() {
      return this.shop && this.shops ? this.shops : []
    },
    shopName() {
      return this.shop.name
    },
    menus() {
      return [
        {
          title: 'Home',
          icon: require('@assets/img/layers_fill.svg'),
          iconActive: require('@assets/img/layers_fill_active.svg'),
          route: '/',
          class: '',
        },
        {
          title: 'Setting',
          icon: require('@assets/img/settings.svg'),
          iconActive: require('@assets/img/settings_active.svg'),
          route: { name: 'setting' },
          class: '',
        },
      ]
    },
    availableMenus() {
      return this.menus.filter((menu) => menu.disable !== true)
    },
  },
  data() {
    return {
      hoverIndex: -1,
      chooseShop: {
        icon: require('@assets/img/shopping-bag.svg'),
      },
    }
  },

  methods: {
    isActive(route) {
      if (isObject(route)) {
        return this.$route.name === route.name
      }

      return this.$route.path === route || this.$route.fullPath === route
    },
    childrenNameRoute(title) {
      let fullPath = this.$route.fullPath
      let title1 = title
      if (title1 != null) {
        title1 = title1.toLowerCase()
        if (fullPath.includes(title1)) {
          return true
        }
      }
      return false
    },
    onHover(i) {
      this.hoverIndex = i
    },
    handleSelectShop(shop) {
      this.$emit('selectShop', shop)
    },
  },
}
</script>
