<template>
  <div class="pages wallet top-up">
    <div class="page-content">
      <div class="page-header">
        <div class="container">
          <div class="page-header_title header">Hóa đơn</div>
          <div class="navtab-link">
            <ul class="nav nav-tabs nav-tabs-line">
              <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'wallet' }"
                  >Ví của tôi</router-link
                >
              </li>
              <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'bill' }">
                  Quản lý hóa đơn
                </router-link>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="#">Nạp tiền</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="page-body">
        <div class="container">
          <div class="row info-money mb-24">
            <div class="col-7">
              <div class="box balance">
                <img src="@assets/img/balance.png" alt="" />
                <div class="wallet">
                  <p class="title">Số dư trong ví</p>
                  <p class="money">{{
                    balance > 0 ? balance : 0 | formatPrice
                  }}</p>
                </div>
              </div>
            </div>
            <div class="col-5">
              <div class="box process-money">
                <img src="@assets/img/process-money.png" alt="" />
                <div class="wallet">
                  <p class="title">Tiền chưa thanh toán</p>
                  <p class="money">
                    {{ balance > 0 ? 0 : Math.abs(balance) | formatPrice }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex jc-sb">
            <div class="method">
              <div class="active"
                ><i class="fa fa-circle"></i> Chuyển khoản</div
              >
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
              <span class="title">
                Vui lòng chuyển tiền tới số tài khoản dưới đây theo nội dung
                sau:
              </span>
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
                <p>
                  Nội dung chuyển khoản:<br />
                  <span>Nạp topup {{ topup.id }}</span>
                  <copy :value="`Nạp topup ${topup.id}`"></copy>
                </p>
                <div class="money">
                  <label class="title d-flex justify-content-between">
                    <span>Nhập số tiền:</span>
                    <span
                      >Tỷ giá chuyển đổi: <i>{{ currencyRate }}</i></span
                    >
                  </label>
                  <div class="input">
                    <input
                      id="money"
                      @input="onChangeAmount"
                      placeholder="Nhập số tiền"
                      :value="amount"
                    />
                    <span>USD</span>
                  </div>
                  <div class="invalid-error" v-if="error == true">
                    {{ errorText }}
                  </div>
                </div>
                <div class="money">
                  <label class="title">Số tiền tương ứng:</label>
                  <div class="d-flex">
                    <div class="w-price">
                      <span class="price">{{ amountVND }}</span>
                      <copy :value="amountVND" v-if="amountVND"></copy>
                      <span class="currency">VND</span>
                    </div>
                  </div>
                </div>
                <p>
                  <p-button @click.prevent="handlerRecharge" :loading="loading">
                    Chuyển Tiền
                  </p-button>
                </p>
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
import { formatNumber } from '@core/utils/formatter'
import Copy from '../components/Copy.vue'

export default {
  name: 'Wallet',
  mixins: [mixinRoute, mixinTable],
  components: { Copy },
  computed: {
    ...mapState('bill', {
      topup: (state) => state.topup,
      balance: (state) => state.balance,
    }),

    amountVND() {
      if (!this.amount) return ''
      const amount = parseFloat(('' + this.amount).replace(',', ''))
      return formatNumber(Math.ceil((amount * 1000 * USD_TO_VND) / 1000))
    },
    currencyRate() {
      return formatNumber(USD_TO_VND)
    },
  },
  data() {
    return {
      loading: false,
      bank: BANK,
      branch: BRANCH,
      name: NAME,
      accountNumber: ACCOUNT_NUMBER,
      error: false,
      errorText: '',
      moneyText: '',
      amount: '',
    }
  },
  created() {
    this.init()
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

    async handlerRecharge() {
      if (this.loading) return

      this.checkValidAmount()
      if (this.error) return

      this.loading = true

      const amount = Math.ceil(
        (parseFloat(('' + this.amount).replace(',', '')) * 100 * USD_TO_VND) /
          100
      )
      let params = {
        id: this.topup.id,
        body: { amount },
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

      this.init()
      this.error = false
      this.errorText = ''
      this.moneyText = ''
      this.amount = ''
    },

    onChangeAmount(e) {
      this.amount = 0
      let value = e.target.value.trim()

      value = value.replace(/,/g, '').replace(/^0+/, '')
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      this.amount = value

      this.checkValidAmount()
    },

    checkValidAmount() {
      if (this.amount == '') {
        this.error = true
        this.errorText = 'Số tiền không được để trống!'
        return
      }

      if (!/^[0-9.,]+$/.test(this.amount)) {
        this.error = true
        this.errorText = 'Số tiền không hợp lệ!'
        return
      }

      this.error = false
      this.errorText = ''
    },
  },
}
</script>
