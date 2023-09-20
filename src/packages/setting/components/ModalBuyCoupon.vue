<template>
  <div class="modal-template">
    <p-modal
      :active="visible"
      title="Xác nhận mua coupon"
      @close="handleClose"
      class="b-coupon-modal"
    >
      <template>
        <div class="container-fluid">
          <div class="row">
            <div class="col-12 mb-16">
              <div class="card">
                <div class="card-block">
                  <div class="row">
                    <div class="col-12">
                      <label>Số lượng:</label>
                      <div
                        class="d-flex justify-content-between align-items-center input-quantity"
                      >
                        <svg
                          @click="addQuantity"
                          class="btn-add"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.1665 9.16675V4.16675H10.8332V9.16675H15.8332V10.8334H10.8332V15.8334H9.1665V10.8334H4.1665V9.16675H9.1665Z"
                            fill="#313232"
                          />
                        </svg>
                        <p-input
                          type="text"
                          v-model="quantity"
                          :input="quantity"
                          @input="checkQuantity"
                        />
                        <svg
                          @click="subQuantity"
                          class="btn-sub"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.1665 9.16675V10.8334H15.8332V9.16675H4.1665Z"
                            fill="#313232"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12">
              <p>Tổng điểm: {{ coupon.point * quantity }} điểm</p>
              <p
                >Bạn có chắc chắn muốn mua coupon
                <strong>{{ coupon.code }}</strong> ?</p
              >
            </div>
          </div>
        </div>
      </template>

      <template slot="footer">
        <div class="group-button modal-confirm">
          <p-button type="default" @click="handleClose">
            Bỏ qua
          </p-button>
          <p-button
            type="primary"
            @click.prevent="handleSave()"
            :disabled="disabled"
            :loading="loading"
          >
            Mua coupon
          </p-button>
        </div>
      </template>
    </p-modal>
  </div>
</template>

<script>
import mixinUpload from '@core/mixins/upload'
export default {
  name: 'ModalCreateImportTemplate',
  mixins: [mixinUpload],
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    coupon: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      quantity: 1,
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    },
    checkQuantity(e) {
      if (!/^\d+$/.test(e)) {
        this.quantity = e.slice(0, -1)
      }
      if (parseInt(this.quantity) < 1) {
        this.quantity = 1
      }
    },
    subQuantity() {
      if (parseInt(this.quantity) <= 1) {
        return
      }
      this.quantity--
    },
    addQuantity() {
      this.quantity++
    },
    handleSave() {
      if (this.quantity === '') {
        this.$toast.error('Số lượng bắt buộc nhập')
        return
      }
      this.$emit('buy', parseInt(this.quantity))
    },
  },
  watch: {
    visible: {
      handler: function() {},
      immediate: true,
    },
  },
}
</script>
<style>
.input-quantity {
  position: relative;
}
.input-quantity .p-input {
  padding-left: 52px !important;
  padding-right: 52px !important;
  text-align: center;
}
.btn-add {
  position: absolute;
  left: 16px;
  z-index: 999;
  cursor: pointer;
  display: inline-block;
  width: 20px;
  height: 20px;
}
.btn-sub {
  position: absolute;
  right: 16px;
  z-index: 999;
  cursor: pointer;
  display: inline-block;
  width: 20px;
  height: 20px;
}
.b-coupon-modal .p-modal-content {
  max-width: 400px;
  border-radius: 4px;
}
.b-coupon-modal p {
  margin-bottom: 4px !important;
}
.b-coupon-modal .modal-content {
  border-radius: 4px;
}
.b-coupon-modal label {
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.2px;
  color: #111212;
}
</style>
