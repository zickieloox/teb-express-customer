<template>
  <nav class="site-navbar" role="navigation">
    <div class="navbar-header">
      <div class="navbar-header-left">
        <div class="navbar-logo"> YOUR LOGO </div>
        <a
          data-toggle="menubar"
          @click.prevent="toggleShowSidebar"
          class="navbar-hamburger"
        >
        </a>
      </div>
    </div>

    <div class="navbar-container">
      <div
        class="navbar-collapse navbar-collapse-toolbar collapse navbar-mobile"
        :class="{ show: isShowNavbarOnMobile }"
      >
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
