<template>
  <div
    class="animsition dashboard"
    :class="{
      'site-menubar-unfold': isSidebarOpen,
      'site-menubar-hide': !isSidebarOpen,
    }"
  >
    <p-header
      @toggleShowSidebar="toggleShowSidebar"
      :isSidebarOpen="isSidebarOpen"
      :shop="shop"
      :shops="shops"
      @selectShop="handleSelectShop"
    />
    <p-sidebar :shop="shop" :shops="shops" :isSidebarOpen="isSidebarOpen" />
    <router-view :key="$route.path"></router-view>
  </div>
</template>

<script>
import isMobile from 'ismobilejs'
import '@assets/scss/main.scss'
import '@assets/fonts/material-design/material-design.min.css'
import '@assets/fonts/web-icons/web-icons.min.css'
import PHeader from './Header'
import PSidebar from './Sidebar'
require('vue-image-lightbox/dist/vue-image-lightbox.min.css')

export default {
  name: 'Version2',
  components: {
    PHeader,
    PSidebar,
  },
  data() {
    return {
      isSidebarOpen: true,
      isTicketOpen: false,
    }
  },
  mounted() {
    if (isMobile.phone) {
      this.isSidebarOpen = false
    }
  },
  methods: {
    toggleShowSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen
    },
    toggleShowTicket() {
      this.isTicketOpen = !this.isTicketOpen
    },
    async handleSelectShop(shop) {
      const result = await this.selectShop({ id: shop.id })
      if (!result.success) {
        this.$toast.open({ type: 'error', message: result.message })
        return
      }

      this.$toast.open({
        type: 'success',
        message: `Switch to "${shop.name}" successfully`,
      })

      if (this.$route.name === 'dashboard') {
        setTimeout(() => {
          location.reload()
        }, 500)
      } else {
        this.$router.push('/')
      }
    },
  },
}
</script>
<style lang="scss">
.icon-messenger {
  width: 64px;
  position: fixed;
  height: 64px;
  z-index: 101;
  bottom: 99px;
  right: 26px;
  cursor: pointer;
  &.onClaim {
    display: none;
  }
}
@media (max-width: 1366px) {
  .icon-messenger {
    width: 64px;
    position: fixed;
    height: 64px;
    z-index: 101;
    bottom: 90px;
    right: 26px;
    cursor: pointer;
  }
}
</style>
