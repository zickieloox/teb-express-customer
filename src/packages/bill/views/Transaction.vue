<template>
  <div>
    <div class="page-content">
      <div class="page-body">
        <div class="transaction-log">
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
                      v-if="item.type === typeRefund"
                      :src="require('@assets/img/rotate-left.svg')"
                      alt=""
                    />
                    <img
                      v-else
                      :src="
                        item.type === typeTopup ||
                        item.type === typePayoneer ||
                        item.type === typePingPong
                          ? require('@assets/img/in.svg')
                          : require('@assets/img/out.svg')
                      "
                      alt=""
                    />
                    <div class="infor">
                      <span
                        class="transaction-title"
                        v-if="
                          item.type == typeTopup ||
                            item.type === typePayoneer ||
                            item.type === typePingPong
                        "
                        >Nạp tiền vào ví</span
                      >
                      <span class="transaction-title" v-else
                        >{{
                          item.type == typeRefund || item.type == typeAffiliate
                            ? 'Hoàn tiền cho hóa đơn'
                            : 'Thanh toán hóa đơn'
                        }}
                        <router-link
                          class="text-no-underline"
                          v-if="item.bill"
                          :to="{
                            name: 'bill-detail',
                            params: { code: item.bill.code },
                          }"
                        >
                          {{ item.bill.code }}
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
                    <span
                      style="display: block;height: 22px"
                      v-if="
                        item.type === typePayoneer || item.type === typePingPong
                      "
                    >
                      + {{ Math.abs(item.amount) | formatPrice }}
                    </span>
                    <span v-else
                      >{{ item.type == typePay ? '-' : '+' }}
                      {{ Math.abs(item.amount) | formatPrice }}</span
                    >
                    <span v-status="item.status" type="transaction"></span>
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
  TransactionLogTypePayoneer,
  TransactionLogTypePingPong,
  TransactionLogAffiliate,
  TRANSACTION_STATUS,
} from '../constants'

export default {
  name: 'Transaction',
  mixins: [mixinRoute, mixinTable],
  components: {
    EmptySearchResult,
    SearchType,
  },
  computed: {
    ...mapState('bill', {
      balance: (state) => state.balance,
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
      typePingPong: TransactionLogTypePingPong,
      typePayoneer: TransactionLogTypePayoneer,
      typePay: TransactionLogTypePay,
      typeRefund: TransactionLogTypeRefund,
      typeAffiliate: TransactionLogAffiliate,
      label: 'Tìm theo ngày',
      transactionStatus: TRANSACTION_STATUS,
    }
  },
  created() {
    this.filter = this.getRouteQuery()
    this.init()
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
    'filter.page': function() {
      this.init()
    },
    'filter.limit': function() {
      this.filter.page = 1
      this.init()
    },
    'filter.start_date': function() {
      this.filter.page = 1
      this.init()
    },
    'filter.end_date': function() {
      this.filter.page = 1
      this.init()
    },
    'filter.type': function() {
      this.filter.page = 1
      this.init()
    },
  },
}
</script>
