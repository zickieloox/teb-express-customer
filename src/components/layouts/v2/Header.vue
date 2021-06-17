<template>
  <nav class="site-navbar" role="navigation">
    <div class="navbar__header">
      <div class="navbar__header-left">
        <div class="navbar-logo"> YOUR LOGO </div>
      </div>
      <div class="navbar__header-content">
        <div class="navbar__header-input">
          <p-input
            placeholder="Tra cứu đơn hàng"
            type="search"
            hiddenPass="on"
            prefixIcon="search"
          />
        </div>
        <div class="navbar__header-drop">
          <p-dropdown>
            <div class="nav-link  pointer" slot="trigger">
              {{ user.full_name }}
              <img src="@/assets/img/dropdown.svg" />
            </div>
            <p-dropdown-item>
              <img
                src="@/assets/img/Circle 16px.svg"
                class="navbar__header-icon"
              />
              <router-link to="/" class="nav-item">
                Hỏi đáp trợ giúp
              </router-link>
            </p-dropdown-item>
            <p-dropdown-item>
              <img src="@/assets/img/Logout.svg" class="navbar__header-icon" />
              <router-link to="/logout" class="nav-item">
                Đăng xuất
              </router-link>
            </p-dropdown-item>
          </p-dropdown>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import mixinDownload from '@/packages/shared/mixins/download'

export default {
  components: {},
  mixins: [mixinDownload],
  name: 'Header',
  props: {
    user: {
      type: Object,
      default: () => {},
    },
    isSidebarOpen: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {},
  created() {},
  data() {
    return {
      isFetchNotity: false,
      isShowNavbarOnMobile: false,
      socket: null,
      isVisibleAddShop: false,
      query: '',
    }
  },
}
</script>
