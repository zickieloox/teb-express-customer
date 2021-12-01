<template>
  <div class="pages wallet top-up">
    <div class="page-content">
      <div class="page-header">
        <div class="page-header__title">Nạp tiền</div>
        <div class="page-header__action">
          <router-link
            :to="{ name: 'wallet' }"
            class="page-header__wallet btn btn-lb-default"
          >
            <inline-svg
              :src="require('../../../assets/img/rotate.svg')"
            ></inline-svg>
            Lịch sử giao dịch</router-link
          >

          <router-link
            :to="{ name: 'bill' }"
            class="page-header__wallet btn btn-lb-default ml-2"
          >
            <inline-svg
              :src="require('../../../assets/img/receipt.svg')"
            ></inline-svg>
            Quản lý hóa đơn</router-link
          >
        </div>
      </div>
      <div class="page-body">
        <div class="container">
          <div class="row info-money mb-24">
            <div class="col-7">
              <div class="box balance">
                <img src="@assets/img/walletLg.svg" alt="wallet" />
                <div class="wallet ml-24">
                  <p class="title">Số dư trong ví</p>
                  <p class="money">{{
                    balance > 0 ? balance : 0 | formatPrice
                  }}</p>
                </div>
              </div>
            </div>
            <div class="col-5">
              <div class="box process-money">
                <img src="@assets/img/time.svg" alt="process-money" />
                <div class="wallet ml-24">
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
              <a
                href="javascript:void(0)"
                @click="setMethod(topupType)"
                :class="{ deactive: !isTopup, active: isTopup }"
                ><i class="fa fa-circle"></i>Chuyển khoản</a
              >
              <a
                href="javascript:void(0)"
                @click="setMethod(payoneerType)"
                :class="{ deactive: !isPayoneer, active: isPayoneer }"
                ><i class="fa fa-circle"></i>Payoneer</a
              >
              <a
                href="javascript:void(0)"
                @click="setMethod(pingPongType)"
                :class="{ deactive: !isPingPong, active: isPingPong }"
                ><i class="fa fa-circle"></i>PingPong</a
              >
            </div>
            <div class="form-topup" :class="{ hidden: !isTopup }">
              <span class="title">
                Vui lòng chuyển tiền tới số tài khoản dưới đây theo nội dung
                sau:
              </span>
              <div class="card">
                <div class="card-info">
                  <p
                    >Ngân hàng:<br /><span>{{ bank }}</span>
                  </p>
                  <p
                    >Tên chủ thẻ:<br /><span>{{ name }}</span>
                    <copy :value="name"></copy
                  ></p>
                  <p
                    >Số tài khoản:<br /><span>{{ accountNumber }}</span>
                    <copy :value="accountNumber"></copy>
                  </p>
                  <p>
                    Nội dung chuyển khoản:<br />
                    <span>Topup {{ topup.id }}</span>
                    <copy :value="`Topup ${topup.id}`"></copy>
                  </p>
                </div>

                <div class="swap_money">
                  <div class="money">
                    <label class="title d-flex justify-content-between">
                      <span>Nhập số tiền:</span>
                    </label>
                    <div class="input">
                      <input
                        id="money"
                        @input="onChangeAmount"
                        placeholder="Nhập số tiền"
                        :value="amount"
                      />
                      <span>{{ US_FLAG.name }}</span>
                      <img :src="US_FLAG.icon" alt="flag" class="flag" />
                    </div>
                  </div>
                  <div @click="swapHandle" class="btn-convert">
                    <img src="@assets/img/convert.svg" alt="" />
                  </div>
                  <div class="money">
                    <label class="title">Số tiền tương ứng:</label>
                    <div class="d-flex">
                      <div class="w-price">
                        <span class="price">{{ amountVND }}</span>
                        <copy :value="amountVND" v-if="amountVND"></copy>
                        <span class="currency">{{ VN_FLAG.name }}</span>
                        <img :src="VN_FLAG.icon" alt="flag" class="flag" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="invalid-error" v-if="error == true">
                  {{ errorText }}
                </div>
                <div class="mt-24  btn-exchange">
                  <p-button @click.prevent="handlerRecharge" :loading="loading">
                    Xác nhận
                  </p-button>
                  <div class="info_exchange">
                    <div class="rate_exchange"
                      >Tỷ giá chuyển đổi: 1 USD = {{ currencyRate }} VND</div
                    >
                    <div class="rate_exchange_updated"
                      >Cập nhật lúc
                      {{ updatedAt | datetime('dd/MM/yyyy HH:mm:ss') }}</div
                    >
                  </div>
                </div>
              </div>
            </div>
            <div
              class="form-topup"
              :class="{ hidden: !isPayoneer && !isPingPong }"
            >
              <div class="form-title">
                <p
                  ><span
                    >Vui lòng chuyển tiền tới địa chỉ:
                    <strong v-if="isPayoneer">tungpk.izee@gmail.com</strong>
                    <strong v-if="isPingPong">tungpk@lionnix.com</strong>
                  </span></p
                >
                <p>
                  <span
                    >Copy Transaction ID rồi nhập vào ô phía dưới.<br />
                    Nhấn nút <strong>Xác nhận</strong> để nạp topup.</span
                  ></p
                >
              </div>
              <div class="form-body">
                <p class="mb-8">Transaction ID:</p>
                <div class="input-trans ">
                  <p>
                    <input
                      type="text"
                      class="form-control"
                      v-model="transactionID"
                      placeholder="Nhập Transaction ID"
                    />
                  </p>
                </div>
                <div class="accept d-flex ">
                  <p-button
                    type="primary"
                    @click="handlerCreateTransaction"
                    :loading="loading"
                  >
                    Xác nhận
                  </p-button>
                  <div class="note">
                    <i>
                      Thời gian xử lý khoảng 15 phút. Nếu tiền không được chuyển
                      vào topup sau thời gian này, vui lòng liên hệ bộ phận
                      support của LionBay để được hỗ trợ.</i
                    >
                  </div>
                </div>
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
import {
  FETCH_TRANSACTION,
  CREATE_TOPUP,
  UPDATE_TOPUP,
  CREATE_TRANSACTION,
  FETCH_RATE_EXCHANGE,
} from '../store/index'
import mixinRoute from '@core/mixins/route'
import mixinTable from '@core/mixins/table'
import {
  BANK,
  NAME,
  ACCOUNT_NUMBER,
  TransactionLogTypeTopup,
  TransactionLogTypePayoneer,
  TransactionLogTypePingPong,
} from '../constants'
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
      // USDTOVND: (state) => state.rateExchange,
      // updatedAt: (state) => state.updated_at,
    }),

    amountVND() {
      if (!this.amount || this.error) return ''
      const amount = +this.amount.replaceAll(',', '')
      if (this.toUSD) {
        return amount / this.USDTOVND
      }
      return formatNumber(Math.round(amount * this.USDTOVND))
    },
    currencyRate() {
      return formatNumber(this.USDTOVND)
    },
    isTopup() {
      return this.method === TransactionLogTypeTopup
    },
    isPayoneer() {
      return this.method === TransactionLogTypePayoneer
    },
    isPingPong() {
      return this.method === TransactionLogTypePingPong
    },
    topupType() {
      return TransactionLogTypeTopup
    },
    payoneerType() {
      return TransactionLogTypePayoneer
    },
    pingPongType() {
      return TransactionLogTypePingPong
    },
  },
  data() {
    return {
      loading: false,
      bank: BANK,
      name: NAME,
      accountNumber: ACCOUNT_NUMBER,
      error: false,
      errorText: '',
      moneyText: '',
      amount: '',
      method: TransactionLogTypeTopup,
      transactionID: '',
      VN_FLAG: { name: 'VND', icon: require('@assets/img/vn.svg') },
      US_FLAG: { name: 'USD', icon: require('@assets/img/us.svg') },
      toUSD: false,
      USDTOVND: 0,
      updatedAt: '',
    }
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions('bill', [
      FETCH_TRANSACTION,
      CREATE_TOPUP,
      UPDATE_TOPUP,
      CREATE_TRANSACTION,
      FETCH_RATE_EXCHANGE,
    ]),

    async init() {
      this.handleUpdateRouteQuery()
      const [transaction, exchange] = await Promise.all([
        this[FETCH_TRANSACTION](this.filter),
        this[FETCH_RATE_EXCHANGE](),
        this.createTopup(),
      ])
      if (!exchange || !exchange.success || !transaction) {
        this.$toast.open({
          type: 'error',
          message: 'Something went wrong',
          duration: 4000,
        })
        return
      }
      this.USDTOVND = exchange.usdtovnd
      this.updatedAt = exchange.updated_at
    },
    swapHandle() {
      let temp = this.VN_FLAG
      this.VN_FLAG = this.US_FLAG
      this.US_FLAG = temp
      this.toUSD = !this.toUSD
    },
    async handlerRecharge() {
      let amount = +this.amount.replaceAll(',', '')
      if (this.loading) return

      this.checkValidAmount()
      if (this.error) return

      if (this.toUSD) {
        const rate = await this[FETCH_RATE_EXCHANGE]()
        if (!rate || !rate.success) {
          this.$toast.open({
            type: 'error',
            message: 'Something went wrong',
            duration: 4000,
          })
          return
        }
        this.USDTOVND = rate.usdtovnd
        amount = amount / +this.USDTOVND
      }
      if (amount < 1) {
        this.errorText = 'Số tiền nhập tối thiểu 1$!'
        this.error = true
        return
      }
      let params = {
        id: this.topup.id,
        body: { amount },
      }
      this.loading = true
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

      if (this.toUSD) {
        value = value.replace(/[.|,]/g, '').replace(/^0+/, '')
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }
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
    setMethod(type) {
      this.method = type
    },

    async handlerCreateTransaction() {
      if (this.loading) return

      this.loading = true
      let payload = {
        type: this.method,
        transaction_id: this.transactionID,
      }
      const result = await this[CREATE_TRANSACTION](payload)
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

      this.$set(this, 'transactionID', '')
    },
  },
}
</script>
