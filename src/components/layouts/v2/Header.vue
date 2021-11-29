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

              <div class="type" v-if="user">
                <inline-svg :src="require('../../../assets/img/warningsm.svg')">
                </inline-svg>
                {{ types[user.class] }}<i class="fa fa-circle"></i>
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
import { mapState } from 'vuex'

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
    ...mapState('shared', {
      isDebt: (state) => state.isDebt,
    }),
    types() {
      console.log(this.isDebt)
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
    svg {
      margin: 0 4px 1px 0;
    }
  }
}
</style>
