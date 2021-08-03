<template>
  <div class="wallet pages">
    <div class="page-content">
      <div class="page-header">
        <div class="page-header_title header">Hóa đơn</div>
        <div class="navtab-link">
          <ul class="nav nav-tabs nav-tabs-line">
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'wallet' }"
                >Ví của tôi</router-link
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Quản lý hóa đơn</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="#">Nạp tiền</a>
            </li>
          </ul>
        </div>
        <div class="info-money">
          <div class="d-flex">
            <div class="balance d-flex">
              <img src="@assets/img/balance.png" alt="" />
              <div class="wallet">
                <span class="title">Số dư trong ví</span>
                <span class="money">{{
                  balance > 0 ? balance : 0 | formatPrice
                }}</span>
              </div>
            </div>
            <div class="process-money d-flex">
              <img src="@assets/img/process-money.png" alt="" />
              <div class="wallet">
                <span class="title">Tiền đang xử lý</span>
                <span class="money">{{ process_money | formatPrice }}</span>
              </div>
            </div>
          </div>
          <p-button>Thanh toán</p-button>
        </div>
      </div>
      <div class="page-body">
        <div class="top-up d-flex jc-sb">
          <div class="method">
            <div class="active"><i class="fa fa-circle"></i> Chuyển khoản</div>
            <div class="deactive"
              ><i class="fa fa-circle"></i>Payoneer
              <span>(coming soon)</span></div
            >
            <div class="deactive"
              ><i class="fa fa-circle"></i>PingPong
              <span>(coming soon)</span></div
            >
          </div>
          <div class="form-topup">
            <span class="title"
              >Vui lòng chuyển tiền tới số tài khoản dưới đây theo nội dung
              sau:</span
            >
            <div class="card">
              <p
                >Ngân hàng:<br /><span>{{ bank }}</span></p
              >
              <p
                >Chi nhánh:<br /><span>{{ branch }}</span></p
              >
              <p
                >Tên chủ thẻ:<br /><span>{{ name }}</span></p
              >
              <p
                >Số tài khoản:<br /><span>{{ accountNumber }}</span></p
              >
              <p
                >Nội dung chuyển khoản:<br /><span id="content"
                  >Nạp topup {{ topup.id }}</span
                >
                <span
                  class="copy"
                  @click.prevent="copy"
                  @mouseout="resetToolip"
                >
                  <img src="@assets/img/copy.svg" alt="" />
                  <span class="tooltip-text" id="myTooltip"
                    >Sao chép nội dung</span
                  >
                </span>
              </p>
              <div class="money">
                <span class="title">Số tiền:</span>
                <div class="d-flex">
                  <div class="input">
                    <input
                      id="money"
                      @input="checkValidMoney"
                      placeholder="Nhập số tiền"
                      :v-model="amount"
                    />

                    <span>VNĐ</span>
                  </div>
                  <p-button @click.prevent="handlerRecharge" :loading="loading"
                    >Chuyển Tiền</p-button
                  >
                </div>
              </div>
              <div class="invalid-error" v-if="error == true">
                {{ errorText }}
              </div>
              <div class="money-transfer d-flex">
                <span class="d-flex align-items-center"
                  ><img src="@assets/img/arrange-circle-2.png" alt="" /> Tương
                  ứng: {{ amountUsd | formatPrice }} USD</span
                >
                <span class="ml-18 d-flex align-items-center">
                  <img src="@assets/img/dollar-circle.png" alt="" />
                  Tỷ giá: {{ moneyText }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { FETCH_TRANSACTION, CREATE_TOPUP, UPDATE_TOPUP } from '../store/index'
import mixinRoute from '@core/mixins/route'
import mixinTable from '@core/mixins/table'
import { USD_TO_VND, BANK, BRANCH, NAME, ACCOUNT_NUMBER } from '../constants'

export default {
  name: 'Wallet',
  mixins: [mixinRoute, mixinTable],

  computed: {
    ...mapState('bill', {
      topup: (state) => state.topup,
      balance: (state) => state.balance,
      process_money: (state) => state.process_money,
    }),
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
      moneyText: '',
      amount: '',
      amountUsd: '',
    }
  },

  created() {
    this.init()
    this.moneyText = (this.usdToVnd / 1000).toString().replace('.', ',')
  },

  methods: {
    ...mapActions('bill', [FETCH_TRANSACTION, CREATE_TOPUP, UPDATE_TOPUP]),

    async init() {
      this.handleUpdateRouteQuery()
      await Promise.all([
        this[FETCH_TRANSACTION](this.filter),
        this.createTopup(),
      ])
    },

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

    async handlerRecharge() {
      this.loading = true
      this.checkValidMoney()
      if (this.error == true) {
        this.loading = false
        return
      }
      let params = {
        id: this.topup.id,
        body: { amount: +this.amount.replaceAll(',', '') },
      }

      const result = await this.updateTopup(params)
      this.loading = false
      if (!result || !result.success) {
        this.$toast.open({
          type: 'error',
          message: result.message,
          duration: 4000,
        })
        return
      }

      this.$toast.open({
        type: 'success',
        message: 'Yêu cầu của bạn đang được xử lý',
        duration: 3000,
      })
      location.reload()
    },

    checkValidMoney() {
      this.amount = document.getElementById('money').value
      if (!/^[0-9,]+$/.test(this.amount)) {
        this.error = true
        this.errorText = 'Số tiền không hợp lệ!'
        return
      }
      if (this.amount == '') {
        this.error = true
        this.errorText = 'Số tiền không được để trống!'
        return
      }

      document.getElementById('money').value = document
        .getElementById('money')
        .value.replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')

      this.amountUsd =
        Math.floor((this.amount.replaceAll(',', '') / this.usdToVnd) * 100) /
        100

      this.error = false
      this.errorText = ''
    },
  },
}
</script>
