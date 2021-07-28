<template>
  <div class="card sign-up">
    <div class="vertical-align-middle">
      <div class="header">
        <h2>Tạo tài khoản mới</h2>
      </div>

      <form class="form form-sign-up" @submit.prevent="onSignUp">
        <m-input icon="user-o" v-model.trim="user.fullname">
          <template v-if="!user.fullname">
            Tên của bạn <span class="text-danger">*</span>
          </template>
        </m-input>

        <m-input icon="phone-o" v-model.trim="user.phone">
          <template v-if="!user.phone">
            Số điện thoại của bạn <span class="text-danger">*</span>
          </template>
        </m-input>

        <m-input icon="envelope-o" v-model.trim="user.email">
          <template v-if="!user.email">
            Email của bạn <span class="text-danger">*</span>
          </template>
        </m-input>

        <m-input
          type="password"
          icon="lock-o"
          v-model.trim="user.password"
          :password="true"
        >
          <template v-if="!user.password">
            Mật khẩu của bạn <span class="text-danger">*</span>
          </template>
          <template v-slot:toggle-password="{ type }">
            {{ type === 'text' ? 'Hiển thị' : 'Ẩn' }}
          </template>
        </m-input>
        <p class="police__text mb-40">
          Khi nhấn nút <b>Đăng ký tài khoản</b>, bạn đã đồng ý thực hiện mọi
          giao dịch theo <a href="#">Điều kiện sử dụng & chính sách</a> của
          LionBay
        </p>
        <p-button
          class="btn btn-special"
          :loading="isLoading"
          @click="onSignUp"
        >
          Đăng ký tài khoản
        </p-button>
      </form>

      <p class="text-center" style="margin: 28px 0 50px;">
        Bạn đã có tài khoản?
        <router-link :to="{ name: 'sign-in' }" class="link-login"
          >Đăng nhập</router-link
        >
      </p>

      <p class="police__text text-center gg-captche">
        Được bảo vệ bởi reCAPTCHA và tuân theo
        <a
          href="https://www.google.com/intl/en/policies/privacy/"
          target="_blank"
          >Chính sách quyền riêng tư</a
        >
        và
        <a href="https://www.google.com/intl/en/policies/terms/" target="_blank"
          >Điều khoản dịch vụ</a
        >
        của Google.
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Storage from '@core/helpers/storage'
// import VueRecaptcha from 'vue-recaptcha'

export default {
  computed: {
    recapchaKey() {
      return `${process.env.VUE_APP_RECAPCHA_KEY}`
    },
  },

  data() {
    return {
      form: {
        checkCaptcha: false,
      },
      check: true,
      user: {
        fullname: '',
        email: '',
        phone: '',
        password: '',
      },
      isLoading: false,
      result: { success: true, message: 'Some thing wrong' },
      requiredEmail: false,
      requiredPhone: false,
      requiredPassword: false,
      requiredUsername: false,
      correctEmail: false,
      correctPhone: false,
      correctPassword: false,
      correctUsername: false,
    }
  },

  methods: {
    ...mapActions('auth', ['signUp']),

    checkEmail(e) {
      if (e) {
        return (this.correctEmail = true)
      }
      return (this.correctEmail = false)
    },
    checkPhone(e) {
      if (e) {
        return (this.correctPhone = true)
      }
      return (this.correctPhone = false)
    },
    checkUsername(e) {
      if (e) {
        return (this.correctUsername = true)
      }
      return (this.correctUsername = false)
    },
    checkPassword(e) {
      if (e) {
        return (this.correctPassword = true)
      }
      return (this.correctPassword = false)
    },

    checkRequired() {
      let result = true
      if (this.user.fullname == '') {
        this.requiredUsername = true
        result = false
      } else {
        this.requiredUsername = false
      }

      if (this.user.password == '') {
        this.requiredPassword = true
        result = false
      } else {
        this.requiredPassword = false
      }

      if (this.user.email == '') {
        this.requiredEmail = true
        result = false
      } else {
        this.requiredEmail = false
      }

      if (this.user.phone == '') {
        this.requiredPhone = true
        result = false
      } else {
        this.requiredPhone = false
      }

      return result
    },

    onVerify: function(response) {
      if (response) this.form.checkCaptcha = true
      this.check = true
    },
    onCaptchaExpired: function() {
      this.form.checkCaptcha = false
    },

    async onSignUp() {
      if (!this.checkRequired()) {
        return
      }
      if (
        this.correctEmail == false ||
        this.correctUsername == false ||
        this.correctPassword == false ||
        this.correctPhone == false
      ) {
        return
      }

      if (this.form.checkCaptcha == false) {
        this.check = false
        return
      }
      const data = {
        full_name: this.user.fullname.trim(),
        email: this.user.email.trim().toLowerCase(),
        password: this.user.password,
        phone_number: this.user.phone.trim(),
      }

      this.isLoading = true
      this.result = await this.signUp({ user: data })
      setTimeout(() => {
        this.isLoading = false
      }, 1000)

      if (this.result.success) {
        Storage.set('userEmail', this.user.email)
        Storage.set('expried', null)
        setTimeout(() => {
          this.$router.push({
            name: 'sign-in',
          })
          this.$toast.open({
            type: 'success',
            message: 'Đăng ký thành công',
            duration: 3000,
          })
        }, 2000)
        return
      }
      this.$refs.recapcha.reset()
      this.form.checkCaptcha = false
      this.$toast.open({
        type: 'error',
        message: this.result.errors
          ? this.result.errors.join(',')
          : this.result.error,
        duration: 3000,
      })
    },
    onQueryChange() {
      this.checkRequired()
    },
  },
}
</script>
