<template>
  <div class="wallet pages">
    <div class="page-content">
      <div class="page-header">
        <div class="page-header_title header">Ví</div>
        <div class="page-header_title header-2">Lịch sử phát sinh</div>
      </div>
      <div class="page-body">
        <div class="transaction-log">
          <div class="search">
            <div class="multiselect-transaction">
              <search-type
                class="search-type"
                @selected="handleSearchTypeTransaction"
                @unselected="handleRemoveSearch"
                :optionSearch="transactionStatus"
                :placeHolder="'Loại'"
                :type="filter.type"
              />
            </div>
            <div class="select-date d-flex">
              <p-datepicker
                class="p-input-group input-group"
                :format="'dd/mm/yyyy'"
                :label="label"
                id="date-search"
                :value="{
                  startDate: this.filter.start_date,
                  endDate: this.filter.end_date,
                }"
                @update="selectDate"
              >
              </p-datepicker>
              <p-button
                class="close ml-2"
                type="default"
                icon="close"
                v-if="filter.start_date && filter.end_date"
                @click="clearDate"
              />
            </div>
          </div>
          <div class="content">
            <vcl-table class="md-20" v-if="isFetching"></vcl-table>
            <template v-else-if="transactions.length">
              <div v-for="(item, i) in transactions" :key="i">
                <div class="card">
                  <div class="card-left">
                    <img
                      :src="
                        item.type == typeTopup || item.type == typeRefund
                          ? require('@assets/img/in.svg')
                          : require('@assets/img/out.svg')
                      "
                      alt=""
                    />
                    <div class="infor">
                      <span
                        class="transaction-title"
                        v-if="item.type == typeTopup"
                        >Nạp tiền vào ví</span
                      >
                      <span
                        class="transaction-title"
                        v-else-if="item.type == typeRefund"
                        >Hoàn tiền cho hóa đơn
                        <router-link
                          class="text-no-underline"
                          :to="{
                            name: 'list-bill',
                            query: {
                              search: item.bill_id,
                              date_search: '',
                            },
                          }"
                        >
                          #{{ item.bill_id }}
                        </router-link>
                      </span>
                      <span class="transaction-title" v-else
                        >Thanh toán hóa đơn
                        <router-link
                          class="text-no-underline"
                          :to="{
                            name: 'list-bill',
                            query: {
                              search: item.bill_id,
                              date_search: '',
                            },
                          }"
                        >
                          #{{ item.bill_id }}
                        </router-link>
                      </span>
                      <span
                        >{{ formatWeekday(item.created_at) }},
                        {{ item.created_at | date('dd/MM/yyyy') }} -
                        {{ item.created_at | datetime('HH:mm') }}</span
                      >
                    </div>
                  </div>
                  <div class="card-right">
                    <span v-if="item.amount < 0"
                      >- {{ Math.abs(item.amount) | formatPrice }}</span
                    >
                    <span v-else
                      >{{ item.type == typePay ? '-' : '+' }}
                      {{ item.amount | formatPrice }}</span
                    >
                    <span v-status:status="mapStatus[item.status].value"></span>
                  </div>
                </div>
              </div>
              <div
                class="d-flex justify-content-between align-items-center mt-24"
                v-if="count > 0"
              >
                <p-pagination
                  :total="count"
                  :perPage.sync="filter.limit"
                  :current.sync="filter.page"
                  size="sm"
                ></p-pagination>
              </div>
            </template>
            <empty-search-result v-else></empty-search-result>
          </div>
        </div>
        <div class="info-money d-flex">
          <div class="card">
            <div class="wallet">
              <span>Ví của tôi</span>
              <span class="money">{{
                balance > 0 ? balance : 0 | formatPrice
              }}</span>
              <p-button
                href="#"
                class="btn btn-primary"
                @click.prevent="visibleModalRechargeWallet"
                :loading="isLoading"
              >
                <i class="fa fa-chevron-circle-right"></i>
                Nạp tiền
              </p-button>
            </div>
          </div>
          <div class="card d-flex">
            <img src="@assets/img/unpaid_money.svg" alt="" />
            <div class="wallet">
              <span class="title">Tiền chưa thanh toán</span>
              <span class="money">{{
                balance > 0 ? 0 : Math.abs(balance) | formatPrice
              }}</span>
            </div>
          </div>
          <div class="card d-flex">
            <img src="@assets/img/process_money.svg" alt="" />
            <div class="wallet">
              <span class="title">Tiền đang xử lý</span>
              <span class="money">{{ process_money | formatPrice }}</span>
            </div>
          </div>
        </div>
      </div>
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
import mixinTable from '@core/mixins/table'
import EmptySearchResult from '@components/shared/EmptySearchResult'
import SearchType from '../components/SearchType.vue'
import { date } from '@core/utils/datetime'

import {
  TransactionLogTypeTopup,
  TransactionLogTypePay,
  TransactionLogTypeRefund,
  MAP_NAME_STATUS_TRANSACTION,
  TRANSACTION_STATUS,
} from '../constant'

export default {
  name: 'Wallet',
  mixins: [mixinRoute, mixinTable],
  components: {
    ModalRechargeWallet,
    EmptySearchResult,
    SearchType,
  },
  computed: {
    ...mapState('wallet', {
      topup: (state) => state.topup,
      balance: (state) => state.balance,
      process_money: (state) => state.process_money,
      transactions: (state) => state.transactions,
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
      isFetching: true,
      typeTopup: TransactionLogTypeTopup,
      typePay: TransactionLogTypePay,
      typeRefund: TransactionLogTypeRefund,
      label: 'Tìm theo ngày',
      mapStatus: MAP_NAME_STATUS_TRANSACTION,
      transactionStatus: TRANSACTION_STATUS,
    }
  },

  mounted() {
    this.filter = this.getRouteQuery()
  },

  methods: {
    ...mapActions('wallet', [CREATE_TOPUP, UPDATE_TOPUP, FETCH_TRANSACTION]),

    async init() {
      this.isFetching = true
      this.handleUpdateRouteQuery()
      this.result = await this[FETCH_TRANSACTION](this.filter)
      this.isFetching = false
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

      await this.init()
    },

    selectDate(v) {
      this.filter.start_date = date(v.startDate, 'yyyy-MM-dd')
      this.filter.end_date = date(v.endDate, 'yyyy-MM-dd')
    },

    clearDate() {
      this.filter.end_date = ''
      this.filter.start_date = ''
      this.filter.page = 1
    },

    formatWeekday(day) {
      var weekday = [
        'Chủ nhật',
        'Thứ hai',
        'Thứ ba',
        'Thứ tư',
        'Thứ năm',
        'Thứ sáu',
        'Thứ bảy',
      ]
      return weekday[new Date(day).getDay()]
    },

    handleSearchTypeTransaction(type) {
      this.filter.type = type
    },

    handleRemoveSearch() {
      this.filter.type = ''
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
