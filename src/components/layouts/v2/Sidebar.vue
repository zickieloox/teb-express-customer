<template>
  <div class="site-menubar">
    <div class="site-menubar-body">
      <ul class="site-menu">
        <li
          v-for="(menu, i) in availableMenus"
          class="site-menu-item  "
          :class="{
            active: isActive(menu.route) || childrenNameRoute(menu.title),
            vstep2: menu.class == 'vstep2',
          }"
          :key="i"
        >
          <router-link :to="menu.route">
            <img class="site-menu-icon default" :src="menu.icon" />
            <img class="site-menu-icon active" :src="menu.iconActive" />
            <span class="site-menu-title" @click="handleSub(i, menu.title)">{{
              menu.title
            }}</span>
            <div class="icon-sub">
              <img
                :class="{ 'is-active': activeSubIndex == i && isactive }"
                class=""
                v-if="menu.sub"
                src="@/assets/img/dropdown.svg"
              />
            </div>
          </router-link>
          <div
            class="site-menu-sub"
            :class="{
              'has-sub':
                activeSubIndex == i && hadleActiveItem(menu.title) && isactive,
            }"
            v-if="menu.sub"
          >
            <div
              class="site-menu-sub-item"
              v-for="(sub, j) in menu.sub"
              :key="j"
            >
              <router-link :to="sub.route" class="animsition-link">
                <span class="site-menu-sub-title">{{ sub.title }}</span>
              </router-link>
            </div>
          </div>
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
          title: 'Trang chủ',
          icon: require('@assets/img/HomeInactive.svg'),
          iconActive: require('@assets/img/Home.svg'),
          route: '/',
          class: '',
        },
        {
          title: 'Đơn hàng',
          icon: require('@assets/img/OrderInactive.svg'),
          iconActive: require('@assets/img/Order.svg'),
          route: '',
          class: '',
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
        {
          title: 'Hóa đơn',
          icon: require('@assets/img/BillInactive.svg'),
          iconActive: require('@assets/img/Bill.svg'),
          route: '/bill',
          class: '',
        },
        {
          title: 'Ví',
          icon: require('@assets/img/WalletInactive.svg'),
          iconActive: require('@assets/img/Wallet.svg'),
          route: '/wallet',
          class: '',
        },
        {
          title: 'Cài đặt ',
          icon: require('@assets/img/SettingInactive.svg'),
          iconActive: require('@assets/img/Setting.svg'),
          route: { name: '' },
          class: '',
          sub: [
            {
              route: '',
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
      isActiveSub: false,
      activeSubIndex: 0,
      isactive: false,
      activeItem: '',
    }
  },

  methods: {
    isActive(route) {
      if (isObject(route)) {
        return this.$route.name === route.name
      }

      return this.$route.path === route || this.$route.fullPath === route
    },
    handleSub(index, item) {
      this.activeSubIndex = index
      this.activeItem = item
      this.isactive = !this.isactive
    },
    hadleActiveItem(item) {
      return this.activeItem == item
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
