<template>
  <div class="wallet pages">
    <div class="page-content">
      <div class="page-header">
        <div class="page-header_title header">Hóa đơn</div>
        <div class="navtab-link">
          <ul class="nav nav-tabs nav-tabs-line">
            <li class="nav-item">
              <a class="nav-link active" href="#">Ví của tôi</a>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'list-bills' }">
                Quản lý hóa đơn
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'top-up' }"
                >Nạp tiền</router-link
              >
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
        <div class="transaction-log">
          <div class="title">Lịch sử giao dịch</div>
          <div class="search">
            <div class="multiselect-transaction">
              <search-type
                class="search-type"
                @selected="handleSearchTypeTransaction"
                @unselected="handleRemoveSearch"
                :optionSearch="transactionStatus"
                :placeHolder="'Chọn loại giao dịch'"
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
              <div
                class="transaction-info"
                v-for="(item, i) in transactions"
                :key="i"
              >
                <div class="d-flex jc-sb">
                  <div class="info-left">
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
                      <span class="transaction-title" v-else
                        >{{
                          item.type == typeRefund
                            ? 'Hoàn tiền cho hóa đơn'
                            : 'Thanh toán hóa đơn'
                        }}
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
                  <div class="info-right">
                    <span> {{ item.amount | formatPrice }}</span>
                    <span v-status:status="mapStatus[item.status].value"></span>
                  </div>
                </div>
              </div>
            </template>
            <empty-search-result v-else></empty-search-result>
          </div>
        </div>
        <div
          class="
            paginate
            d-flex
            justify-content-between
            align-items-center
            mt-24
          "
          v-if="count > 0"
        >
          <p-pagination
            :total="count"
            :perPage.sync="filter.limit"
            :current.sync="filter.page"
            size="sm"
          ></p-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { FETCH_TRANSACTION } from '../store/index'
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
} from '../constants'

export default {
  name: 'Wallet',
  mixins: [mixinRoute, mixinTable],
  components: {
    EmptySearchResult,
    SearchType,
  },
  computed: {
    ...mapState('bill', {
      balance: (state) => state.balance,
      process_money: (state) => state.process_money,
      transactions: (state) => state.transactions,
      count: (state) => state.count,
    }),
  },
  data() {
    return {
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

  created() {
    this.filter = this.getRouteQuery()
  },

  methods: {
    ...mapActions('bill', [FETCH_TRANSACTION]),

    async init() {
      this.isFetching = true
      this.handleUpdateRouteQuery()
      this.result = await this[FETCH_TRANSACTION](this.filter)
      this.isFetching = false
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
