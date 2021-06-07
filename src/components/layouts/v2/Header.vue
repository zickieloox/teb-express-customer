<template>
  <nav class="site-navbar" role="navigation">
    <div class="navbar-header">
      <div class="navbar-header-left">
        <div class="navbar-logo"> </div>
        <a
          data-toggle="menubar"
          @click.prevent="toggleShowSidebar"
          class="navbar-hamburger"
        >
          <div class="icon hamburger">
            <svg
              :class="{ hided: !isSidebarOpen }"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.6">
                <path
                  d="M3 15L12 15"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3 10L17 10"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3 5L8 5"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
            </svg>
          </div>
          <div class="icon hamburger hamburger-arrow-left unfolded">
            <svg
              :class="{ hided: !!isSidebarOpen }"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.6">
                <path
                  d="M3 15L17 15"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3 10L17 10"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3 5L17 5"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
            </svg>
          </div>
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
