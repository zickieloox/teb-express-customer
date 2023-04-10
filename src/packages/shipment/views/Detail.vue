<template>
  <div class="pages">
    <div class="page-header">
      <div class="d-flex">
        <div class="h-i">
          <span class="h-it">Mã lô hàng</span>
          <span class="h-iv">#{{ shipment.id }}</span>
        </div>
        <div class="h-i">
          <span class="h-it">Ngày tạo:</span>
          <span class="h-iv">{{
            shipment.created_at | date('dd/MM/yyyy HH:ii')
          }}</span>
        </div>
        <div class="h-i">
          <span class="h-it">Khối lượng:</span>
          <span class="h-iv">{{ shipment.weight }} gram</span>
        </div>
        <div class="h-i">
          <span class="h-it">Price:</span>
          <span class="h-iv">{{ total_amount | formatPrice }}</span>
        </div>
      </div>
    </div>
    <div class="page-content">
      <div class="card">
        <div class="card-body">
          <VclTable class="mt-20" v-if="isFetching"></VclTable>
          <template v-else-if="items.length">
            <div class="table-responsive">
              <table class="table table-hover table-packages" id="tbl-packages">
                <thead>
                  <tr>
                    <th>ORDER NO.</th>
                    <th>LIONBAY TRACKING</th>
                    <th>WEIGHT</th>
                    <th>PRICE</th>
                    <th>CREATED DATE</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in items" :key="item.id">
                    <td class="order-number">
                      <div class="d-flex justify-content-between">
                        <router-link
                          class="text-no-underline"
                          :to="{
                            name: 'shipment-detail',
                            params: { id: item.id },
                          }"
                        >
                          {{ item.order_number }}
                        </router-link>
                      </div>
                    </td>
                    <td>{{ item.code }}</td>
                    <td>{{ item.weight }} gram</td>
                    <td>{{ item.shipping_fee | formatPrice }}</td>
                    <td>{{ item.created_at | date('dd/MM/yyyy HH:ii') }}</td>
                    <td><span :v-status="item.status"></span></td>
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
</template>
<script>
import { mapActions, mapState } from 'vuex'
import {
  FETCH_DETAIL_SHIPMENTS,
  FETCH_LIST_SHIPMENT_ITEMS,
  FETCH_COUNT_SHIPMENT_ITEMS,
} from '../store'
import EmptySearchResult from '@components/shared/EmptySearchResult'
import mixinRoute from '@core/mixins/route'
import mixinTable from '@core/mixins/table'

export default {
  name: 'ShipmentDetail',
  mixins: [mixinRoute, mixinTable],
  components: { EmptySearchResult },
  computed: {
    ...mapState('shipment', {
      shipment: (state) => state.shipment,
      total_amount: (state) => state.total_amount,
      items: (state) => state.items,
      count: (state) => state.items_count,
    }),
    id() {
      return parseInt(this.$route.params.id)
    },
  },
  data() {
    return {
      isFetching: false,
      isItemFetching: false,
      filter: {
        keyword: '',
        status: 0,
        page: 1,
      },
    }
  },
  created() {
    this.filter = this.getRouteQuery()
    this.init()
  },
  methods: {
    ...mapActions('shipment', {
      fetchDetail: FETCH_DETAIL_SHIPMENTS,
      fetchListItems: FETCH_LIST_SHIPMENT_ITEMS,
      fetchCountItems: FETCH_COUNT_SHIPMENT_ITEMS,
    }),

    async init() {
      this.isFetching = true
      this.fetchItems()
      const res = await this.fetchDetail(this.id)
      this.isFetching = false

      if (!res || res.error) {
        this.$toast.error(res.message)
        return
      }
    },
    async fetchItems() {
      this.handleUpdateRouteQuery()

      const { id } = this
      const filters = { id, ...this.filter }

      this.isItemFetching = true

      this.fetchCountItems(filters)
      const res = await this.fetchListItems(filters)

      this.isItemFetching = false

      if (!res || res.error) {
        this.$toast.error(res.message)
        return
      }
    },
  },
  watch: {
    filter: {
      handler: function() {
        this.fetchItems()
      },
      deep: true,
    },
  },
}
</script>
<style lang="scss">
.h-i {
  padding: 12px 24px;

  .h-it {
    display: block;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #626363;
    margin-bottom: 8px;
  }

  .h-iv {
    display: block;
    margin-top: -2px;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    color: #111212;
  }
}
</style>
