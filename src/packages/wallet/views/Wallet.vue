<template>
  <div class="wallet pages">
    <div class="page-content">
      <p-button
        href="#"
        class="btn btn-primary"
        @click.prevent="visibleModalRechargeWallet"
        :loading="isLoading"
      >
        Nạp tiền
      </p-button>
    </div>
    <modal-recharge-wallet
      :visible.sync="isvisibleModalRechargeWallet"
      :id="topup.id"
      @recharge="recharge"
      @close="closeModal"
    >
    </modal-recharge-wallet>
  </div>
</template>

<script>
import ModalRechargeWallet from '../components/ModalRechargeWallet'
import { mapState, mapActions } from 'vuex'
import { CREATE_TOPUP, UPDATE_TOPUP, FETCH_TRANSACTION } from '../store/index'
import mixinRoute from '@core/mixins/route'

export default {
  name: 'Wallet',
  mixins: [mixinRoute],

  components: {
    ModalRechargeWallet,
  },
  computed: {
    ...mapState('wallet', {
      topup: (state) => state.topup,
      balance: (state) => state.balance,
      unpaid_money: (state) => state.unpaid_money,
      process_money: (state) => state.process_money,
      transaction_logs: (state) => state.transaction_logs,
      count: (state) => state.count,
    }),
  },
  data() {
    return {
      isvisibleModalRechargeWallet: false,
      isLoading: false,
      filter: {
        limit: 10,
        start_date: '',
        end_date: '',
        type: '',
      },
    }
  },

  created() {
    this.filter = this.getRouteQuery()
  },

  methods: {
    ...mapActions('wallet', [CREATE_TOPUP, UPDATE_TOPUP, FETCH_TRANSACTION]),

    async init() {
      // this.isFetching = true
      this.handleUpdateRouteQuery()
      this.result = await this[FETCH_TRANSACTION](this.filter)
      // this.isFetching = false
    },

    async visibleModalRechargeWallet() {
      this.isLoading = true
      const result = await this.createTopup()
      if (!result || !result.success) {
        this.$toast.open({
          type: 'error',
          message: result.message,
          duration: 4000,
        })
        return
      }

      this.isvisibleModalRechargeWallet = true
      this.isLoading = false
    },

    async recharge(amount) {
      let params = {
        id: this.topup.id,
        body: { amount: +amount },
      }

      const result = await this.updateTopup(params)
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
    },

    closeModal() {
      this.isvisibleModalRechargeWallet = false
    },
  },

  watch: {
    filter: {
      handler: function() {
        this.init()
      },
      deep: true,
    },
  },
}
</script>
