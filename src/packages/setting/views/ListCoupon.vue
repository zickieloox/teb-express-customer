<template>
  <div class="pages list__coupon">
    <div class="page-header d-flex">
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
    <div class="page-content">
      <div class="card">
        <div class="card-body">
          <vcl-table class="md-20" v-if="isFetching"></vcl-table>
          <template v-else-if="coupons.length > 0">
            <div class="row">
              <div
                class="col-6 mb-24"
                :class="{ disabled: isDisabled(item) }"
                v-for="item in listCoupons"
                :key="item.id"
              >
                <div
                  class="item d-flex justify-content-between align-items-center"
                >
                  <div class="icon">
                    <inline-svg
                      :src="
                        require(`../../../assets/img/${getIconCoupon(
                          item.type
                        )}`)
                      "
                    ></inline-svg>
                  </div>
                  <div class="txt">
                    <h2>{{ item.text_head }}</h2>
                    <p>Số lượng: {{ item.quantity }}</p>
                    <p
                      >Thời gian áp dụng:
                      {{ item.start_date | date('dd/MM/yyyy') }} -
                      {{ item.end_date | date('dd/MM/yyyy') }}</p
                    >
                    <p v-if="isDiscount(item.type)">
                      Giá trị áp dụng tối thiểu:
                      {{ item.min_apply | formatPrice }}</p
                    >
                  </div>
                  <div class="action">
                    <button
                      class="btn"
                      :class="getClassBtn(item)"
                      @click="useCouponHandler(item)"
                    >
                      {{ getTxtButton(item) }}
                    </button>
                    <div
                      style="cursor: pointer"
                      @click="showCouponDetail(item)"
                    >
                      <inline-svg
                        :src="require(`../../../assets/img/info_coupon.svg`)"
                      ></inline-svg>
                      Tìm hiểu thêm
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="d-flex justify-content-between align-items-center paginate"
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
          <EmptySearchResult v-else></EmptySearchResult>
        </div>
      </div>
    </div>
    <modal-detail-coupon
      :visible.sync="visibleModalDetail"
      :coupon="coupon"
      @apply="useCouponHandler"
    >
    </modal-detail-coupon>
  </div>
</template>
<script>
import EmptySearchResult from '../../../components/shared/EmptySearchResult'
import { truncate } from '@core/utils/string'
import mixinRoute from '@core/mixins/route'
import mixinTable from '@core/mixins/table'
import { mapActions, mapState } from 'vuex'
import { FETCH_LIST_COUPONS, FETCH_COUNT_COUPONS, APPLY_COUPON } from '../store'
import ModalDetailCoupon from '../components/ModalDetailCoupon'
import {
  MAP_COUPON_TEXT,
  COUPON_TYPE_MONEY,
  COUPON_TYPE_DISCOUNT_PERCENT,
  COUPON_TYPE_DISCOUNT_MONEY,
} from '../constants'
import { formatPrice } from '@core/utils/formatter'
import { timeSince } from '@core/utils/datetime'

export default {
  name: 'ListCoupon',
  mixins: [mixinRoute, mixinTable],
  components: { EmptySearchResult, ModalDetailCoupon },
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
      visibleModalDetail: false,
      coupon: {},
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
        const text_head =
          type === COUPON_TYPE_DISCOUNT_PERCENT
            ? `Giảm ngay ${value}% tối đa ${formatPrice(max_apply)}`
            : type === COUPON_TYPE_DISCOUNT_MONEY
            ? `Giảm ngay ${formatPrice(max_apply)}`
            : `Tặng ngay ${formatPrice(value)}`
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
          is_used: used === quantity,
          max_apply: type == COUPON_TYPE_MONEY ? 0 : max_apply,
          min_apply: type === COUPON_TYPE_MONEY ? 0 : min_apply,
          value,
          text_head,
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
    isDisabled(item) {
      return item.is_expired || item.is_used
    },
    getIconCoupon(type) {
      if (type === COUPON_TYPE_DISCOUNT_PERCENT) {
        return 'discount_percent.svg'
      }
      return 'money_coupon.svg'
    },
    showCouponDetail(coupon) {
      this.coupon = coupon
      this.visibleModalDetail = true
    },
    getClassBtn(item) {
      if (item.is_expired) {
        return 'btn-danger'
      }
      if (item.is_used) {
        return 'btn-default'
      }
      return 'btn-primary'
    },
    getTxtButton(item) {
      if (item.is_expired) {
        return 'Hết hiệu lực'
      }
      if (item.is_used) {
        return 'Đã sử dụng'
      }
      return 'Sử dụng'
    },
    isDiscount(type) {
      return (
        type === COUPON_TYPE_DISCOUNT_PERCENT ||
        type === COUPON_TYPE_DISCOUNT_MONEY
      )
    },
    async useCouponHandler({ type, code, is_expired, is_used }) {
      if (is_expired || is_used) {
        return
      }

      if (type !== COUPON_TYPE_MONEY) {
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
