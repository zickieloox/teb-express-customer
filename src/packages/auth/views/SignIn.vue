<template>
  <div class="card sign-in">
    <div class="form form-sign-in">
      <div class="header">
        <h2 class="header-text">Đăng nhập</h2>
      </div>
      <div class="login__page-form-content">
        <div v-if="error" class="login__page-error">{{ error }}</div>
        <div class="mb-16">
          <p-input
            placeholder="Nhập số điện thoại hoặc email"
            v-model="email"
            @keyup.enter="onSignIn"
            :required="requiredEmail"
          />
        </div>
        <div class="mb-60">
          <p-input
            placeholder="Nhập mật khẩu của bạn"
            type="password"
            hiddenPass="on"
            v-model="password"
            :required="requiredPassword"
            @keyup.enter="onSignIn"
          />
        </div>
        <p-button
          class="mb-16 btn btn-special  "
          :loading="isLoading"
          @click="onSignIn"
          :type="`java-blue`"
        >
          Đăng nhập
        </p-button>
        <p class="new-member">
          <span>Bạn là thành viên mới?</span>
          <router-link class="create__acount" :to="{ name: 'sign-up' }">
            Tạo tài khoản
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import mixinRoute from '@core/mixins/route'

export default {
  components: {},
  mixins: [mixinRoute],
  name: 'SignIn',
  data() {
    return {
      email: '',
      password: '',
      isLoading: false,
      result: { success: false, message: '' },
      count: 0,
      status: false,
      requiredPassword: false,
      requiredEmail: false,
      check: true,
      error: '',
    }
  },
  computed: {
    ...mapState('auth', {
      currentUser: (state) => state.user,
    }),
  },
  mounted() {
    const { type, message } = this.$route.query

    if (type && message) {
      this.$toast.open({ type: type, message: decodeURI(message) })
      this.handleUpdateRouteQuery({}, true)
    }
  },
  methods: {
    ...mapActions('auth', ['signIn']),

    redirect() {
      return this.$router.push('/forgot')
    },

    checkRequired() {
      let result = true
      if (this.password == '') {
        this.requiredPassword = true
        result = false
      } else {
        this.requiredPassword = false
      }

      if (this.email == '') {
        this.requiredEmail = true
        result = false
      } else {
        this.requiredEmail = false
      }

      return result
    },
    async onSignIn() {
      if (!this.checkRequired()) {
        return
      }

      const data = {
        password: this.password,
      }

      if (this.email.includes('@')) {
        data.email = this.email.trim().toLowerCase()
      } else {
        data.phone_number = this.email.trim()
      }
      this.isLoading = true
      this.result = await this.signIn(data)
      setTimeout(() => {
        this.isLoading = false
      }, 1000)

      if (this.result.success) {
        setTimeout(() => {
          let { path } = this.$route.query
          if (!path) {
            path = '/'
          } else {
            path = decodeURIComponent(path.replace(/\+/g, '%20'))
          }
          this.$router.push(path)
        }, 1000)
      } else {
        this.error = this.result.message
      }
    },
  },
}
</script>
