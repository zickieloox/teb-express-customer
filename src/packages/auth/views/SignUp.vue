<template>
  <div class="card sign-up">
    <div class="header">
      <h2>Tạo tài khoản mới</h2>
    </div>
    <p
      class="alert"
      :class="{
        active: !!message,
        error: error,
        success: !error,
      }"
      >{{ message }}</p
    >
    <form class="form form-sign-up" @submit.prevent="onSignUp">
      <m-input
        icon="user-o"
        v-model.trim="user.fullname"
        :error="valider.hasError('fullname')"
        :messages="valider.error('fullname')"
        @input="onInput('fullname')"
      >
        <template v-if="!user.fullname">
          Tên của bạn <span class="text-danger">*</span>
        </template>
      </m-input>

      <m-input
        icon="phone-o"
        v-model.trim="user.phone"
        :error="valider.hasError('phone')"
        :messages="valider.error('phone')"
        @input="onInput('phone')"
      >
        <template v-if="!user.phone">
          Số điện thoại của bạn <span class="text-danger">*</span>
        </template>
      </m-input>

      <m-input
        icon="envelope-o"
        v-model.trim="user.email"
        :error="valider.hasError('email')"
        :messages="valider.error('email')"
        @input="onInput('email')"
      >
        <template v-if="!user.email">
          Email của bạn <span class="text-danger">*</span>
        </template>
      </m-input>

      <m-input
        type="password"
        icon="lock-o"
        v-model="user.password"
        :password="true"
        :error="valider.hasError('password')"
        :messages="valider.error('password')"
        @input="onInput('password')"
      >
        <template v-if="!user.password">
          Mật khẩu của bạn <span class="text-danger">*</span>
        </template>
        <template v-slot:toggle-password="{ type }">
          {{ type === 'text' ? 'Ẩn' : 'Hiển thị' }}
        </template>
      </m-input>
      <p class="police__text mb-40">
        Khi nhấn nút <b>Đăng ký tài khoản</b>, bạn đã đồng ý thực hiện mọi giao
        dịch theo <a href="#">Điều kiện sử dụng & chính sách</a> của LionBay
      </p>
      <p-button
        class="btn-special"
        :class="{ 'loading spin': isSubmitting }"
        @click="onSignUp"
        :disabled="disableBtn"
        :icon="`arrow-right`"
      >
        <span class="btn-title"> Đăng ký tài khoản</span>
      </p-button>
    </form>

    <p class="text-center" style="margin: 28px 0 50px">
      Bạn đã có tài khoản?
      <router-link :to="{ name: 'sign-in' }" class="link-login"
        >Đăng nhập</router-link
      >
    </p>

    <p class="police__text text-center gg-captche">
      Được bảo vệ bởi reCAPTCHA và tuân theo
      <a href="https://www.google.com/intl/en/policies/privacy/" target="_blank"
        >Chính sách quyền riêng tư</a
      >
      và
      <a href="https://www.google.com/intl/en/policies/terms/" target="_blank"
        >Điều khoản dịch vụ</a
      >
      của Google.
    </p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
// import Storage from '@core/helpers/storage'
// import VueRecaptcha from 'vue-recaptcha'
import { signup } from '../validate'
// import { debounce } from '@core/utils'

export default {
  computed: {
    disableBtn() {
      return (
        this.isSubmitting ||
        this.user.fullname === '' ||
        this.user.email === '' ||
        this.user.phone === '' ||
        this.user.password === ''
      )
    },
  },
  data() {
    return {
      user: {
        fullname: '',
        email: '',
        phone: '',
        password: '',
      },
      error: false,
      message: '',
      isSubmitting: false,
      valider: signup,
    }
  },

  methods: {
    ...mapActions('auth', ['signUp']),

    onInput(key) {
      if (key === 'fullname') {
        this.valider.validFullname(this.user.fullname)
      }

      if (key === 'phone') {
        this.valider.validPhone(this.user.phone)
      }

      if (key === 'email') {
        this.valider.validEmail(this.user.email)
      }

      if (key === 'password') {
        this.valider.validPassword(this.user.password)
      }
    },

    async onSignUp() {
      if (this.isSubmitting) return

      if (!this.valider.isValid(this.user)) {
        return
      }

      const payload = {
        full_name: this.user.fullname.trim(),
        email: this.user.email.trim().toLowerCase(),
        password: this.user.password,
        phone_number: this.user.phone.trim(),
      }

      this.isSubmitting = true
      const res = await this.signUp({ user: payload })

      if (res && res.success) {
        this.error = false
        this.message = 'Đăng ký tài khoản thành công!'
        this.resetForm()
      }

      setTimeout(() => {
        this.isSubmitting = false

        if (!res || !res.success) {
          this.error = true
          this.message = res.message || 'Có lỗi xảy, vui lòng thử lại!'
          if (res.errors && res.errors.length) {
            this.message = `${res.errors.join('\n')}`
          }
        } else {
          this.$router.push({ name: 'sign-in' })
        }
      }, 1500)
    },

    resetForm() {
      this.user = {
        fullname: '',
        email: '',
        phone: '',
        password: '',
      }
    },
  },
}
</script>
