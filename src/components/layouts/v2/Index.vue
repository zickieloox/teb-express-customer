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
      @selectShop="handleSelectShop"
    />
    <p-sidebar />
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
