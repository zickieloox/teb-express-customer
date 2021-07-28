<template>
  <div class="site-menubar">
    <div class="site-menubar-logo">
      <img src="@assets/img/logo.png" alt="" />
    </div>
    <div class="site-menubar-body">
      <ul class="site-menu">
        <li
          v-for="(menu, i) in menus"
          class="site-menu-item"
          :class="{
            active: isActive(menu.route) || childrenNameRoute(menu.route.name),
          }"
          :key="i"
        >
          <router-link
            :to="handelRouter(menu)"
            class="item-link"
            @mouseover.native="openItem(menu)"
            @mouseleave.native="closeItem(menu)"
          >
            <img class="site-menu-icon" :src="menu.icon" />
            <span class="site-menu-title">{{ menu.title }}</span>
            <div
              class="site-menu-sub"
              :class="{
                'has-sub': menu.isOpen,
              }"
              v-if="menu.sub"
            >
              <div
                class="site-menu-sub-item"
                v-for="(sub, j) in menu.sub"
                :key="j"
              >
                <router-link
                  :to="sub.route"
                  class="animsition-link"
                  @click.native="closeItem(menu)"
                >
                  <span
                    :class="{
                      active:
                        isActive(sub.route) ||
                        isContainAlias(sub.alias) ||
                        childrenNameRoute(sub.title),
                    }"
                    class="site-menu-sub-title"
                  >
                    <img src="@assets/img/Arrow - Right Circle.svg" alt="" />

                    {{ sub.title }}</span
                  >
                </router-link>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style></style>

<script>
import { isObject } from '@core/utils/type'

export default {
  name: 'Sidebar',
  props: {
    isSidebarOpen: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    availableMenus() {
      return this.menus.filter((menu) => menu.disable !== true)
    },
  },
  data() {
    return {
      hoverIndex: -1,
      isActiveSub: false,
      activeSubIndex: 0,
      isactive: false,
      activeItem: '',
      menus: [
        {
          title: 'Trang chủ',
          icon: require('@assets/img/Home.png'),
          route: '/',
          class: '',
        },
        {
          title: 'Đơn hàng',
          icon: require('@assets/img/Order.png'),
          route: { name: 'packages' },
          class: '',
          isOpen: false,
          sub: [
            {
              route: '/packages',
              title: 'Quản lý đơn hàng',
              alias: ['/packages', '/packages/:id'],
            },
          ],
        },
        {
          title: 'Hóa đơn',
          icon: require('@assets/img/Bill.png'),
          route: '/bill',
          class: '',
        },
        {
          title: 'Đơn khiếu nại',
          icon: require('@assets/img/Claim.png'),
          route: { name: 'claims' },
          class: '',
        },
        // {
        //   title: 'Ví',
        //   icon: require('@assets/img/Bill.png'),
        //   route: '/wallet',
        //   class: '',
        // },
        {
          title: 'Cài đặt tài khoản',
          icon: require('@assets/img/Setting.png'),
          route: { name: 'setting' },
          class: '',
          isOpen: false,
          sub: [
            {
              route: '/setting/account',
              title: 'Thông tin tài khoản',
            },
            {
              route: '',
              title: 'Danh sách hàng hóa',
            },
            {
              route: '/setting/api',
              title: 'API',
            },
          ],
        },
      ],
    }
  },

  methods: {
    isActive(route) {
      if (isObject(route)) {
        return this.$route.name === route.name
      }
      return this.$route.path === route || this.$route.fullPath === route
    },

    isContainAlias(alias) {
      if (!this.$route.matched || !this.$route.matched.length || !alias) {
        return false
      }

      for (let item of this.$route.matched) {
        if (alias.includes(item.path)) {
          return true
        }
      }
      return false
    },

    childrenNameRoute(title) {
      let fullPath = this.$route.fullPath
      if (title != null) {
        title = title.toLowerCase()
        if (fullPath.includes(title)) {
          return true
        }
      }
      return false
    },
    handelRouter(menu) {
      if (menu.sub) {
        return ''
      }
      return menu.route
    },
    openItem(menu) {
      menu.isOpen = true
    },
    closeItem(menu) {
      menu.isOpen = false
    },
  },
}
</script>
