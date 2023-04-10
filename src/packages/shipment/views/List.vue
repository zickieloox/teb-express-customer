<template>
  <div class="pages">
    <div class="page-header">
      <div class="action-header d-flex justify-content-between">
        <div class="page-header__input mr-30" style="flex: 1;">
          <p-input
            placeholder="Tìm theo mã lô hàng, mã đơn hàng, mã tracking"
            prefixIcon="search"
            type="search"
            :value="filter.keyword"
            @keyup.enter="handleSearch"
            :clearable="true"
            @reset="handleClearSearch"
          >
          </p-input>
        </div>
        <div class="d-flex">
          <div class="btn-action">
            <button
              class="pull-right btn-primary btn ml-2"
              @click="handleImport"
            >
              <inline-svg
                :src="require('../../../assets/img/uploadex.svg')"
              ></inline-svg>
              <span>Nhập Excel</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="page-content">
      <div class="page-content">
        <div class="card">
          <div class="card-body">
            <VclTable class="mt-20" v-if="isFetching"></VclTable>
            <template v-else-if="shipments.length">
              <div class="table-responsive">
                <table
                  class="table table-hover table-packages"
                  id="tbl-packages"
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>WEIGHT</th>
                      <th>PRICE</th>
                      <th>STATUS</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in shipments" :key="item.id">
                      <td class="order-number">
                        <div class="d-flex justify-content-between">
                          <router-link
                            class="text-no-underline"
                            :to="{
                              name: 'shipment-detail',
                              params: { id: item.id },
                            }"
                          >
                            {{ item.id }}
                          </router-link>
                        </div>
                      </td>
                      <td>{{ item.weight }}</td>
                      <td>{{ item.price }}</td>
                      <td><Status :status="item.status"/></td>
                      <td class="action"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                class="d-flex justify-content-between align-items-center mb-80"
                v-if="count > 0"
              >
                <p-pagination
                  :total="count"
                  :per-page.sync="filter.limit"
                  :current.sync="filter.page"
                  size="sm"
                >
                </p-pagination>
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
import { FETCH_LIST_SHIPMENTS, FETCH_COUNT_SHIPMENTS } from '../store'
import EmptySearchResult from '@components/shared/EmptySearchResult'
import mixinRoute from '@core/mixins/route'
import mixinTable from '@core/mixins/table'

export default {
  name: 'ShipmentList',
  mixins: [mixinRoute, mixinTable],
  components: { EmptySearchResult },
  computed: {
    ...mapState('shipment', {
      shipments: (state) => state.shipments,
      count: (state) => state.count,
    }),
  },
  data() {
    return {
      isFetching: false,
      filter: {
        keyword: '',
        status: 0,
        page: 1,
      },
    }
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions('shipment', {
      fetchListShipment: FETCH_LIST_SHIPMENTS,
      fetchCountShipment: FETCH_COUNT_SHIPMENTS,
    }),

    async init() {
      this.isFetching = true
      this.handleUpdateRouteQuery()

      const filters = { ...this.filter }

      this.fetchCountShipment(filters)
      const res = await this.fetchListShipment(filters)
      this.isFetching = false

      if (res.error) {
        this.$toast.error(res.message)
        return
      }
    },
    handleClearSearch() {
      this.filter.keyword = ''
      this.filter.page = 1
    },
    async handleImport() {},
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
