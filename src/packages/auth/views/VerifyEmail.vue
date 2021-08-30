<template>
  <div class="card sign-up">
    <h2>Chào mừng bạn đến với Lionbay</h2>
    <p
      >Một email xác thực đã được gửi đến hòm thư của bạn, vui lòng kiểm tra
      email để hoàn tất đăng ký.</p
    >
    <p>Nếu bạn vẫn chưa nhận được email</p>
    <p-button
      class="btn btn-special btn-primary mt-20 mb-20"
      :loading="isLoading"
      :disabled="counting"
      @click="handleResendEmail"
    >
      <span v-if="counting">Gửi lại email sau {{ count }} </span>
      <span v-if="!counting">Gửi lại email xác thực</span>
    </p-button>
    <p class="tip">
      Mẹo: Nếu bạn không tìm thấy email, vui lòng kiểm tra
      <br />
      <b>Spam</b> hoặc <b>Thư rác</b>
    </p>
    <a href="/">Quay trở lại trang đăng nhập</a>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import mixinRoute from '@core/mixins/route'
import Storage from '@core/helpers/storage'

export default {
  name: 'VerifyEmail',
  mixins: [mixinRoute],
  filters: {},
  computed: {
    ...mapState('auth', {
      currentUser: (state) => state.user,
    }),
    code() {
      return this.$route.params.code
    },
  },

  data() {
    return {
      isLoading: false,
      result: {},
      counting: false,
      count: '2m',
    }
  },

  created() {
    this.init()
  },

  methods: {
    ...mapActions('auth', ['verifyEmail', 'resendEmail']),

    // To do clean code
    async init() {
      let now = new Date().getTime()
      if (Storage.get('expried') < now || Storage.get('expried') == null) {
        let expried = new Date().getTime() + 2 * 60000
        Storage.set('expried', expried)
        this.counting = true
        this.countDownTimer()
      } else {
        this.count = Storage.get('count')
        this.counting = Storage.get('counting')
        this.countDownTimer()
      }
      const url = new URL(window.location.href)
      const code = url.searchParams.get('code')
      const params = {
        code: code,
      }
      if (code) {
        const result = await this.verifyEmail(params)
        if (result.success) {
          if (result.permission) {
            return this.$router.push('/')
          }
          return this.$toast.open({
            type: 'error',
            message: 'Bạn không được phép thực hiện!',
          })
        } else {
          return this.$router.push('/404')
        }
      }
    },

    async handleResendEmail() {
      // To do bo console log
      if (!Storage.get('userEmail')) {
        return
      }
      this.isLoading = true

      const params = {
        email: Storage.get('userEmail'),
      }
      let response = await this.resendEmail(params)
      // To do clean code
      if (response.success) {
        this.$toast.open({
          type: 'success',
          message:
            'Yêu cầu gửi lại thành công! Vui lòng kiểm tra hòm thư của bạn.',
        })
        setTimeout(() => {
          this.isLoading = false
        }, 2000)
        this.counting = true
        let now = new Date().getTime()

        if (Storage.get('expried') < now || Storage.get('expried') == null) {
          let expried = new Date().getTime() + 2 * 60000
          Storage.set('expried', expried)
          this.countDownTimer()
        } else {
          this.countDownTimer()
        }
        return
      }
      this.$toast.open({ type: 'error', message: response.message })
    },

    countDownTimer() {
      let countDownDate = Storage.get('expried')
      let x = setInterval(
        function() {
          let now = new Date().getTime()

          // Find the distance between now and the count down date
          let distance = countDownDate - now

          // Time calculations for minutes and seconds
          let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
          let seconds = Math.floor((distance % (1000 * 60)) / 1000)

          // Display the result in the element with id="demo"
          this.count = minutes + 'm ' + seconds + 's '

          // If the count down is finished, write some text
          if (distance < 0) {
            this.counting = false
            clearInterval(x)
          }
        }.bind(this),
        1000
      )
      Storage.set('count', this.count)
      Storage.set('counting', this.counting)
    },
  },

  watch: {
    filter: {
      handler: function() {
        this.init()
      },
      deep: true,
    },
  },
}
</script>
