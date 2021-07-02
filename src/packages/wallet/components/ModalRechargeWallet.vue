<template>
  <div class="modal-recharge-wallet">
    <p-modal :active="visible" @close="handleClose" :title="'Nạp tiền'">
      <template>
        <div class="payments">
          <span>Vui lòng chọn phương thức thanh toán:</span>
          <span class="usd">Tỷ giá đô la: {{ usdToVnd }} vnđ</span>
        </div>
        <div class="tab">
          <div class="active">Chuyển khoản</div>
          <div class="deactive">Payoneer <span>(coming soon)</span></div>
          <div class="deactive">PingPong <span>(coming soon)</span></div>
        </div>
        <div class="card">
          <p
            >Vui lòng chuyển tiền tới số tài khoản dưới đây theo nội dung
            sau:</p
          >
          <p
            >Ngân hàng: <span>{{ bank }}</span></p
          >
          <p
            >Chi nhánh: <span>{{ branch }}</span></p
          >
          <p
            >Tên chủ thẻ: <span>{{ name }}</span></p
          >
          <p
            >Số tài khoản: <span>{{ accountNumber }}</span></p
          >
          <p
            >Nội dung chuyển khoản: <span id="content">Nạp topup {{ id }}</span>
            <span class="copy" @click.prevent="copy" @mouseout="resetToolip">
              <img src="@assets/img/copy.svg" alt="" />
              <span class="tooltip-text" id="myTooltip">Sao chép nội dung</span>
            </span>
          </p>
          <div class="money d-flex">
            <div class="title">Số tiền:</div>
            <input
              id="money"
              @input="checkValidMoney"
              placeholder="Nhập số tiền"
              :v-model="amount"
            />

            <span>VNĐ</span>
          </div>
          <div class="invalid-error" v-if="error == true">
            {{ errorText }}
          </div>
        </div>

        <div class="note">
          <img src="@/assets/img/InfoCircle.svg" alt="" />
          <b>Lưu ý: </b><i>Nhập chính xác nội dung thanh toán và số tiền</i>
        </div>
      </template>
      <template slot="footer">
        <div></div>

        <div class="d-flex">
          <div>
            <p-button @click="handleClose" type="default" :disabled="loading">
              Bỏ qua
            </p-button>
          </div>
          <div class="ml-7">
            <p-button
              type="primary"
              @click.prevent="handlerRecharge"
              :loading="loading"
            >
              Chuyển tiền
            </p-button>
          </div>
        </div>
      </template>
    </p-modal>
  </div>
</template>

<script>
import { USD_TO_VND, BANK, BRANCH, NAME, ACCOUNT_NUMBER } from '../constant'

export default {
  name: 'ModalRechargeWallet',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      loading: false,
      usdToVnd: USD_TO_VND,
      bank: BANK,
      branch: BRANCH,
      name: NAME,
      accountNumber: ACCOUNT_NUMBER,
      error: false,
      errorText: '',
      amount: '',
    }
  },
  created() {},
  methods: {
    copy() {
      var copyText = document.getElementById('content')
      var textArea = document.createElement('textarea')
      textArea.value = copyText.textContent
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('Copy')
      textArea.remove()

      var tooltip = document.getElementById('myTooltip')
      tooltip.innerHTML = 'Đã sao chép!'
    },

    resetToolip() {
      var tooltip = document.getElementById('myTooltip')
      tooltip.innerHTML = 'Sao chép nội dung'
    },

    handlerRecharge() {
      this.checkValidMoney()
      if (this.error == true) return

      this.$emit('recharge', this.amount.replace(',', ''))
      this.$emit('update:visible', false)
    },

    checkValidMoney() {
      this.amount = document.getElementById('money').value
      if (!/^[0-9,]+$/.test(this.amount.replace(',', ''))) {
        this.error = true
        this.errorText = 'Số tiền không hợp lệ!'
        return
      }
      if (this.amount.replace(',', '') == '') {
        this.error = true
        this.errorText = 'Số tiền không được để trống!'
        return
      }

      document.getElementById('money').value = document
        .getElementById('money')
        .value.replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')

      this.error = false
      this.errorText = ''
    },

    handleClose() {
      this.error = false
      this.errorText = ''
      this.$emit('update:visible', false)
      this.$emit('close', true)
    },
  },

  watch: {
    visible: {
      handler: function(val) {
        this.isVisible = val
        this.amount = ''
      },
      deep: true,
    },
  },
}
</script>
