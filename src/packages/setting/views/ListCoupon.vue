<template>
  <div class="pages list__product">
    <div class="page-header d-flex">
      <div class="col-12">
        <p-input
          placeholder="Tìm mã coupon"
          prefixIcon="search"
          class="mb-2"
          type="search"
          :value="filter.search"
          @keyup.enter="handleSearch"
          :clearable="true"
          @reset="clearSearchHandle"
        >
        </p-input>
      </div>
    </div>
    <div class="page-content">
      <div class="card">
        <div class="card-body">
          <vcl-table class="md-20" v-if="isFetching"></vcl-table>
          <template v-else-if="coupons.length > 0">
            <div class="table-responsive">
              <table class="table table-hover table-coupons">
                <thead>
                  <tr class="list__product-title">
                    <th>MÃ COUPON</th>
                    <th>NGÀY BẮT ĐẦU</th>
                    <th>NGÀY HẾT HẠN</th>
                    <th>ĐIỂM MUA</th>
                    <th>LOẠI COUPON</th>
                    <th>GIÁ TRỊ ÁP DỤNG TỐI THIỆU</th>
                    <th>GIÁ TRỊ GIẢM TỐI ĐA</th>
                    <th>GIÁ TRỊ</th>
                    <th class="text-center">SL CÒN LẠI</th>
                    <th>TRẠNG THÁI</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in listCoupons"
                    :key="item.id"
                    :class="{ expired: item.is_expired, used: item.is_used }"
                  >
                    <td>{{ item.code }}</td>
                    <td>{{ item.start_date | date('dd/MM/yyyy HH:mm:ss') }}</td>
                    <td>{{ item.end_date | date('dd/MM/yyyy HH:mm:ss') }}</td>
                    <td>{{ item.point }}</td>
                    <td>{{ item.type_text }}</td>
                    <td>
                      <span v-if="!item.min_apply">-</span>
                      <span v-else>{{ item.min_apply | formatPrice }}</span>
                    </td>
                    <td>
                      <span v-if="!item.max_apply">-</span>
                      <span v-else>{{ item.max_apply | formatPrice }}</span>
                    </td>
                    <td>
                      <span v-if="!item.value">-</span>
                      <span v-else>{{ item.value_text }}</span>
                    </td>
                    <td class="text-center">{{ item.quantity - item.used }}</td>
                    <td>
                      <span
                        v-if="item.is_used"
                        class="badge badge-round badge-light"
                        >Đã sử dụng</span
                      >
                      <span
                        v-else-if="item.is_expired"
                        class="badge badge-round badge-expired"
                        >Hết hiệu lực</span
                      >
                      <span v-else class="badge badge-round badge-success"
                        >Còn hiệu lực</span
                      >
                    </td>
                    <td>
                      <button
                        v-if="!item.is_expired && !item.is_used"
                        class="btn btn-primary"
                        @click="useCouponHandler(item)"
                        >Sử dụng</button
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
          <EmptySearchResult v-else></EmptySearchResult>
        </div>
      </div>
      <div
        class="d-flex justify-content-between align-items-center mb-80 paginate"
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
</template>
<script>
import EmptySearchResult from '../../../components/shared/EmptySearchResult'
import { truncate } from '@core/utils/string'
import mixinRoute from '@core/mixins/route'
import mixinTable from '@core/mixins/table'
import { mapActions, mapState } from 'vuex'
import { FETCH_LIST_COUPONS, FETCH_COUNT_COUPONS, APPLY_COUPON } from '../store'
import {
  MAP_COUPON_TEXT,
  COUPON_TYPE_MONEY,
  COUPON_TYPE_DISCOUNT_PERCENT,
} from '../constants'
import { formatPrice } from '@core/utils/formatter'
import { timeSince } from '@core/utils/datetime'

export default {
  name: 'ListCoupon',
  mixins: [mixinRoute, mixinTable],
  components: { EmptySearchResult },
  data() {
    return {
      filter: {
        page: 1,
        limit: 25,
        search: '',
        status: '',
      },
      visibleModal: false,
      visibleModalDelete: false,
      isFetching: false,
    }
  },
  created() {
    this.filter = this.getRouteQuery()
  },
  mounted() {
    this.init()
  },
  computed: {
    ...mapState('setting', {
      count: (state) => state.count_coupons,
      coupons: (state) => state.coupons,
    }),

    listCoupons() {
      return this.coupons.map((item) => {
        const {
          id,
          code,
          start_date,
          end_date,
          point,
          type,
          used,
          max_apply,
          min_apply,
          value,
          quantity,
        } = item
        const value_text =
          type == COUPON_TYPE_DISCOUNT_PERCENT
            ? `${value}%`
            : formatPrice(value)
        return {
          id,
          code,
          start_date,
          end_date,
          point,
          type,
          type_text: MAP_COUPON_TEXT[type] || 'unknown',
          used,
          quantity,
          is_used: used == quantity,
          max_apply: type == COUPON_TYPE_MONEY ? 0 : max_apply,
          min_apply: type == COUPON_TYPE_MONEY ? 0 : min_apply,
          value,
          value_text,
          is_expired: timeSince(end_date) > 0,
        }
      })
    },
  },
  methods: {
    ...mapActions('setting', [
      FETCH_LIST_COUPONS,
      FETCH_COUNT_COUPONS,
      APPLY_COUPON,
    ]),
    truncate,
    async init() {
      this.isFetching = true
      this.handleUpdateRouteQuery()

      this[FETCH_COUNT_COUPONS](this.filter)
      const res = await this[FETCH_LIST_COUPONS](this.filter)

      this.isFetching = false

      if (res.error) {
        this.$toast.error(res.message)
        return
      }

      this.isFetching = false
    },
    async useCouponHandler({ type, code }) {
      if (type != COUPON_TYPE_MONEY) {
        await this.$router.push({
          name: 'list-packages',
          query: { status: 'pending' },
        })
        return
      }

      this.$dialog.confirm({
        title: 'Xác nhận sử dụng coupon!',
        message: `Bạn có thực sự muốn sử dụng coupon “${code}”?`,
        type: 'primary',
        typeCancel: 'default',
        confirmText: 'Chấp nhận',
        cancelText: 'Không',
        onConfirm: () => this.useCouponSubmit(code),
      })
    },
    async useCouponSubmit(code) {
      if (this.isFetching) return
      this.isFetching = true

      const res = await this[APPLY_COUPON](code)

      this.isFetching = false

      if (res.error) {
        this.$toast.error(res.message)
        return
      }

      this.$toast.success(`Bạn đã sử dụng coupon “${code}” thành công!!!`)
      this.init()
    },
    async clearSearchHandle() {
      this.filter.search = ''
      this.filter.page = 1
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
<style>
.table-coupons tbody tr td {
  padding: 14px 5px 8px;
}
.table-coupons tbody tr.used,
.table-coupons tbody tr.expired {
  opacity: 0.7;
}
</style>
