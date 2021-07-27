<template>
  <nav class="site-navbar" role="navigation">
    <div class="navbar__header">
      <div class="navbar__header-left">
        <img src="@assets/img/icon22.svg" alt="" />
        <span
          >Need help? Check out the <a href="#" class="link">FAQ</a> or
          <a href="" class="link">submit a ticket.</a></span
        >
      </div>
      <div class="navbar__header-right">
        <p-dropdown>
          <div class="pointer" slot="trigger">
            <div class="logo-user">
              <span class="helper"></span>
              <img src="@assets/img/user.svg" alt="" />
            </div>
            <div class="info-user">
              <div class="name">
                {{ user.full_name }}
              </div>
              <div class="money"> {{ user.balance | formatPrice }} USD </div>
            </div>
            <i class="fa fa-chevron-down"></i>
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
  </nav>
</template>
<script>
import mixinDownload from '@/packages/shared/mixins/download'
import evenBus from '../../../core/utils/evenBus'

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
      searchCode: '',
    }
  },
  methods: {
    handleSearchCode() {
      if (this.$route.name != 'list-packages' && this.searchCode) {
        this.$router.push({
          name: 'list-packages',
          query: {
            limit: 50,
            page: 1,
            code: this.searchCode.trim(),
          },
        })
      }
      evenBus.$emit('code', this.searchCode.trim())
    },
  },
}
</script>
