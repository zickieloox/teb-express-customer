<template>
  <div class="login__page">
    <div class="login__page-header d-flex justify-content-between">
      <img alt="home" src="~@/assets/img/logo.svg" class="login__page-logo" />
      <div class="login__page-help content_help">
        <img
          class="content_help-icon"
          src="~@/assets/img/Support.svg"
          alt="help"
        />
        <a target="_blank" class="content_help-text">Cần trợ giúp ?</a>
      </div>
    </div>
    <div class="login__page-content">
      <div class="login__page-circle">
        <div class="login__page-circle-one">
          <span class="img-one"></span>
          <div class="login__page-circle-two">
            <span class="img-two"></span>
            <div class="login__page-circle-three">
              <span class="img-three"></span>
              <div class="circle__word"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="login__page-form">
        <div class="login__page-form-header">
          <div class="header-text">Đăng nhập</div>
        </div>
        <div class="login__page-form-content">
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
        <div class="login__page-form-footer"></div>
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
      form: {
        checkCaptcha: false,
      },
      count: 0,
      status: false,
      requiredPassword: false,
      requiredEmail: false,
      check: true,
    }
  },
  computed: {
    ...mapState('auth', {
      currentUser: (state) => state.user,
    }),
    recapchaKey() {
      return `${process.env.VUE_APP_RECAPCHA_KEY}`
    },
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

    pushNoti() {
      this.showNotificationMessage('This is message')
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

      if (this.count >= 1 && !this.form.checkCaptcha) {
        this.check = false
        return
      }
      this.isLoading = true
      this.result = await this.signIn(data)
      setTimeout(() => {
        this.isLoading = false
      }, 1000)

      if (this.result.number_incorrect >= 3) {
        this.count += 1
      }

      if (this.result.success) {
        if (this.result.user && this.result.user.email) {
          // eslint-disable-next-line no-undef
          // $crisp.push(['set', 'user:nickname', [this.result.user.username]])
          // eslint-disable-next-line no-undef
          // $crisp.push(['set', 'user:email', this.result.user.email])
        }
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
        this.$toast.open({
          type: 'error',
          message: this.result.message,
          duration: 3000,
        })
      }
    },
    onVerify: function(response) {
      if (response) this.form.checkCaptcha = true
      this.check = true
    },
  },
}
</script>
