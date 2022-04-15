<template>
  <div class="sms-otp" v-if="visible">
    <div class="header text-center">
      <h2>Nhập mã OTP</h2>
    </div>
    <div class="otp-content">
      <p class="text-center text_notice"
        >Vui lòng nhập mã OTP đã được gửi về số điện thoại của bạn để hoàn tất
        đăng ký</p
      >
      <form
        method="get"
        class="digit-group"
        data-autosubmit="false"
        autocomplete="off"
      >
        <input
          type="text"
          id="digit-1"
          maxlength="1"
          @keyup="triggerKeyupInput($event, 2)"
        />
        <input
          type="text"
          id="digit-2"
          maxlength="1"
          @keyup="triggerKeyupInput($event, 3, 1)"
        />
        <input
          type="text"
          id="digit-3"
          maxlength="1"
          @keyup="triggerKeyupInput($event, 4, 2)"
        />
        <input
          type="text"
          id="digit-4"
          maxlength="1"
          @keyup="triggerKeyupInput($event, 5, 3)"
        />
        <input
          type="text"
          id="digit-5"
          maxlength="1"
          @keyup="triggerKeyupInput($event, 6, 4)"
        />
        <input
          type="text"
          id="digit-6"
          maxlength="1"
          @keyup="triggerKeyupInput($event, '', 5)"
        />
      </form>
      <div class="resend-sms text-center">
        <a href="">Gửi lại mã OTP</a>
        <div class="time-count-down" id="timer">10:00</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SmsOtp',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      classList: [],
    }
  },
  mounted() {
    this.startTimerCountdown()
  },
  methods: {
    startTimerCountdown() {
      if (!this.visible) {
        return
      }
      const presentTime = $('#timer').html()
      const timeArray = presentTime.split(/[:]+/)
      let m = timeArray[0]

      const s = this.checkSecond(timeArray[1] - 1)
      if (s == 59) {
        m = m - 1
      }
      if ((m + '').length == 1) {
        m = '0' + m
      }
      if (m < 0) {
        m = '59'
      }
      $('#timer').html(m + ':' + s)
      setTimeout(
        function() {
          this.startTimerCountdown()
        }.bind(this),
        1000
      )
    },
    checkSecond(sec) {
      if (sec < 10 && sec >= 0) {
        sec = '0' + sec
      }
      if (sec < 0) {
        sec = '59'
      }
      return sec
    },
    triggerKeyupInput(e, next, prev) {
      if (e.keyCode === 8 || e.keyCode === 37) {
        if (prev && $(`#digit-${prev}`).length) {
          $(`#digit-${prev}`).select()
        }
      } else if (
        (e.keyCode >= 48 && e.keyCode <= 57) ||
        (e.keyCode >= 65 && e.keyCode <= 90) ||
        (e.keyCode >= 96 && e.keyCode <= 105) ||
        e.keyCode === 39
      ) {
        if (next && $(`#digit-${next}`).length) {
          $(`#digit-${next}`).select()
        }
      }
    },
  },
}
</script>
