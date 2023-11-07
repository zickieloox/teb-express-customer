<template>
  <div class="card sign-up">
    <div class="sign-up-form" v-if="visibleSignInForm">
      <div class="header">
        <h2>Tạo tài khoản mới</h2>
        <p style="margin-top: -10px;margin-bottom: 24px;" v-if="ref_fullname"
          >Được mời bởi <strong>{{ ref_fullname }}</strong></p
        >
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
            v-model.trim="user.fullname"
            :error="valider.hasError('fullname')"
            :messages="valider.error('fullname')"
            @input="onInput('fullname')"
          >
            <template v-if="!user.fullname">
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
            :disabled="tkExpire != ''"
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
    <Success v-if="visibleSuccessRequest" />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import { signup } from '../validate'
import SmsOtp from '../components/SmsOtp'
import Requested from '../components/Requested'
import { OPTIONS_PACKAGES } from '../constants'
import { GET_INFO_INVITE, FETCH_REF_INFO } from '../store'
import { SET_LOADING } from '../../package/store'
import { delay } from '../../../core/utils'
import Success from '../components/Success.vue'

export default {
  components: { SmsOtp, Requested, Success },
  computed: {
    ...mapState('package', {
      isLoading: (state) => state.isLoading,
    }),
    disableBtn() {
      return (
        this.isSubmitting ||
        this.user.fullname === '' ||
        this.user.email === '' ||
        this.user.phone === '' ||
        this.user.password === ''
      )
    },
    URL_POLICY() {
      return process.env.VUE_APP_POLICY_URL
    },
    tkExpire() {
      const code = this.$route.query['tk_expire'] || ''
      return code.trim()
    },
    referCode() {
      const code = this.$route.query['refer_code'] || ''
      return code.trim()
    },
  },
  data() {
    return {
      user: {
        fullname: '',
        package: null,
        email: '',
        phone: '',
        password: '',
        tk_expire: '',
        referral_code: '',
      },
      options: OPTIONS_PACKAGES,
      visibleSMSOtpComponent: false,
      visibleCompleteRequest: false,
      visibleSuccessRequest: false,
      visibleSignInForm: true,
      error: false,
      message: '',
      isSubmitting: false,
      valider: signup,
      ref_fullname: '',
    }
  },
  created() {
    this.checkTokenExpire()
    this.fetchRefInfoHandle()
  },
  methods: {
    ...mapActions('auth', ['signUp', GET_INFO_INVITE, FETCH_REF_INFO]),
    ...mapMutations('package', ['package', SET_LOADING]),

    async checkTokenExpire() {
      this[SET_LOADING](true)
      const code = this.tkExpire
      if (!code) {
        this[SET_LOADING](false)
        return
      }

      const res = await this[GET_INFO_INVITE](code)
      this[SET_LOADING](false)

      if (res.statusCode == '404') {
        await this.$router.push({
          name: 'expired-expired',
          query: { tk_expire: code },
        })
        return
      }

      this.user.tk_expire = code
      this.user.email = res.email
    },

    async fetchRefInfoHandle() {
      this[SET_LOADING](true)
      const code = this.referCode
      if (!code) {
        this[SET_LOADING](false)
        return
      }

      const res = await this[FETCH_REF_INFO](code)
      this[SET_LOADING](false)

      if (res.statusCode == '404') {
        await this.$router.push({
          name: 'sign-up',
        })
        return
      }
      this.ref_fullname = res.full_name
    },

    onInput(key) {
      switch (key) {
        case 'fullname':
          this.valider.validFullname(this.user.fullname)
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
        full_name: this.user.fullname.trim(),
        email: this.user.email.trim().toLowerCase(),
        password: this.user.password,
        phone_number: this.user.phone.trim(),
        package: this.user.package.id,
        tk_expire: this.user.tk_expire,
        referral_code: this.referCode,
      }

      this.isSubmitting = true
      const res = await this.signUp({ user: payload })

      await delay(1000)
      this.isSubmitting = false

      if (res && res.success) {
        this.error = false
        if (payload.tk_expire != '') {
          this.visibleSignInForm = false
          this.visibleSuccessRequest = true
          return
        }

        this.visibleSignInForm = false
        this.visibleCompleteRequest = true
        return
      }

      this.error = true
      this.message = res.message || 'Có lỗi xảy, vui lòng thử lại!'
      if (res.errors && res.errors.length) {
        this.message = `${res.errors.join('\n')}`
      }
    },
  },
}
</script>
