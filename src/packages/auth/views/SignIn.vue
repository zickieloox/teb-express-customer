<template>
  <div class="card sign-in">
    <div class="form form-sign-in">
      <div class="header">
        <h2 class="header-text">Đăng nhập</h2>
      </div>
      <div class="login__page-form-content">
        <div v-if="error" class="login__page-error">{{ error }}</div>
        <div class="mb-16">
          <m-input
            icon="envelope-o"
            v-model.trim="email"
            :error="valider.hasError('email')"
            :messages="valider.error('email')"
            @input="onInput('email')"
          >
            <template v-if="!email">
              Nhập số điện thoại hoặc email <span class="text-danger">*</span>
            </template>
          </m-input>
        </div>
        <div class="mb-60">
          <m-input
            type="password"
            icon="lock-o"
            v-model.trim="password"
            :password="true"
            :error="valider.hasError('password')"
            :messages="valider.error('password')"
            @input="onInput('password')"
          >
            <template v-if="!password">
              Mật khẩu của bạn <span class="text-danger">*</span>
            </template>
            <template v-slot:toggle-password="{ type }">
              {{ type === 'text' ? 'Ẩn' : 'Hiển thị' }}
            </template>
          </m-input>
        </div>
        <p-button
          class="mb-16 btn btn-special  "
          :loading="isLoading"
          @click="onSignIn"
          :disabled="disableBtn"
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
import { signup } from '../validate'

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
      valider: signup,
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
    // onEmail() {
    //   ;(this.requiredEmail = false), (this.errorEmail = '')
    // },
    // onPassword() {
    //   ;(this.requiredPassword = false), (this.errorPassWord = '')
    // },
    // checkRequired() {
    //   let result = true
    //   if (this.password == '') {
    //     this.requiredPassword = true
    //     this.errorPassWord = 'Vui lòng không để trống!'
    //     result = false
    //   } else {
    //     this.requiredPassword = false
    //   }
    //
    //   if (this.email == '') {
    //     this.requiredEmail = true
    //     this.errorEmail = 'Vui lòng không để trống!'
    //     result = false
    //   } else {
    //     this.requiredEmail = false
    //   }
    //
    //   return result
    // },
    onInput(key) {
      if (key === 'email') {
        this.valider.validEmailSignin(this.email)
      }

      if (key === 'password') {
        this.valider.validPassword(this.password)
      }
    },
    async onSignIn() {
      if (this.isLoading) return
      if (
        !this.valider.isValidSignin({
          email: this.email,
          password: this.password,
        })
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
          this.$router.push(path)
        }, 1000)
      } else {
        this.error = this.result.message
      }
    },
  },
}
</script>
