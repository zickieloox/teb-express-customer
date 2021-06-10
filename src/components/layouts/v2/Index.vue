<template>
  <div
    class="animsition dashboard"
    :class="{
      'site-menubar-unfold': isSidebarOpen,
      'site-menubar-hide': !isSidebarOpen,
    }"
  >
    <p-header :user="user" />
    <p-sidebar />

    <router-view :key="$route.path"></router-view>
  </div>
</template>

<script>
import isMobile from 'ismobilejs'
import { mapState, mapActions } from 'vuex'
import '@assets/scss/main.scss'
import '@assets/fonts/material-design/material-design.min.css'
import '@assets/fonts/web-icons/web-icons.min.css'
import PHeader from './Header'
import PSidebar from './Sidebar'
import { GET_USER } from '../../../packages/shared/store'
require('vue-image-lightbox/dist/vue-image-lightbox.min.css')

export default {
  name: 'Version2',
  components: {
    PHeader,
    PSidebar,
  },
  computed: {
    ...mapState('shared', {
      user: (state) => state.user,
    }),
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
  created() {
    this.init()
  },
  methods: {
    ...mapActions('shared', [GET_USER]),
    async init() {
      await this.getUser()
    },
    toggleShowSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen
    },
    toggleShowTicket() {
      this.isTicketOpen = !this.isTicketOpen
    },
  },
}
</script>
