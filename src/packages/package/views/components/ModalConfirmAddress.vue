<template>
  <p-modal
    class="modal-confirm__address"
    :active="visible"
    title="Kiểm tra lại địa chỉ"
    @close="handleClose"
    :width="450"
  >
    <template>
      <div class="confirm__address">
        <p class="confirm__address-title">Địa chỉ đơn hàng :</p>
        <h5 class="confirm__address-content">
          {{ address }}
        </h5>
        <div class="confirm__address-ques"
          >Bạn chắc chắn đây là địa chỉ hợp lệ? Xin hãy vui lòng xác nhận!</div
        >
      </div>
    </template>
    <template slot="footer">
      <div class="d-flex address__footer">
        <p-button @click="handleClose" type="lb-default">
          Bỏ qua
        </p-button>
        <p-button
          class="ml-7"
          type="primary"
          @click="handleAccept"
          :loading="loading"
        >
          Xác nhận
        </p-button>
      </div>
    </template>
  </p-modal>
</template>
<script>
export default {
  name: 'ModalConfirmAddress',
  data() {
    return {}
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
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
    },
    handleAccept() {
      this.$emit('action')
    },
  },
}
</script>

<style lang="scss">
.modal-confirm__address {
  .confirm__address {
    color: #313232;
    &-title {
      font-size: 12px;
      color: #626363;
    }
    &-content {
      background-color: #f6f7f7;
      border-radius: 4px;
      padding: 10px 8px;
      font-weight: bold;
    }
  }
  .address__footer {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
