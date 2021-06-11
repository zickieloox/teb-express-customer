<template>
  <div class="site-menubar">
    <div class="site-menubar-body">
      <ul class="site-menu">
        <li
          v-for="(menu, i) in menus"
          class="site-menu-item  "
          :class="{
            active: isActive(menu.route) || childrenNameRoute(menu.title),
          }"
          :key="i"
        >
          <router-link :to="handelRouter(menu)">
            <img class="site-menu-icon default" :src="menu.icon" />
            <img class="site-menu-icon active" :src="menu.iconActive" />
            <span class="site-menu-title" @click="menu.isOpen = !menu.isOpen">{{
              menu.title
            }}</span>
            <div class="icon-sub">
              <img
                :class="{ 'is-active': menu.isOpen }"
                class=""
                v-if="menu.sub"
                src="@/assets/img/dropdown.svg"
              />
            </div>
          </router-link>
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
              <router-link :to="sub.route" class="animsition-link">
                <span
                  :class="{
                    active: isActive(sub.route) || childrenNameRoute(sub.title),
                  }"
                  class="site-menu-sub-title"
                  >{{ sub.title }}</span
                >
              </router-link>
            </div>
          </div>
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
      isActiveSub: false,
      activeSubIndex: 0,
      isactive: false,
      activeItem: '',
      menus: {
        q1: {
          title: 'Trang chủ',
          icon: require('@assets/img/HomeInactive.svg'),
          iconActive: require('@assets/img/Home.svg'),
          route: '/',
          class: '',
        },
        q2: {
          title: 'Đơn hàng',
          icon: require('@assets/img/OrderInactive.svg'),
          iconActive: require('@assets/img/Order.svg'),
          route: '',
          class: '',
          isOpen: false,
          sub: [
            {
              route: '',
              title: 'Tạo đơn lẻ',
            },
            {
              route: '',
              title: 'Quản lý đơn hàng',
            },
            {
              route: '',
              title: 'Đơn khiếu nại',
            },
          ],
        },
        q3: {
          title: 'Hóa đơn',
          icon: require('@assets/img/BillInactive.svg'),
          iconActive: require('@assets/img/Bill.svg'),
          route: '/bill',
          class: '',
        },
        q4: {
          title: 'Ví',
          icon: require('@assets/img/WalletInactive.svg'),
          iconActive: require('@assets/img/Wallet.svg'),
          route: '/wallet',
          class: '',
        },
        q5: {
          title: 'Cài đặt ',
          icon: require('@assets/img/SettingInactive.svg'),
          iconActive: require('@assets/img/Setting.svg'),
          route: { name: 'account' },
          class: '',
          isOpen: false,
          sub: [
            {
              route: '/setting/account',
              title: 'Thông tin tài khoản',
            },
            {
              route: '',
              title: 'Danh sách người gửi',
            },
            {
              route: '',
              title: 'Danh sách hàng hóa',
            },
            {
              route: '',
              title: 'Quản lý khuyến mãi',
            },
          ],
        },
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
    handelRouter(menu) {
      if (menu.sub) {
        return ''
      }
      return menu.route
    },
  },
}
</script>
