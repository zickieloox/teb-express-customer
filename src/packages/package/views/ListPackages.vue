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
              >
              </p-input>
              <p-datepicker
                class="date birthday p-input-group input-group"
                id="date-search"
                :format="'dd/mm/yyyy'"
                :label="`Chon Ngay`"
                :single-date-picker="true"
                :showDropdowns="true"
                :autoApply="true"
              >
              </p-datepicker>
            </div>
            <package-status-tab :status="statusTab" v-model="filter.status" />
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
                      <td>{{ statusTab[item.status].text }}</td>
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
import { PACKAGE_STATUS_TAB } from '@/packages/package/constants'
import { FETCH_LIST_PACKAGES } from '@/packages/package/store'
import EmptySearchResult from '@components/shared/EmptySearchResult'
import mixinRoute from '@core/mixins/route'
import mixinTable from '@core/mixins/table'
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
      },
      isFetching: false,
    }
  },
  created() {
    this.filter = this.getRouteQuery()
    this.init()
  },
  computed: {
    ...mapState('package', {
      packages: (state) => state.packages,
      count: (state) => state.countPackages,
    }),
    count_senders() {
      return 155
    },
    statusTab() {
      return PACKAGE_STATUS_TAB
    },
  },
  methods: {
    ...mapActions('package', [FETCH_LIST_PACKAGES]),
    async init() {
      this.isFetching = true
      const result = await this.fetchListPackages(this.filter)
      this.isFetching = false
      if (!result.success) {
        this.$toast.open({ message: result.message, type: 'error' })
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

<style></style>
