<template>
  <div class="modal__detail-coupon">
    <p-modal :active="visible" @close="handleClose">
      <template slot="header">
        <div class="d-flex justify-content-between align-items-center">
          <div class="icon">
            <inline-svg
              :src="require(`../../../assets/img/${getIconCoupon}`)"
            ></inline-svg>
          </div>
          <div class="header_title">
            <h2>{{ getHeader }}</h2>
            <span class="badge badge-round coupon-type">{{
              getCouponType
            }}</span>
          </div>
        </div>
        <button
          type="button"
          class="close"
          aria-label="Close"
          @click="handleClose('x')"
        >
          <span aria-hidden="true">
            <img src="~@/assets/img/x.svg" alt="close" />
          </span>
        </button>
      </template>

      <template v-if="coupon">
        <div class="row">
          <div class="col-6">
            Mã:
          </div>
          <div class="col-6">
            {{ coupon.code }}
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            Ngày bắt đầu:
          </div>
          <div class="col-6">
            {{ coupon.start_date | date('dd/MM/yyyy HH:mm:ss') }}
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            Ngày kết thúc:
          </div>
          <div class="col-6">
            {{ coupon.end_date | date('dd/MM/yyyy HH:mm:ss') }}
          </div>
        </div>
        <div class="row" v-if="coupon.type != typeGifMoney">
          <div class="col-6">
            Giá trị áp dụng tối thiểu:
          </div>
          <div class="col-6">
            {{ coupon.min_apply | formatPrice }}
          </div>
        </div>
        <div class="row" v-if="coupon.max_apply">
          <div class="col-6">
            Giá trị giảm tối đa:
          </div>
          <div class="col-6">
            {{ coupon.max_apply | formatPrice }}
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            Giá trị giảm:
          </div>
          <div class="col-6">
            {{ getDiscountValue }}
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            Số lượng còn lại:
          </div>
          <div class="col-6">
            {{ coupon.quantity - coupon.used }}
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            Trạng thái:
          </div>
          <div class="col-6">
            <span
              class="badge badge-round badge-status"
              :class="`badge-${getClassStatus}`"
              >{{ getStatus }}</span
            >
          </div>
        </div>
      </template>

      <template slot="footer" v-if="!hiddenButton">
        <button
          :class="`btn-${getClassBtn}`"
          class="pull-right btn ml-2"
          @click="handleSave"
          style="width: 100%"
        >
          {{ getTxtButton }}
        </button>
      </template>
    </p-modal>
  </div>
</template>

<script>
import {
  COUPON_TYPE_DISCOUNT_MONEY,
  COUPON_TYPE_DISCOUNT_PERCENT,
  COUPON_TYPE_MONEY,
} from '../constants'
import { formatPrice } from '@core/utils/formatter'
export default {
  name: 'ModalDetailCoupon',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    coupon: {
      type: Object,
      default: () => {},
    },
    hiddenButton: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    getHeader() {
      console.log(this.hiddenButton)
      return this.coupon
        ? this.coupon.type === COUPON_TYPE_DISCOUNT_PERCENT
          ? `Giảm ngay ${this.coupon.value}% tối đa ${formatPrice(
              this.coupon.max_apply
            )}`
          : this.coupon.type === COUPON_TYPE_DISCOUNT_MONEY
          ? `Giảm ngay ${formatPrice(this.coupon.value)}`
          : `Tặng ngay ${formatPrice(this.coupon.value)}`
        : ''
    },
    typeGifMoney() {
      return COUPON_TYPE_MONEY
    },
    getClassStatus() {
      if (this.coupon && this.coupon.is_expired) {
        return 'danger'
      }
      if (this.coupon && this.coupon.is_used) {
        return 'default'
      }
      return 'primary'
    },
    isStopAction() {
      return this.coupon && (this.coupon.is_expired || this.coupon.is_used)
    },
    getClassBtn() {
      if (this.coupon && this.coupon.is_expired) {
        return 'danger'
      }
      if (this.coupon && this.coupon.is_used) {
        return 'default'
      }
      return 'primary'
    },
    getTxtButton() {
      if (this.coupon && this.coupon.is_expired) {
        return 'Hết hiệu lực'
      }
      if (this.coupon && this.coupon.is_used) {
        return 'Đã sử dụng'
      }
      return 'Sử dụng'
    },
    getStatus() {
      if (this.coupon.is_expired) {
        return 'Hết hiệu lực'
      }
      if (this.coupon.is_used) {
        return 'Đã sử dụng'
      }
      return 'Còn hiệu lực'
    },
    getDiscountValue() {
      return this.coupon
        ? this.coupon.type === COUPON_TYPE_DISCOUNT_PERCENT
          ? `${this.coupon.value}%`
          : `${formatPrice(this.coupon.value)}`
        : ''
    },
    getCouponType() {
      return this.coupon
        ? this.coupon.type === COUPON_TYPE_DISCOUNT_PERCENT
          ? 'Coupon giảm giá (%)'
          : this.coupon.type === COUPON_TYPE_DISCOUNT_MONEY
          ? 'Coupon giảm giá ($)'
          : 'Coupon tặng tiền ($)'
        : ''
    },
    getIconCoupon() {
      if (this.coupon && this.coupon.type === COUPON_TYPE_DISCOUNT_PERCENT) {
        return 'discount_percent.svg'
      }
      return 'money_coupon.svg'
    },
  },
  data() {
    return {}
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
      this.$emit('close', true)
    },
    handleSave() {
      if (this.isStopAction) {
        return
      }
      this.$emit('apply', this.coupon)
    },
  },
  watch: {},
}
</script>
