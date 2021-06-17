<template>
  <div class="list-packages pages">
    <div class="page-content">
      <div class="page-header">
        <div class="page-header__title">
          <span class="pull-left">Quản lý vận đơn</span>
          <button class="pull-right btn-excel btn-import">
            <img src="~@/assets/img/import-excel.svg" />
            <span>Nhập Excel</span>
          </button>
          <button class="pull-right btn-excel btn-export">
            <img src="~@/assets/img/export-excel.svg" />
            <span>Xuất Excel</span>
          </button>
          <div class="clearfix"></div>
        </div>
      </div>
      <div class="page-content">
        <div class="card">
          <div class="card-body">
            <div class="d-flex">
              <p-input
                placeholder="Tìm theo đơn hàng..."
                suffixIcon="search"
                type="search"
                v-model="searchCode"
                :suffix-func="handleSearchCode"
                @keyup.enter="handleSearchCode"
              >
              </p-input>
              <p-datepicker
                :format="'dd/mm/yyyy'"
                class="p-input-group input-group"
                @update="selectDate"
                :label="`Tìm theo ngày`"
                id="date-search"
                :value="{
                  start_date: filter.start_date,
                  end_date: filter.end_date,
                }"
              ></p-datepicker>
            </div>
            <package-status-tab
              :has-all="false"
              :status="statusTab"
              v-model="filter.status"
              :count-status="count_status"
            />
            <VclTable class="mt-20" v-if="isFetching"></VclTable>
            <template v-else-if="packages.length">
              <div class="table-responsive">
                <table class="table table-hover" id="tbl-packages">
                  <thead>
                    <tr>
                      <th width="40">
                        <p-checkbox></p-checkbox>
                      </th>
                      <th>Mã vận đơn</th>
                      <th>Mã hàng hoá</th>
                      <th>Người gửi</th>
                      <th>Người nhận</th>
                      <th>Hàng hóa</th>
                      <th>Ngày tạo </th>
                      <th>Trạng thái</th>
                      <th>Tổng cước</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, i) in packages" :key="i">
                      <td width="40">
                        <p-checkbox></p-checkbox>
                      </td>
                      <td>{{ item.code }}</td>
                      <td>{{ item.sku }}</td>
                      <td>
                        {{
                          item.sender ? item.sender.name : item.sender_full_name
                        }}
                      </td>
                      <td>
                        {{ item.recipient }}
                      </td>
                      <td>{{ item.items }}</td>
                      <td>{{ item.created_at | date('dd/MM/yyyy') }}</td>
                      <td>{{ mapStatus[item.status].value }}</td>
                      <td>dsa</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                class="d-flex justify-content-between align-items-center mb-16"
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
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import PackageStatusTab from '@/packages/package/views/components/PackageStatusTab'
import {
  PACKAGE_STATUS_TAB,
  MAP_NAME_STATUS_PACKAGE,
} from '@/packages/package/constants'
import { FETCH_LIST_PACKAGES } from '@/packages/package/store'
import EmptySearchResult from '@components/shared/EmptySearchResult'
import mixinRoute from '@core/mixins/route'
import mixinTable from '@core/mixins/table'
import { date } from '@core/utils/datetime'
export default {
  name: 'ListPackages',
  mixins: [mixinRoute, mixinTable],
  components: { EmptySearchResult, PackageStatusTab },
  data() {
    return {
      filter: {
        limit: 50,
        status: '',
        search: '',
        start_date: '',
        end_date: '',
        code: '',
      },
      searchCode: '',
      allowSearch: true,
      isFetching: false,
    }
  },
  created() {
    this.filter = this.getRouteQuery()
    this.searchCode = this.filter.code
    this.init()
  },
  computed: {
    ...mapState('package', {
      packages: (state) => state.packages,
      count: (state) => state.countPackages,
      count_status: (state) => state.count_status,
    }),
    statusTab() {
      return PACKAGE_STATUS_TAB
    },
    mapStatus() {
      return MAP_NAME_STATUS_PACKAGE
    },
  },
  methods: {
    ...mapActions('package', [FETCH_LIST_PACKAGES]),
    async init() {
      this.isFetching = true
      this.handleUpdateRouteQuery()
      const result = await this.fetchListPackages(this.filter)
      this.isFetching = false
      if (!result.success) {
        this.$toast.open({ message: result.message, type: 'error' })
      }
    },
    selectDate(v) {
      this.filter.start_date = date(v.startDate, 'yyyy-MM-dd')
      this.filter.end_date = date(v.endDate, 'yyyy-MM-dd')
    },
    handleSearchCode() {
      this.filter.page = 1
      this.$set(this.filter, 'code', this.searchCode.trim())
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

<style></style>
