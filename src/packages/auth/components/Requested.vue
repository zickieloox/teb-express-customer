<template>
  <div class="request-complete" v-if="visible">
    <div class="text-center request-icon">
      <svg
        width="84"
        height="84"
        viewBox="0 0 84 84"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M42 77C61.25 77 77 61.25 77 42C77 22.75 61.25 7 42 7C22.75 7 7 22.75 7 42C7 61.25 22.75 77 42 77Z"
          stroke="#008A7F"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M27.125 42L37.03 51.905L56.875 32.095"
          stroke="#008A7F"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <div class="request-content">
      <div class="text-center request-noti">Yêu cầu của bạn đã được gửi</div>
      <p class="text-center thank_use_sevice"
        >Cảm ơn bạn đã sử dụng dịch vụ của Lionbay. Chúng tôi sẽ sớm liên hệ với
        bạn để thiết lập tài khoản.</p
      >
    </div>
  </div>
</template>
<script>
export default {
  name: 'Requested',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
