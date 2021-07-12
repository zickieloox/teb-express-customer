<template>
  <div class="pages list__bill">
    <div class="container p-0">
      <div class="page-header">
        <div class="page-header_title header-2">Quản lý hóa đơn</div>
        <div class="page-header_action d-flex ">
          <div class="page-header_input d-flex ">
            <p-input
              placeholder="Tìm theo mã đơn hàng hoặc mã hóa đơn"
              prefixIcon="search"
              class="mb-2"
              type="search"
              clearable
              :value.sync="filter.search"
              @keyup.enter="handleSearch"
              v-model="filter.search"
            >
            </p-input>
            <p-datepicker
              :format="'dd/mm/yyyy'"
              class="p-input-group input-group"
              :label="labelDate"
              id="date-search"
              @update="selectDate"
              :singleDatePicker="true"
              :value="{
                startDate: filter.date_search,
                endDate: filter.date_search,
              }"
            ></p-datepicker>
            <p-button
              class="close ml-2"
              type="default"
              icon="close"
              @click="clearSearchDate"
              v-if="filter.date_search"
            />
          </div>
          <a href="#" class="btn btn-primary">
            <span>Xuất hóa đơn</span>
          </a>
        </div>
      </div>
      <vcl-table class=" md-20" v-if="isFetching"></vcl-table>
      <template v-else-if="bill">
        <div class="page-content">
          <div v-if="bill" class="page-header_info d-flex mb-16 ">
            <div class="info-bill"
              >Mã hóa đơn :
              <span class="info-number">{{ bill.id }}</span>
            </div>
            <div class="info-bill"
              >Ngày tạo:
              <span class="info-number">{{
                bill.created_at | datetime('dd/MM/yyyy HH:mm:ss ')
              }}</span>
            </div>
            <div class="info-bill"
              >Tồng hóa đơn :
              <span class="info-number font-weight-600">{{
                total_fee | formatPrice
              }}</span>
            </div>
          </div>
          <div class="card-block  ">
            <div class="card-content">
              <div class="card-title">
                <div class="title-text"> Phí vận đơn :</div>
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
                      <th width="350">MÃ VẬN ĐƠN </th>
                      <th>THỜI GIAN </th>
                      <th width="400">PHÍ VẬN ĐƠN </th>
                    </tr>
                  </thead>

                  <tbody v-if="bill">
                    <tr v-for="(item, i) in feeCreate" :key="i">
                      <td>
                        <router-link
                          :to="{
                            name: 'package-detail',
                            params: {
                              id: item.id,
                            },
                          }"
                          class="card-link"
                        >
                          {{ item.code }}
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
                <div class="title-text"> Phí phát sinh :</div>
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
                      'disable-next-page': filterExtra.page >= totalPageExtra,
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
                      <th width="350">MÃ VẬN ĐƠN </th>
                      <th width="330">THỜI GIAN </th>
                      <th>PHÍ PHÁT SINH </th>
                      <th width="100">TRẠNG THÁI </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="(item, i) in feeExtra" :key="i">
                      <td>
                        <router-link
                          :to="{
                            name: 'package-detail',
                            params: {
                              id: item.package.id,
                            },
                          }"
                          class="card-link"
                        >
                          {{ item.package.code }}
                          <img src="@/assets/img/external.svg" />
                        </router-link>
                      </td>
                      <td>{{
                        item.created_at | datetime('dd/MM/yyyy HH:mm:ss')
                      }}</td>
                      <td>{{ item.amount | formatPrice }}</td>
                      <td>
                        <span
                          v-if="item.status == 10"
                          v-status:status="`Chưa thanh toán`"
                        ></span>
                      </td>
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
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { FETCH_BILL_DETAIL, FETCH_BILL_EXTRA } from '../store'
import mixinRoute from '@core/mixins/route'
import mixinTable from '@core/mixins/table'
import { date } from '@core/utils/datetime'
import EmptySearchResult from '@components/shared/EmptySearchResult'

export default {
  name: 'ListBill',
  mixins: [mixinRoute, mixinTable],
  components: { EmptySearchResult },
  data() {
    return {
      filter: {
        limit: 5,
        page: 1,
        search: '',
        date_search: date(new Date(), 'yyyy-MM-dd'),
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
    }),
    totalPageCreate() {
      const totalPages = Math.ceil(this.countCreate / this.filter.limit)
      return totalPages
    },
    totalPageExtra() {
      const totalPages = Math.ceil(this.countExtra / this.filterExtra.limit)
      return totalPages
    },
  },
  created() {
    this.filter = this.getRouteQuery()
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions('bill', [FETCH_BILL_DETAIL, FETCH_BILL_EXTRA]),
    async init() {
      this.isFetching = true
      this.handleUpdateRouteQuery()
      let result = await this[FETCH_BILL_DETAIL](this.filter)
      this.bill = result.bill
      if (!result.success) {
        this.isFetching = false
        return
      }
      this.total_fee = result.total
      if (result.bill) {
        this.filterExtra.id = this.bill.id
        await this[FETCH_BILL_EXTRA](this.filterExtra)
      }
      this.isFetching = false
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
    previousTimeLinePage() {
      this.orderPagination.currentPage <= 1
        ? (this.orderPagination.currentPage = 1)
        : (this.orderPagination.currentPage -= 1)
    },
    nextTimeLinePage() {
      this.orderPagination.currentPage =
        this.orderPagination.currentPage >= this.orderPagination.numberPage
          ? this.orderPagination.numberPage
          : this.orderPagination.currentPage + 1
    },
    async previousCreateFee() {
      let page =
        this.filter.page <= 1 ? (this.filter.page = 1) : (this.filter.page -= 1)
      this.$set(this.filter, 'page', page)
      await this[FETCH_BILL_DETAIL](this.filter)
    },
    async nextCreateFee() {
      let page =
        this.filter.page >= this.totalPageCreate
          ? this.filter.page
          : this.filter.page + 1
      this.$set(this.filter, 'page', page)
      await this[FETCH_BILL_DETAIL](this.filter)
    },
    async previousExtraFee() {
      let page =
        this.filterExtra.page <= 1
          ? (this.filterExtra.page = 1)
          : (this.filterExtra.page -= 1)
      this.$set(this.filterExtra, 'page', page)
      await this[FETCH_BILL_EXTRA](this.filterExtra)
    },
    async nextExtraFee() {
      let page =
        this.filterExtra.page >= this.totalPageExtra
          ? this.filterExtra.page
          : this.filterExtra.page + 1
      this.$set(this.filterExtra, 'page', page)
      await this[FETCH_BILL_EXTRA](this.filterExtra)
    },
    selectDate(v) {
      this.filter.page = 1
      if (this.search) {
        this.$set(this.filter, 'search', this.search)
      }
      this.$set(this.filter, 'date_search', date(v.startDate, 'yyyy-MM-dd'))
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
<style lang="scss" scoped>
.disable-next-page {
  background-color: #f6f7f7;
  pointer-events: none;
}
.card-link {
  color: #015858;
}
.close {
  width: 50px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style>
