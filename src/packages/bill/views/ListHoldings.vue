<template>
  <div>
    <div class="page-content">
      <div class="page-body-bill">
        <div class="list__bills">
          <div class="page-header_action d-flex">
            <div class="page-header_input">
              <p-input
                placeholder="Tìm theo mã Lionbay tracking"
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
            <template v-else-if="packages.length">
              <div class="table-responsive">
                <table class="table table-hover">
                  <thead>
                    <tr class="table-header">
                      <th style="width: 40%">LIONBAY TRACKING</th>
                      <th style="width: 25%">NGÀY CHỜ XỬ LÝ </th>
                      <th>NGÀY XỬ LÝ DỰ KIẾN </th>
                      <th style="text-align: right">TỔNG TIỀN</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="(item, i) in packages" :key="i">
                      <td>
                        <router-link
                          class="text-no-underline"
                          :to="{
                            name: 'package-detail',
                            params: {
                              id: item.package_id,
                            },
                          }"
                        >
                          {{ item.code }}
                        </router-link></td
                      >
                      <td>{{ item.created_at | date('dd/MM/yyyy') }}</td>
                      <td>{{
                        dateProcess(item.created_at) | date('dd/MM/yyyy')
                      }}</td>
                      <td style="text-align: right">{{
                        item.amount | formatPrice
                      }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </template>
            <empty-search-result v-else></empty-search-result>
          </div>
        </div>
        <div
          class="
            paginate-bill
            d-flex
            justify-content-between
            align-items-center
            mt-24
            mb-80
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
import mixinRoute from '@core/mixins/route'
import mixinTable from '@core/mixins/table'
import EmptySearchResult from '@components/shared/EmptySearchResult'
import { date } from '@core/utils/datetime'
import { FETCH_PACKAGES_HOLDING } from '../../package/store'
export default {
  name: 'ListHoldings',
  mixins: [mixinRoute, mixinTable],
  components: {
    EmptySearchResult,
  },
  computed: {
    ...mapState('package', {
      count: (state) => state.count_package_holding,
      packages: (state) => state.package_holding,
      day: (state) => state.day,
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
    ...mapActions('package', [FETCH_PACKAGES_HOLDING]),

    async init() {
      this.isFetching = true
      this.handleUpdateRouteQuery()
      let result = await this.fetchPackagesHolding(this.filter)
      if (!result.success) {
        this.$toast.open({
          type: 'error',
          message: result.message,
          duration: 4000,
        })
      }
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

    handleSearch(e) {
      this.filter.page = 1
      this.$set(this.filter, 'search', e.target.value.trim())
    },
    dateProcess(date) {
      var dt = new Date(date)
      dt.setDate(dt.getDate() + this.day)
      return dt
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
.download-bill {
  // &:hover {
  //   span {
  //     background: #ddf2f2;
  //   }
  // }
  span {
    padding: 8px;
    // border-radius: 50%;
  }
}

.list__bills {
  .p-tooltip::after {
    width: 100px;
    text-align: center;
  }
}
</style>
