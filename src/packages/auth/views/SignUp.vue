<template>
  <div class="page vertical-align">
    <div class="vertical-align-middle">
      <div class="header mb-16">
        <div class="header-2">
          Tạo tài khoản mới
        </div>
      </div>

      <form :model="form" class="" @submit.prevent="onSignUp">
        <div class="mb-16">
          <label class="font-weight-600 color-newtral-10">Họ và tên</label>
          <p-input
            placeholder="Username"
            type="username"
            validate="on"
            v-model="user.username"
            :input="user.username"
            @keyup.enter="onSignUp"
            @status="checkUsername($event)"
            :required="requiredUsername"
          />
        </div>
        <div class="mb-16">
          <label class="font-weight-600 color-newtral-10"
            >Số điện thoại / Email</label
          >
          <p-input
            placeholder="you@example.com"
            type="email"
            validate="on"
            v-model="user.email"
            :input="user.email"
            @status="checkEmail($event)"
            @keyup.enter="onSignUp"
            :required="requiredEmail"
          />
        </div>
        <div class="mb-16">
          <label class="font-weight-600 color-newtral-10">Mật khẩu</label>
          <p-input
            placeholder="Enter password"
            hiddenPass="on"
            type="password"
            validate="on"
            v-model="user.password"
            :input="user.password"
            @keyup.enter="onSignUp"
            :required="requiredPassword"
            @status="checkPassword($event)"
          />
        </div>
        <div class="captcha mb-16">
          <vue-recaptcha
            ref="recapcha"
            @verify="onVerify"
            :sitekey="`${recapchaKey}`"
            :loadRecaptchaScript="true"
            @expired="onCaptchaExpired"
          >
          </vue-recaptcha>
          <span class="invalid-error" v-if="check == false">
            Please check the captcha
          </span>
        </div>
        <div class="police mb-16">
          <span class="police__text">
            Khi nhấn nút <b> Đăng ký</b>, bạn đã đồng ý thực hiện mọi giao dịch
            mua bán theo

            <a class="police__text-link" href="/"
              >Điều kiện sử dụng & chính sách</a
            >
            của xxx.
          </span>
        </div>
        <p-button
          class="btn btn-special btn-primary mb-16 "
          :loading="isLoading"
          @click="onSignUp"
        >
          Sign up
        </p-button>
      </form>

      <p class="mb-80">
        Bạn đã có tài khoản?
        <router-link :to="{ name: 'sign-in' }" class="creatAcount"
          >Đăng nhập</router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Storage from '@core/helpers/storage'
import VueRecaptcha from 'vue-recaptcha'
export default {
  components: { VueRecaptcha },

  computed: {
    recapchaKey() {
      return `${process.env.VUE_APP_RECAPCHA_KEY}`
    },
  },
  props: {
    listNumber: {
      type: Array,
      default: () => [{}],
    },
  },

  data() {
    return {
      form: {
        checkCaptcha: false,
      },
      check: true,
      user: {
        username: '',
        email: '',
        password: '',
        user_referring_code: null,
        phone_number: '',
      },
      shop_name: '',
      country_code: '',
      isLoading: false,
      isShowSnackbar: false,
      result: { success: true, message: 'Some thing wrong' },
      timeout: null,
      requiredEmail: false,
      requiredPassword: false,
      requiredUsername: false,
      requiredShopname: false,
      requiredPhonenumber: false,
      correctEmail: false,
      correctPassword: false,
      correctUsername: false,
      correctShopname: false,
      correctPhonenumber: false,
      numberC: {
        type: Object,
        default: () => {},
      },
    }
  },
  created() {
    if (typeof this.$route.query['ref_code'] !== 'undefined') {
      this.user.user_referring_code = this.$route.query['ref_code']
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
    checkShopname(e) {
      if (e) {
        return (this.correctShopname = true)
      }
      return (this.correctShopname = false)
    },
    checkPhonenumber(e) {
      if (e) {
        return (this.correctPhonenumber = true)
      }
      return (this.correctPhonenumber = false)
    },

    checkRequired() {
      let result = true
      if (this.user.username == '') {
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

      if (this.shop_name == '') {
        this.requiredShopname = true
        result = false
      } else {
        this.requiredShopname = false
      }

      if (this.user.phone_number == '') {
        this.requiredPhonenumber = true
        result = false
      } else {
        this.requiredPhonenumber = false
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
        this.correctShopname == false ||
        this.correctPhonenumber == false
      ) {
        return
      }

      if (this.form.checkCaptcha == false) {
        this.check = false
        return
      }
      const data = {
        username: this.user.username,
        email: this.user.email.toLowerCase(),
        password: this.user.password,
        user_referring_code: this.user.user_referring_code,
      }
      if (this.country_code == '') {
        data.phone_number = '+84' + this.user.phone_number
      } else {
        data.phone_number = this.country_code + this.user.phone_number
      }
      this.isLoading = true
      this.isShowSnackbar = false
      this.result = await this.signUp({ user: data, shop_name: this.shop_name })
      setTimeout(() => {
        this.isLoading = false
      }, 2000)

      if (this.result.success) {
        Storage.set('userEmail', this.user.email)
        Storage.set('expried', null)
        setTimeout(() => {
          this.$router.push({
            name: 'verify-email',
          })
        }, 2000)
        return
      }
      this.$refs.recapcha.reset()
      this.form.checkCaptcha = false
      this.$toast.open({
        type: 'error',
        message: this.result.errors.join(','),
        duration: 3000,
      })
    },
  },
}
</script>

<style>
@media (max-width: 767px) {
  .sign-up-phone {
    padding-left: 0;
  }
}
</style>
