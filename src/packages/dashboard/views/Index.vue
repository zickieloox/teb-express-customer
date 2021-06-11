<template>
  <div>
    <div class="order-view-page pages">
      <div class="container">
        <button @click="hadel"></button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    hadel() {
      this.$toast.open({
        type: 'error',
        message: 'You are not allowed to do this action !',
      })
    },
  },
}
</script>
