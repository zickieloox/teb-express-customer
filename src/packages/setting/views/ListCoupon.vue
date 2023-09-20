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
          <cuopon-status-tab
            :count-status="countByStatus"
            v-model="filter.status"
          ></cuopon-status-tab>
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
                    <div class="d-flex">
                      <span class="cp-code" :title="item.code">{{
                        item.code
                      }}</span>
                      <span class="cp-count">
                        <span v-if="item.quantity"
                          >Còn {{ item.quantity - item.used }} Coupons</span
                        >
                        <span v-else>{{ item.point }} ĐIỂM</span>
                      </span>
                    </div>
                    <h2>{{ item.text_head }}</h2>
                    <p v-if="isDiscount(item.type)">
                      Giá trị áp dụng tối thiểu:
                      {{ item.min_apply | formatPrice }}</p
                    >
                    <p>HSD: {{ item.end_date | date('dd/MM/yyyy') }}</p>
                  </div>
                  <div class="action">
                    <button
                      v-if="item.quantity"
                      class="btn"
                      :class="getClassBtn(item)"
                      @click="useCouponHandler(item)"
                    >
                      {{ getTxtButton(item) }}
                    </button>
                    <button
                      v-else
                      class="btn btn-primary"
                      @click="showModalBuyCopon(item)"
                    >
                      Mua
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
    <modal-buy-coupon
      :visible.sync="isVisibleBuyCoupon"
      :coupon="submitCoupon"
      :loading="isSubmitting"
      @buy="buyCouponHandler"
    >
    </modal-buy-coupon>
  </div>
</template>
<script>
import EmptySearchResult from '../../../components/shared/EmptySearchResult'
import ModalBuyCoupon from '../components/ModalBuyCoupon'
import { truncate } from '@core/utils/string'
import mixinRoute from '@core/mixins/route'
import mixinTable from '@core/mixins/table'
import { mapActions, mapState } from 'vuex'
import { GET_USER } from '../../../packages/shared/store'
import {
  FETCH_LIST_COUPONS,
  FETCH_COUNT_COUPONS,
  APPLY_COUPON,
  BUY_COUPON,
} from '../store'
import ModalDetailCoupon from '../components/ModalDetailCoupon'
import {
  MAP_COUPON_TEXT,
  COUPON_TYPE_MONEY,
  COUPON_TYPE_DISCOUNT_PERCENT,
  COUPON_TYPE_DISCOUNT_MONEY,
  COUPON_KEY_STATUS_ALL,
} from '../constants'
import { formatPrice } from '@core/utils/formatter'
import { timeSince } from '@core/utils/datetime'
import CuoponStatusTab from '../components/CouponStatusTab'

export default {
  name: 'ListCoupon',
  mixins: [mixinRoute, mixinTable],
  components: {
    EmptySearchResult,
    ModalDetailCoupon,
    CuoponStatusTab,
    ModalBuyCoupon,
  },
  data() {
    return {
      filter: {
        page: 1,
        limit: 25,
        search: '',
        status: COUPON_KEY_STATUS_ALL,
      },
      visibleModal: false,
      visibleModalDelete: false,
      visibleModalDetail: false,
      coupon: {},
      isSubmitting: false,
      isFetching: false,
      isVisibleBuyCoupon: false,
      submitCoupon: {},
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
      countByStatus: (state) => state.count_coupon_by_status,
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
            ? `Giảm ngay ${formatPrice(value)}`
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
          is_used: used === quantity && quantity && used,
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
    ...mapActions('shared', [GET_USER]),
    ...mapActions('setting', [
      FETCH_LIST_COUPONS,
      FETCH_COUNT_COUPONS,
      APPLY_COUPON,
      BUY_COUPON,
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
    showModalBuyCopon(coupon) {
      this.submitCoupon = coupon
      this.isVisibleBuyCoupon = true
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
    async useCouponHandler({ type, code }) {
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
    async buyCouponHandler(quantity) {
      if (this.isSubmitting) return
      const payload = {
        coupon_id: this.submitCoupon.id,
        quantity: quantity,
      }
      this.isSubmitting = true
      const res = await this[BUY_COUPON](payload)
      this.isSubmitting = false

      if (!res.success) {
        this.$toast.error(res.message)
        return
      }

      this.$toast.success(`Mua coupon “${this.submitCoupon.code}” thành công !`)
      this.isVisibleBuyCoupon = false
      await this[GET_USER]()
      this.init()
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
      this.visibleModalDetail = false
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
