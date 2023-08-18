<template>
  <p-modal
    class="modal_coupon"
    :active="visible"
    title="Xác nhận tạo tracking"
    @close="handleClose"
    :width="600"
  >
    <div v-html="txt" style="line-height: 20px;margin-bottom: 16px;"> </div>
    <a
      @click="toogleCoupone"
      style="cursor: pointer;color: #00908B;display: inline-block"
    >
      <svg
        style="margin-top: -2px;"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        v-if="!is_use_coupon"
      >
        <path
          d="M2.66667 2H13.3333C13.7015 2 14 2.29848 14 2.66667V13.3333C14 13.7015 13.7015 14 13.3333 14H2.66667C2.29848 14 2 13.7015 2 13.3333V2.66667C2 2.29848 2.29848 2 2.66667 2ZM7.33333 7.33333H4.66667V8.66667H7.33333V11.3333H8.66667V8.66667H11.3333V7.33333H8.66667V4.66667H7.33333V7.33333Z"
          fill="#CFD0D0"
        />
      </svg>
      <svg
        style="margin-top: -2px;"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        v-else
      >
        <path
          d="M2.66667 2H13.3333C13.7015 2 14 2.29848 14 2.66667V13.3333C14 13.7015 13.7015 14 13.3333 14H2.66667C2.29848 14 2 13.7015 2 13.3333V2.66667C2 2.29848 2.29848 2 2.66667 2ZM4.66667 7.33333V8.66667H11.3333V7.33333H4.66667Z"
          fill="#CFD0D0"
        />
      </svg>
      Chọn Coupon
    </a>
    <div class="list_apply_coupon" v-if="is_use_coupon">
      <template v-if="coupons.length > 0">
        <div class="row">
          <div
            class="col-12"
            :class="{ disabled: isDisabled(item) }"
            v-for="item in listCoupons"
            :key="item.id"
          >
            <div class="item d-flex justify-content-between align-items-center">
              <div class="icon">
                <inline-svg
                  :src="
                    require(`../../../../assets/img/${getIconCoupon(
                      item.type
                    )}`)
                  "
                ></inline-svg>
              </div>
              <div class="txt">
                <h2>{{ item.text_head }}</h2>
                <p>Số lượng: {{ item.quantity }}</p>
                <p>Ngày hết hạn: {{ item.end_date | date('dd/MM/yyyy') }}</p>
                <p v-if="isDiscount(item.type)">
                  Giá trị áp dụng tối thiểu:
                  {{ item.min_apply | formatPrice }}</p
                >
              </div>
              <div class="action">
                <p-radio
                  type="info"
                  v-model="selected"
                  :native-value="item.id"
                  :disabled="isDisabled(item)"
                ></p-radio>
                <div class="show-more" @click="showCouponDetail(item)">
                  <inline-svg
                    :src="require(`../../../../assets/img/info_coupon.svg`)"
                  ></inline-svg>
                  Tìm hiểu thêm
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <inline-svg
        v-else
        style="max-width: 100%;"
        :src="require(`../../../../assets/img/coupon_empty.svg`)"
      ></inline-svg>
    </div>
    <template slot="footer">
      <div
        class="d-flex justify-content-between align-items-center"
        style="width: 100%;"
      >
        <div style="min-width: 257px;">
          <div v-if="is_use_coupon">
            <div
              style="width: 124px;float: left;font-weight: 400px;color: #626363;line-height: 20px;margin-right: 16px;"
            >
              <div style="margin-bottom: 4px;">Áp dụng giảm giá:</div>
              <div style="color: #111212;">
                {{ getDiscount | formatPrice }}
              </div>
            </div>
            <div
              style="width: 117px;float: left;;font-weight: 400px;color: #626363;line-height: 20px;"
            >
              <div style="margin-bottom: 4px;">Tổng thanh toán:</div>
              <div style="color: #111212;">
                <b> {{ (total - getDiscount) | formatPrice }}</b>
              </div>
            </div>
          </div>
        </div>

        <div class="group-button">
          <p-button type="default" @click="handleClose" :disabled="loading">
            Bỏ qua
          </p-button>
          <p-button type="primary" @click="handleApply" :loading="loading">
            Tạo tracking
          </p-button>
        </div>
      </div>
    </template>
  </p-modal>
</template>
<script>
import {
  MAP_COUPON_TEXT,
  COUPON_TYPE_MONEY,
  COUPON_TYPE_DISCOUNT_PERCENT,
  COUPON_TYPE_DISCOUNT_MONEY,
} from '../../../setting/constants'
import { formatPrice } from '@core/utils/formatter'
import { timeSince } from '@core/utils/datetime'
export default {
  name: 'ModalCoupon',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    coupons: {
      type: Array,
      default: () => [],
    },
    total: {
      type: Number,
      default: 0,
    },
    eventOut: {
      type: Boolean,
      default: false,
    },
    txt: {
      type: String,
      default: '',
    },
  },
  computed: {
    getDiscount() {
      const coupon = this.coupons.find(({ id }) => {
        return id === this.selected
      })
      return coupon
        ? coupon.type === COUPON_TYPE_DISCOUNT_PERCENT
          ? (coupon.value * this.total) / 100 > coupon.max_apply
            ? coupon.max_apply
            : ((coupon.value * this.total) / 100).toFixed(2)
          : coupon.value
        : 0
    },
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
          is_used: used === quantity,
          max_apply: type === COUPON_TYPE_MONEY ? 0 : max_apply,
          min_apply: type === COUPON_TYPE_MONEY ? 0 : min_apply,
          value,
          text_head,
          is_expired: timeSince(end_date) > 0,
        }
      })
    },
  },
  data() {
    return {
      selected: null,
      is_use_coupon: false,
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
      this.$emit('close')
    },
    handleApply() {
      this.$emit('apply', { id: this.selected })
    },
    showCouponDetail(coupon) {
      this.$emit('show', coupon)
      this.$emit('update:visible', false)
    },
    toogleCoupone() {
      this.is_use_coupon = !this.is_use_coupon
      this.selected = null
    },
    getIconCoupon(type) {
      if (type === COUPON_TYPE_DISCOUNT_PERCENT) {
        return 'discount_percent.svg'
      }
      return 'money_coupon.svg'
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
    isDisabled(item) {
      return (
        item.is_expired ||
        item.is_used ||
        item.min_apply > this.total ||
        timeSince(item.start_date) < 0
      )
    },
    isDiscount(type) {
      return (
        type === COUPON_TYPE_DISCOUNT_PERCENT ||
        type === COUPON_TYPE_DISCOUNT_MONEY
      )
    },
  },
  watch: {
    visible: {
      handler: function() {
        if (this.eventOut) {
          this.selected = null
        }
      },
    },
  },
}
</script>

<style lang="css">
.modal_coupon input::-webkit-input-placeholder {
  text-align: center;
  font-family: Be Vietnam Pro;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
}
.modal_coupon .input-group{
  display: block;
  margin: auto;
  width: 400px;
}

.modal_coupon input[type=text]{
  width: 100% !important;
  padding: 18px 16px;
  border: 1px solid #E1E2E2;
  border-radius: 8px !important;
  height: 56px !important;
}
.modal_coupon h1{
  font-family: Be Vietnam Pro;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
  color: #111212;
  margin-bottom: 24px;
}
.modal_coupon .txt-description{
  font-family: Be Vietnam Pro;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  color: #626363;
  margin-bottom: 24px;
}
.modal_coupon .modal-body{
  padding-bottom: 0;
}
</style>
