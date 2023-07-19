<template>
  <p-modal
    class="modal_coupon"
    :active="visible"
    title=""
    @close="handleClose"
    :width="600"
  >
    <template>
      <div class="text-center">
        <h1>Nhập mã coupon</h1>
        <div class="txt-description">
          Vui lòng nhập mã coupon vào ô bên dưới và nhấn nút xác nhận để sử dụng
          mã coupon
        </div>
        <p-input
          placeholder="Nhập mã coupon"
          class="mb-2"
          type="text"
          clearable
          v-model="coupon_code"
        >
        </p-input>
      </div>
    </template>
    <template slot="footer">
      <p-button type="primary" @click="handleAccept" :loading="loading">
        Xác nhận
      </p-button>
    </template>
  </p-modal>
</template>
<script>
export default {
  name: 'ModalCoupon',
  data() {
    return {
      coupon_code: '',
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
      this.$emit('close')
      this.$emit('apply', '')
    },
    handleAccept() {
      this.$emit('apply', this.coupon_code)
    },
  },
}
</script>

<style lang="css">
.modal_coupon input::-webkit-input-placeholder {
  text-align: center;
  font-family: Be Vietnam Pro;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
}
.modal_coupon .input-group{
  display: block;
  margin: auto;
  width: 400px;
}

.modal_coupon input[type=text]{
  width: 100% !important;
  padding: 18px 16px;
  border: 1px solid #E1E2E2;
  border-radius: 8px !important;
  height: 56px !important;
}

.modal_coupon .modal-footer{
  justify-content: center;
  border-top: none;
  padding-bottom: 60px;
}

.modal_coupon h1{
  font-family: Be Vietnam Pro;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
  color: #111212;
  margin-bottom: 24px;
}
.modal_coupon .txt-description{
  font-family: Be Vietnam Pro;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  color: #626363;
  margin-bottom: 24px;
}
.modal_coupon .modal-body{
  padding-bottom: 0;
}
.modal_coupon .modal-footer{
  padding-top: 0;
}
.modal_coupon .modal-footer button{
  width: 400px;
  padding: 16px 24px;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  height: 56px;
}
.modal_coupon .modal-header{
  border-bottom: none;
}
</style>
