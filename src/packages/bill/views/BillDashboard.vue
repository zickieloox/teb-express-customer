<template>
  <div class="pages wallet top-up bill-dashboard">
    <div class="page-content">
      <div class="page-header">
        <div class="container">
          <div class="row info-money">
            <div class="col-7">
              <div class="box balance">
                <img src="@assets/img/walletLg.svg" alt="wallet" />
                <div class=" ml-24">
                  <p class="title">Số dư trong ví</p>
                  <p class="money">{{ balance | formatPrice }}</p>
                </div>
              </div>
            </div>
            <div class="col-5">
              <div class="box process-money">
                <img src="@assets/img/time.svg" alt="process-money" />
                <div class=" ml-24">
                  <p class="title">Tiền chưa thanh toán</p>
                  <p class="money">{{ debit | formatPrice }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="page-body">
        <div class="container">
          <div class="tab">
            <a
              href="javascript:void(0)"
              @click="setPage('topup')"
              :class="{ deactive: !isTopup, active: isTopup }"
              >Nạp tiền</a
            >
            <a
              href="javascript:void(0)"
              @click="setPage('bill')"
              :class="{ deactive: !isBill, active: isBill }"
              >Quản lý hóa đơn</a
            >
            <a
              href="javascript:void(0)"
              @click="setPage('transaction')"
              :class="{ deactive: !isTransaction, active: isTransaction }"
              >Lịch sử giao dịch</a
            >
          </div>
          <wallet v-if="isTopup"></wallet>
          <list-bills v-if="isBill"></list-bills>
          <transaction v-if="isTransaction"></transaction>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { GET_USER } from '../../shared/store'
import Wallet from './Topup.vue'
import ListBills from './ListBills.vue'
import Transaction from './Transaction.vue'

export default {
  name: 'BillDashboard',
  props: ['topup'],
  components: { Wallet, ListBills, Transaction },
  computed: {
    ...mapState('shared', {
      user: (state) => state.user,
    }),
    balance() {
      return this.user.balance > 0 ? this.user.balance : 0
    },
    debit() {
      return this.user.balance < 0 ? Math.abs(this.user.balance) : 0
    },
    isTopup() {
      return this.page === 'topup'
    },
    isBill() {
      return this.page === 'bill'
    },
    isTransaction() {
      return this.page === 'transaction'
    },
  },
  data() {
    return {
      page: 'bill',
    }
  },
  created() {
    this.init()
  },
  mounted() {
    if (this.topup) {
      this.page = 'topup'
    }
  },
  methods: {
    ...mapActions('shared', [GET_USER]),

    async init() {
      const user = await this[GET_USER]()

      if (user.error) {
        this.$toast.error('Something went wrong', { duration: 4000 })
        return
      }
    },
    setPage(page) {
      this.page = page
    },
  },
}
</script>
