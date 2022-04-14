<template>
  <div class="card sign-in">
    <div class="form form-sign-in">
      <div class="header">
        <h2 class="header-text">Đăng nhập</h2>
      </div>
      <div class="login__page-form-content">
        <div v-if="error" class="login__page-error">{{ error }}</div>
        <div class="form-group form-input">
          <label for=""
            >Số điện thoại hoặc Email: <span style="color:red">*</span></label
          >
          <m-input
            v-model.trim="email"
            :error="valider.hasError('email')"
            :messages="valider.error('email')"
            @input="onInput('email')"
            @keyup.enter="onSignIn"
          >
            <template v-if="!email">
              Nhập số điện thoại hoặc email
            </template>
          </m-input>
        </div>
        <div class="form-group form-input">
          <label for="">Mật khẩu: <span class="text-danger">*</span></label>
          <m-input
            type="password"
            v-model.trim="password"
            :password="true"
            :error="valider.hasError('password')"
            :messages="valider.error('password')"
            @input="onInput('password')"
            @keyup.enter="onSignIn"
          >
            <template v-if="!password">
              Mật khẩu của bạn
            </template>
            <template v-slot:toggle-password="{ type }">
              {{ type === 'text' ? 'Ẩn' : 'Hiển thị' }}
            </template>
          </m-input>
        </div>
        <p-button
          class="mb-16 btn btn-special"
          :loading="isLoading"
          @click="onSignIn"
          :disabled="disableBtn"
        >
          Đăng nhập tài khoản
        </p-button>
        <p class="new-member">
          <span>Bạn là thành viên mới?</span>
          <router-link class="create__acount" :to="{ name: 'sign-up' }">
            Tạo tài khoản
          </router-link>
        </p>
        <p class="forgot_password">
          <router-link to="/">
            Quên mật khẩu?
          </router-link>
        </p>
        <p class="police__text-bottom text-center gg-captche">
          Được bảo vệ bởi reCAPTCHA và tuân theo
          <a
            href="https://www.google.com/intl/en/policies/privacy/"
            target="_blank"
            >Chính sách quyền riêng tư</a
          >
          và
          <a
            href="https://www.google.com/intl/en/policies/terms/"
            target="_blank"
            >Điều khoản dịch vụ</a
          >
          của Google.
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import mixinRoute from '@core/mixins/route'
import { signin } from '../validate'
import crisp from '../../../core/services/crisp'

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
      errorEmail: '',
      errorPassWord: '',
      valider: signin,
    }
  },
  computed: {
    ...mapState('auth', {
      currentUser: (state) => state.user,
    }),
    disableBtn() {
      return this.isLoading || this.email === '' || this.password === ''
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
    onInput(key) {
      if (key === 'email') {
        this.valider.validEmail(this.email)
      }

      if (key === 'password') {
        this.valider.validPassword(this.password)
      }
    },
    async onSignIn() {
      if (this.isLoading) return
      if (
        !this.valider.isValid({ email: this.email, password: this.password })
      ) {
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

          crisp.hide()
          this.$router.push(path)
        }, 1000)
      } else {
        if (this.result.userInActive) {
          // Storage.set('userEmail', this.currentUser.email)
          // setTimeout(() => {
          //   this.$router.push('/verify-email')
          // }, 1000)
          this.$toast.open({
            type: 'primary',
            message:
              'Tài khoản đang được xác thực. Vui lòng chờ chúng tôi liên hệ với bạn.',
          })
          return
        }
        if (this.$refs.recapcha) {
          this.$refs.recapcha.reset()
          this.form.checkCaptcha = false
        }

        this.$toast.open({
          type: 'error',
          message: this.result.message,
        })
      }
    },
  },
}
</script>
