<template>
  <div class="animsition dashboard site-menubar-unfold">
    <p-header :user="user" />
    <p-sidebar />

    <router-view
      :key="$route.path"
      :class="{ padding_page: warning }"
    ></router-view>
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
// import firebase from '../../../core/services/firebase'

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
  mounted() {
    this.init()
  },
  created() {
    // firebase.setup()
  },
  methods: {
    ...mapActions('shared', [GET_USER]),
    async init() {
      await this.getUser()
      this.checkDebtUser()
    },
    checkDebtUser() {
      if (!this.user.user_info) {
        return
      }
      var now = new Date()
      var dt = new Date(this.user.user_info.debt_time)
      dt.setDate(dt.getDate() + this.user.user_info.debt_max_day)
      if (
        this.user.user_info.debt_time !== null &&
        this.user.balance < 0 &&
        dt.getTime() < now.getTime()
      ) {
        this.warning = true
        this.$store.commit('shared/checkDebt', true)
        return
      }
      if (
        this.user.balance < 0 &&
        Math.abs(this.user.balance) > this.user.user_info.debt_max_amount
      ) {
        this.warning = true
        this.$store.commit('shared/checkDebt', true)
        return
      }
      this.warning = false
      this.$store.commit('shared/checkDebt', false)
    },
  },
}
</script>

<style lang="scss">
.warning-user {
  width: calc(100% - 120px);
  height: 56px;
  position: fixed;
  z-index: 3;
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

.padding_page {
  padding-bottom: 56px;
  .fee,
  .page-footer {
    bottom: 56px !important;
  }
}
</style>
