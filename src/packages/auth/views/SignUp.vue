<template>
  <div class="card">
    <div class="sign-up" v-if="visibleSignInForm">
      <div class="header">
        <h2>Tạo tài khoản mới</h2>
      </div>
      <p
        v-if="message"
        class="alert"
        :class="{
          active: !!message,
          error: error,
          success: !error,
        }"
        >{{ message }}</p
      >
      <form class="form form-sign-up" @submit.prevent="onSignUp">
        <div class="form-group form-input">
          <label for=""
            >Tên tài khoản: <span class="text-danger">*</span></label
          >
          <m-input
            v-model.trim="user.account"
            :error="valider.hasError('account')"
            :messages="valider.error('account')"
            @input="onInput('account')"
          >
            <template v-if="!user.account">
              Nhập tên tài khoản
            </template>
          </m-input>
        </div>
        <div
          class="form-group form-input"
          :class="{ 'error-input': valider.hasError('package') }"
        >
          <label for=""
            >Quy mô vận chuyển: <span class="text-danger">*</span></label
          >
          <multiselect
            class="multiselect-package"
            :options="options"
            placeholder="Chọn quy mô vận chuyển"
            v-model="user.package"
            :custom-label="customLabel"
            @input="handleSelectPackage"
          >
          </multiselect>
          <div class="m-input-field" v-if="valider.hasError('package')">
            <span class="helper-text">
              {{ valider.error('package') }}
            </span>
          </div>
        </div>
        <div class="form-group form-input">
          <label for=""
            >Số điện thoại: <span class="text-danger">*</span></label
          >
          <m-input
            v-model.trim="user.phone"
            :error="valider.hasError('phone')"
            :messages="valider.error('phone')"
            @input="onInput('phone')"
          >
            <template v-if="!user.phone">
              Nhập số điện thoại của bạn
            </template>
          </m-input>
        </div>
        <div class="form-group form-input">
          <label for="">Email: <span class="text-danger">*</span></label>
          <m-input
            v-model.trim="user.email"
            :error="valider.hasError('email')"
            :messages="valider.error('email')"
            @input="onInput('email')"
          >
            <template v-if="!user.email">
              Nhập email của bạn
            </template>
          </m-input>
        </div>
        <div class="form-group form-input">
          <label for="">Mật khẩu: <span class="text-danger">*</span></label>
          <m-input
            type="password"
            v-model="user.password"
            :password="true"
            :error="valider.hasError('password')"
            :messages="valider.error('password')"
            @input="onInput('password')"
          >
            <template v-if="!user.password">
              Nhập mật khẩu của bạn
            </template>
            <template v-slot:toggle-password="{ type }">
              {{ type === 'text' ? 'Ẩn' : 'Hiển thị' }}
            </template>
          </m-input>
        </div>

        <p class="police__text mb-32">
          Khi nhấn nút <b>Đăng ký tài khoản</b>, bạn đã đồng ý thực hiện mọi
          giao dịch theo
          <a target="_blank" :href="`${URL_POLICY}`"
            >Điều kiện sử dụng & chính sách</a
          >
          của LionBay
        </p>
        <p-button
          class="btn-special"
          :class="{ 'loading spin': isSubmitting }"
          @click="onSignUp"
          :disabled="disableBtn"
          :icon="`arrow-right`"
        >
          Đăng ký tài khoản
        </p-button>
      </form>

      <p
        class="text-center"
        style="margin: 24px 0 40px;line-height:20px;color:#313232;"
      >
        Bạn đã có tài khoản?
        <router-link :to="{ name: 'sign-in' }" class="link-login"
          >Đăng nhập</router-link
        >
      </p>

      <p class="police__text-bottom text-center gg-captche">
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
    <sms-otp :visible.sync="visibleSMSOtpComponent"></sms-otp>
    <requested :visible.sync="visibleCompleteRequest"></requested>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Storage from '@core/helpers/storage'
import { signup } from '../validate'
import SmsOtp from '../components/SmsOtp'
import Requested from '../components/Requested'
export default {
  components: { SmsOtp, Requested },
  computed: {
    disableBtn() {
      return (
        this.isSubmitting ||
        this.user.account === '' ||
        this.user.email === '' ||
        this.user.phone === '' ||
        this.user.password === ''
      )
    },
    URL_POLICY() {
      return process.env.VUE_APP_POLICY_URL
    },
  },
  data() {
    return {
      user: {
        account: '',
        package: null,
        email: '',
        phone: '',
        password: '',
      },
      options: [
        {
          id: 1,
          name: 'Từ 6000 đơn hàng / tháng trở lên',
        },
        {
          id: 2,
          name: 'Từ 7000 đơn hàng / tháng trở lên',
        },
        {
          id: 3,
          name: 'Từ 8000 đơn hàng / tháng trở lên',
        },
        {
          id: 4,
          name: 'Từ 9000 đơn hàng / tháng trở lên',
        },
      ],
      visibleSMSOtpComponent: false,
      visibleCompleteRequest: false,
      visibleSignInForm: true,
      error: false,
      message: '',
      isSubmitting: false,
      valider: signup,
    }
  },
  methods: {
    ...mapActions('auth', ['signUp']),

    onInput(key) {
      switch (key) {
        case 'account':
          this.valider.validAccount(this.user.account)
          break
        case 'phone':
          this.valider.validPhone(this.user.phone)
          break
        case 'email':
          this.valider.validEmail(this.user.email)
          break
        case 'password':
          this.valider.validPassword(this.user.password)
          break
        default:
          break
      }
    },
    handleSelectPackage() {
      this.valider.validPackage(this.user.package)
    },
    customLabel({ name }) {
      return name
    },
    async onSignUp() {
      if (this.isSubmitting) return

      if (!this.valider.isValid(this.user)) {
        return
      }

      const payload = {
        username: this.user.account.trim(),
        email: this.user.email.trim().toLowerCase(),
        password: this.user.password,
        phone_number: this.user.phone.trim(),
        package: this.user.package.id,
      }

      this.isSubmitting = true
      const res = await this.signUp({ user: payload })
      setTimeout(() => {
        this.isSubmitting = false
        if (res && res.success) {
          this.error = false
          Storage.set('userEmail', this.user.email)
          Storage.set('expried', null)
          this.visibleSignInForm = false
          this.visibleCompleteRequest = true
        } else {
          this.error = true
          this.message = res.message || 'Có lỗi xảy, vui lòng thử lại!'
          if (res.errors && res.errors.length) {
            this.message = `${res.errors.join('\n')}`
          }
        }
      }, 1500)
    },
  },
}
</script>
