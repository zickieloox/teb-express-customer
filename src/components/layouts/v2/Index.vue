<template>
  <div class="animsition dashboard site-menubar-unfold">
    <p-header :user="user" />
    <p-sidebar />

    <router-view :key="$route.path"></router-view>
    <div class="warning-user" v-if="warning"
      ><span
        >Tài khoản của bạn đã quá hạn mức dư nợ. Vui lòng
        <router-link :to="{ name: 'top-up' }">nạp tiền</router-link> để tiếp
        tục.</span
      ></div
    >
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import '@assets/scss/main.scss'
import '@assets/fonts/material-design/material-design.min.css'
import '@assets/fonts/web-icons/web-icons.min.css'
import PHeader from './Header'
import PSidebar from './Sidebar'
import { GET_USER } from '../../../packages/shared/store'

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
      warning: false,
    }
  },
  mounted() {},
  created() {
    this.init()
  },
  methods: {
    ...mapActions('shared', [GET_USER]),
    async init() {
      await this.getUser()
      this.checkDebtUser()
    },
    checkDebtUser() {
      var now = new Date()
      var dt = new Date(this.user.user_info.debt_time)
      dt.setDate(dt.getDate() + this.user.user_info.debt_max_day)
      if (this.user.balance < 0 && dt.getTime() < now.getTime()) {
        this.warning = true
        return
      }
      if (Math.abs(this.user.balance) > this.user.user_info.debt_max_amount) {
        this.warning = true
        return
      }
      this.warning = false
    },
  },
}
</script>

<style lang="scss" scoped>
.warning-user {
  width: calc(100% - 128px);
  height: 56px;
  position: fixed;
  z-index: 1000;
  bottom: 0;
  right: 0;
  background-color: #fff7e6;
  color: #fa8c16;
  display: flex;

  align-items: center;
  justify-content: center;
  a {
    color: #fa8c16;
    text-decoration: underline;
  }
}
</style>
