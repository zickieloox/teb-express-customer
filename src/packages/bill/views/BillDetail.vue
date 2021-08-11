<template>
  <div class="wallet pages">
    <div class="page-content">
      <div class="page-header">
        <div class="page-header_title header">Hóa đơn</div>
        <div class="navtab-link">
          <ul class="nav nav-tabs nav-tabs-line">
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'wallet' }">
                Ví của tôi
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" :to="{ name: 'bill' }">
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
      </div>
      <div class="page-body">
        <div class=" list__bill">
          <div class="container p-0">
            <vcl-table class=" md-20" v-if="isFetching"></vcl-table>
            <template v-else-if="bill">
              <div class="page-content">
                <div v-if="bill" class="header_info d-flex mb-16 ">
                  <div class="header_info-content">
                    <div class="info-bill">Mã hóa đơn : </div>
                    <div class="info-bill">Ngày tạo: </div>
                    <div class="info-bill">Tồng hóa đơn : </div>
                    <span class="info-number">{{ bill.id }}</span>
                    <span class="info-number">{{
                      bill.created_at | datetime('dd/MM/yyyy HH:mm:ss ')
                    }}</span>
                    <span
                      v-if="total_fee < 0"
                      class="info-number total-price font-weight-600"
                    >
                      -{{
                        Math.abs(total(bill.extra_fee, bill.shipping_fee))
                          | formatPrice
                      }}
                    </span>
                    <span
                      v-else
                      class="info-number total-price font-weight-600"
                    >
                      {{
                        total(bill.extra_fee, bill.shipping_fee) | formatPrice
                      }}
                    </span>
                  </div>

                  <button class="btn-primary btn">
                    <img src="~@/assets/img/arrow-down.svg" />
                    <span>Xuất hóa đơn </span>
                  </button>
                </div>
                <div class="card-block  ">
                  <div class="card-content">
                    <div class="card-title">
                      <div class="title-text"> Phí vận đơn </div>
                      <div class="title-pagi">
                        <div
                          class="btn-pagi mr-2"
                          :class="{
                            'disable-next-page': filter.page <= 1,
                          }"
                          @click="previousCreateFee"
                        >
                          <i class="fas fa-chevron-left"></i>
                        </div>
                        <div
                          class="btn-pagi"
                          :class="{
                            'disable-next-page': filter.page >= totalPageCreate,
                          }"
                          @click="nextCreateFee"
                        >
                          <i class="fas fa-chevron-right"></i>
                        </div>
                      </div>
                    </div>
                    <div class="table-responsive">
                      <table class="table table-hover">
                        <thead>
                          <tr class="table-header">
                            <th width="270">MÃ VẬN ĐƠN </th>
                            <th width="270">THỜI GIAN </th>
                            <th width="">PHÍ VẬN ĐƠN </th>
                          </tr>
                        </thead>

                        <tbody v-if="bill">
                          <tr v-for="(item, i) in feeCreate" :key="i">
                            <td>
                              <router-link
                                class="text-no-underline"
                                :to="{
                                  name: 'package-detail',
                                  params: {
                                    id: item.id,
                                  },
                                }"
                              >
                                {{
                                  item.package_code
                                    ? item.package_code.code
                                    : ''
                                }}
                                <img src="@/assets/img/external.svg" />
                              </router-link>
                            </td>
                            <td>{{
                              item.created_at | datetime('dd/MM/yyyy HH:mm:ss')
                            }}</td>
                            <td>+ {{ item.shipping_fee | formatPrice }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div class="card-block  ">
                  <div class="card-content">
                    <div class="card-title">
                      <div class="title-text"> Phí phát sinh </div>
                      <div class="title-pagi">
                        <div
                          class="btn-pagi  mr-2"
                          :class="{
                            'disable-next-page': filterExtra.page <= 1,
                          }"
                          @click="previousExtraFee"
                        >
                          <i class="fas fa-chevron-left"></i>
                        </div>
                        <div
                          class="btn-pagi"
                          @click="nextExtraFee"
                          :class="{
                            'disable-next-page':
                              filterExtra.page >= totalPageExtra,
                          }"
                        >
                          <i class="fas fa-chevron-right"></i>
                        </div>
                      </div>
                    </div>
                    <div class="table-responsive">
                      <table class="table table-hover">
                        <thead>
                          <tr class="table-header">
                            <th width="270">MÃ VẬN ĐƠN </th>
                            <th width="270">THỜI GIAN </th>
                            <th>LOẠI PHÍ</th>
                            <th>NỘI DUNG</th>
                            <th>PHÍ PHÁT SINH </th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr v-for="(item, i) in feeExtra" :key="i">
                            <td>
                              <router-link
                                class="text-no-underline"
                                :to="{
                                  name: 'package-detail',
                                  params: {
                                    id: item.package.id,
                                  },
                                }"
                              >
                                {{
                                  item.package && item.package.package_code
                                    ? item.package.package_code.code
                                    : ''
                                }}
                                <img src="@/assets/img/external.svg" />
                              </router-link>
                            </td>
                            <td>{{
                              item.created_at | datetime('dd/MM/yyyy HH:mm:ss')
                            }}</td>
                            <td>{{ item.extra_fee_types.name }}</td>
                            <td>
                              <p-tooltip
                                :label="item.description"
                                size="large"
                                position="top"
                                type="dark"
                                :active="item.description > 15"
                              >
                                {{ truncate(item.description, 15) }}
                              </p-tooltip>
                            </td>
                            <td v-if="item.amount < 0"
                              >-{{ Math.abs(item.amount) | formatPrice }}</td
                            >
                            <td v-else>{{ item.amount | formatPrice }}</td>
                            <td v-if="item.status == 10">
                              <span v-status:status="`Chưa thanh toán`"></span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div class="card-block  ">
                  <div class="card-content">
                    <div class="card-title">
                      <div class="title-text"> Hoàn tiền </div>
                      <div class="title-pagi">
                        <div
                          class="btn-pagi  mr-2"
                          :class="{
                            'disable-next-page': filterRefund.page <= 1,
                          }"
                          @click="previousRefundPage"
                        >
                          <i class="fas fa-chevron-left"></i>
                        </div>
                        <div
                          class="btn-pagi"
                          @click="nextRefundPage"
                          :class="{
                            'disable-next-page': filterRefund.page >= totalPage,
                          }"
                        >
                          <i class="fas fa-chevron-right"></i>
                        </div>
                      </div>
                    </div>
                    <div class="table-responsive">
                      <table class="table table-hover">
                        <thead>
                          <tr class="table-header">
                            <th width="270">MÃ VẬN ĐƠN </th>
                            <th width="270">THỜI GIAN </th>
                            <th>NỘI DUNG</th>
                            <th>PHÍ HOÀN TIỀN </th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr v-for="(item, i) in feeRefund" :key="i">
                            <td>
                              <router-link
                                class="text-no-underline"
                                :to="{
                                  name: 'package-detail',
                                  params: {
                                    id: item.package.id,
                                  },
                                }"
                              >
                                {{
                                  item.package && item.package.package_code
                                    ? item.package.package_code.code
                                    : ''
                                }}
                                <img src="@/assets/img/external.svg" />
                              </router-link>
                            </td>
                            <td>{{
                              item.created_at | datetime('dd/MM/yyyy HH:mm:ss')
                            }}</td>
                            <td v-if="item.status == 10">
                              <span v-status:status="`Chưa thanh toán`"></span>
                            </td>
                            <td>
                              <p-tooltip
                                :label="item.description"
                                size="large"
                                position="top"
                                type="dark"
                                :active="item.description > 15"
                              >
                                {{ truncate(item.description, 15) }}
                              </p-tooltip>
                            </td>
                            <td v-if="item.amount < 0"
                              >-{{ Math.abs(item.amount) | formatPrice }}</td
                            >
                            <td v-else>{{ item.amount | formatPrice }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <empty-search-result v-else></empty-search-result>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import {
  FETCH_BILL_DETAIL,
  FETCH_BILL_EXTRA,
  FETCH_BILL_REFUND,
} from '../store'
import mixinRoute from '@core/mixins/route'
import mixinTable from '@core/mixins/table'
import { date } from '@core/utils/datetime'
import EmptySearchResult from '@components/shared/EmptySearchResult'
import { truncate } from '@core/utils/string'

export default {
  name: 'BillDetail',
  mixins: [mixinRoute, mixinTable],
  components: { EmptySearchResult },
  data() {
    return {
      filter: {
        limit: 5,
        page: 1,
        search: '',
      },
      dateInit: new Date(),
      labelDate: `Tìm theo ngày`,
      orderPagination: {
        numberPage: 0,
        itemsPerPage: 10,
        currentPage: 1,
      },
      order: [],
      bill: {
        id: '',
        code: '',
        created_at: '',
      },
      search: '',
      filterExtra: {
        limit: 5,
        page: 1,
        id: '',
      },
      filterRefund: {
        limit: 5,
        page: 1,
        type: 9,
        id: '',
      },
      total_fee: 0,
      isFetching: false,
    }
  },
  computed: {
    ...mapState('bill', {
      feeCreate: (state) => state.feeCreate,
      countCreate: (state) => state.countCreate,
      feeExtra: (state) => state.feeExtra,
      countExtra: (state) => state.countExtra,
      feeRefund: (state) => state.feeRefund,
      countRefund: (state) => state.countRefund,
    }),
    totalPageCreate() {
      const totalPages = Math.ceil(this.countCreate / this.filter.limit)
      return totalPages
    },
    totalPageExtra() {
      const totalPages = Math.ceil(this.countExtra / this.filterExtra.limit)
      return totalPages
    },
    totalPage() {
      const total = Math.ceil(this.countRefund / this.filterRefund.limit)
      return total
    },
    extraFee() {
      const extra = this.feeExtra.filter((item) => item.extra_fee_type_id != 9)
      return extra
    },
  },
  created() {
    this.filter = this.getRouteQuery()
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions('bill', [
      FETCH_BILL_DETAIL,
      FETCH_BILL_EXTRA,
      FETCH_BILL_REFUND,
    ]),
    truncate,
    async init() {
      this.isFetching = true
      this.handleUpdateRouteQuery()
      let result = await this[FETCH_BILL_DETAIL](this.filter)
      this.bill = result.bill
      this.total_fee = result.total
      this.isFetching = false
      if (result.bill) {
        this.filterExtra.id = this.bill.id
        this.filterRefund.id = this.bill.id
        await this[FETCH_BILL_EXTRA](this.filterExtra)
        await this[FETCH_BILL_REFUND](this.filterRefund)
        return
      }
      this.$toast.open({
        type: 'error',
        message: result.message,
        duration: 4000,
      })
    },
    clearSearchDate() {
      this.filter.date_search = ''
      this.filter.page = 1
      this.bill = {}
    },
    handleSearch(e) {
      this.filter.page = 1
      this.$set(this.filter, 'search', e.target.value.trim())
    },
    async previousCreateFee() {
      let page =
        this.filter.page <= 1 ? (this.filter.page = 1) : (this.filter.page -= 1)
      this.$set(this.filter, 'page', page)
      let result = await this[FETCH_BILL_DETAIL](this.filter)
      if (!result.success) {
        this.$toast.open({
          type: 'error',
          message: result.message,
          duration: 4000,
        })
      }
    },
    async nextCreateFee() {
      let page =
        this.filter.page >= this.totalPageCreate
          ? this.filter.page
          : this.filter.page + 1
      this.$set(this.filter, 'page', page)
      let result = await this[FETCH_BILL_DETAIL](this.filter)
      if (!result.success) {
        this.$toast.open({
          type: 'error',
          message: result.message,
          duration: 4000,
        })
      }
    },
    async previousExtraFee() {
      let page =
        this.filterExtra.page <= 1
          ? (this.filterExtra.page = 1)
          : (this.filterExtra.page -= 1)
      this.$set(this.filterExtra, 'page', page)
      let result = await this[FETCH_BILL_EXTRA](this.filterExtra)
      if (!result.success) {
        this.$toast.open({
          type: 'error',
          message: result.message,
          duration: 4000,
        })
      }
    },
    async nextExtraFee() {
      let page =
        this.filterExtra.page >= this.totalPageExtra
          ? this.filterExtra.page
          : this.filterExtra.page + 1
      this.$set(this.filterExtra, 'page', page)
      let result = await this[FETCH_BILL_EXTRA](this.filterExtra)
      if (!result.success) {
        this.$toast.open({
          type: 'error',
          message: result.message,
          duration: 4000,
        })
      }
    },
    selectDate(v) {
      this.filter.page = 1
      if (this.search) {
        this.$set(this.filter, 'search', this.search)
      }
      this.$set(this.filter, 'date_search', date(v.startDate, 'yyyy-MM-dd'))
    },

    async previousRefundPage() {
      let page =
        this.filterRefund.page <= 1
          ? (this.filterRefund.page = 1)
          : (this.filterRefund.page -= 1)
      this.$set(this.filterRefund, 'page', page)
      let result = await this[FETCH_BILL_REFUND](this.filterRefund)
      if (!result.success) {
        this.$toast.open({
          type: 'error',
          message: result.message,
          duration: 4000,
        })
      }
    },
    async nextRefundPage() {
      let page =
        this.filterRefund.currentPage >= this.totalPage
          ? this.filterRefund.page
          : this.filterRefund.page + 1
      this.$set(this.filterRefund, 'page', page)
      let result = await this[FETCH_BILL_REFUND](this.filterRefund)
      if (!result.success) {
        this.$toast.open({
          type: 'error',
          message: result.message,
          duration: 4000,
        })
      }
    },
    total(ship, extra) {
      let total = ship + extra
      return total
    },
  },
  watch: {},
}
</script>
<style lang="scss" scoped>
.disable-next-page {
  background-color: #f6f7f7;
  pointer-events: none;
}
</style>
