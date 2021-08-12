<template>
  <nav class="site-navbar" role="navigation">
    <div class="navbar__header">
      <div class="navbar__header-left">
        <img src="@assets/img/icon22.svg" alt="" />
        <span
          >Need help? Check out the <a href="#" class="link">FAQ</a> or
          <a href="#" class="link" @click.prevent="addClaim"
            >submit a ticket.</a
          ></span
        >
      </div>
      <div class="navbar__header-right">
        <p-dropdown>
          <div class="pointer" slot="trigger">
            <span
              >Xin chào, <span class="username">{{ user.full_name }}</span>
            </span>
            <img src="@/assets/img/dropdown.svg" />
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
    <modal-add-claim
      :visible.sync="visibleModal"
      :title="`Khiếu nại`"
      @create="init"
    >
    </modal-add-claim>
  </nav>
</template>
<script>
import ModalAddClaim from '../../../packages/claim/components/ModalAddClaim.vue'

export default {
  components: {
    ModalAddClaim,
  },
  name: 'Header',
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {},
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
