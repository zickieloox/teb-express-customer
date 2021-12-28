<template>
  <div class="wallet pages">
    <div class="page-header">
      <div class="page-header__title">Quản lý hóa đơn</div>
      <router-link
        :to="{ name: 'top-up' }"
        class="page-header__wallet btn btn-lb-default"
      >
        <inline-svg
          :src="require('../../../assets/img/wallet-icon.svg')"
        ></inline-svg>
        Ví của tôi</router-link
      >
    </div>
    <div class="page-content">
      <div class="page-body-bill">
        <div class="list__bills">
          <div class="page-header_action d-flex ">
            <div class="page-header_input ">
              <p-input
                placeholder="Tìm theo mã tracking hoặc mã hóa đơn"
                prefixIcon="search"
                class="mb-2"
                type="search"
                clearable
                :value.sync="filter.search"
                @keyup.enter="handleSearch"
              >
              </p-input>
            </div>
            <div class="page-header_date ml-7 d-flex">
              <p-datepicker
                :format="'dd/mm/yyyy'"
                class="p-input-group input-group"
                :label="labelDate"
                id="date-search"
                @update="selectDate"
                :singleDatePicker="false"
                @clear="clearDate"
                :value="{
                  startDate: filter.start_date,
                  endDate: filter.end_date,
                }"
              ></p-datepicker>
            </div>
          </div>
          <div class="page-content">
            <vcl-table class="md-20" v-if="isFetching"></vcl-table>
            <template v-else-if="bills.length">
              <div class="table-responsive">
                <table class="table table-hover">
                  <thead>
                    <tr class="table-header">
                      <th style="width: 25%">MÃ HÓA ĐƠN </th>
                      <th style="width: 35%">NGÀY TẠO </th>
                      <th style="width: 25%">LOẠI HÓA ĐƠN </th>
                      <th style="text-align: right">TỔNG TIỀN </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="(item, i) in bills" :key="i">
                      <td>
                        <router-link
                          class="text-no-underline"
                          :to="{
                            name: 'bill-detail',
                            query: {
                              search: item.code,
                              date_search: '',
                            },
                          }"
                        >
                          {{ item.code }}
                        </router-link>
                      </td>
                      <td>{{ item.created_at | datetime('dd/MM/yyyy') }}</td>
                      <td>
                        <span v-status:status="handleStatus(item)"></span>
                      </td>
                      <td
                        style="text-align: right"
                        v-if="total(item.shipping_fee, item.extra_fee) < 0"
                      >
                        -{{
                          Math.abs(total(item.shipping_fee, item.extra_fee))
                            | formatPrice
                        }}
                      </td>
                      <td style="text-align: right" v-else>
                        {{
                          total(item.shipping_fee, item.extra_fee) | formatPrice
                        }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </template>
            <empty-search-result v-else></empty-search-result>
          </div>
        </div>
        <div
          class="paginate-bill d-flex justify-content-between align-items-center mt-24"
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
import mixinRoute from '@core/mixins/route'
import mixinTable from '@core/mixins/table'
import EmptySearchResult from '@components/shared/EmptySearchResult'
import { date, dateFormat } from '@core/utils/datetime'
import { FETCH_BILL_LIST } from '../store'

export default {
  name: 'ListBills',
  mixins: [mixinRoute, mixinTable],
  components: {
    EmptySearchResult,
  },
  computed: {
    ...mapState('bill', {
      count: (state) => state.countBills,
      bills: (state) => state.bills,
    }),
  },
  data() {
    return {
      isLoading: false,
      filter: {
        limit: 25,
        start_date: '',
        end_date: '',
        search: '',
      },
      labelDate: `Tìm theo ngày`,
      isFetching: true,
    }
  },

  created() {
    this.filter = this.getRouteQuery()
  },
  methods: {
    ...mapActions('bill', [FETCH_BILL_LIST]),

    async init() {
      this.isFetching = true
      this.handleUpdateRouteQuery()
      let result = await this[FETCH_BILL_LIST](this.filter)
      if (!result.success) {
        this.$toast.open({
          type: 'error',
          message: result.message,
          duration: 4000,
        })
      }
      this.isFetching = false
    },
    total(ship, extra) {
      let total = ship + extra
      return total
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

    handleSearch(e) {
      this.filter.page = 1
      this.$set(this.filter, 'search', e.target.value.trim())
    },
    handleStatus(item) {
      let today = dateFormat(new Date())
      let itemDay = dateFormat(item.created_at)
      if (today == itemDay) {
        return 'Tạo mới'
      } else {
        if (this.total(item.shipping_fee, item.extra_fee) > 0) {
          return 'Thanh toán'
        } else {
          return 'Hoàn trả'
        }
      }
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
<style scoped>
.close {
  width: 50px;
  height: 40px;
  border: 1px solid #ccc !important;
  border-radius: 8px;
}
</style>
