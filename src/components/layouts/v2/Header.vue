<template>
  <nav class="site-navbar" role="navigation">
    <div class="navbar__header">
      <div class="navbar__header-left">
        <div class="title">{{ handleTitle }}</div>
      </div>
      <div class="navbar__header-right">
        <p-dropdown>
          <div class="pointer" slot="trigger">
            <div class="user_info">
              <div
                >Xin chào, <span class="username">{{ user.full_name }}</span>
              </div>
              <div class="type" v-if="user"
                >{{ types[user.class] }}<i class="fa fa-circle"></i>
                <span
                  v-if="user.user_info && user.user_info.debt_max_amount > 0"
                  >Trả sau</span
                >
                <span v-else>Trả trước</span></div
              >
            </div>
            <img src="@/assets/img/user.png" />
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
            <router-link to="/logout" class="nav-item"> Đăng xuất </router-link>
          </p-dropdown-item>
        </p-dropdown>
      </div>
    </div>
  </nav>
</template>
<script>
import { MAP_USER_CLASS_TEXT } from '@core/constants'

export default {
  components: {},
  name: 'Header',
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {},
  computed: {
    types() {
      return MAP_USER_CLASS_TEXT
    },
    handleTitle() {
      return this.$route.meta.title || ''
    },
  },
  created() {},
  data() {
    return {
      visibleModal: false,
    }
  },
  methods: {
    init() {
      location.reload()
    },
    addClaim() {
      this.visibleModal = true
    },
  },
}
</script>

<style lang="scss">
.user_info {
  .type {
    align-items: center;
    display: flex;
    float: right;
    font-weight: 600;
    font-size: 10px;
    color: #626363;
    i {
      font-size: 4px;
      margin-right: 4px;
      margin-left: 4px;
    }
  }
}
</style>
