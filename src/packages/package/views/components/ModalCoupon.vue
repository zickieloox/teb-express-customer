<template>
  <p-modal
    class="modal_coupon"
    :active="visible"
    title="Chọn coupon"
    @close="handleClose"
    :width="600"
  >
    <template v-if="coupons.length > 0">
      <div class="row">
        <div
          class="col-12 mb-16"
          :class="{ disabled: isDisabled(item) }"
          v-for="item in listCoupons"
          :key="item.id"
        >
          <div class="item d-flex justify-content-between align-items-center">
            <div class="icon">
              <inline-svg
                :src="
                  require(`../../../../assets/img/${getIconCoupon(item.type)}`)
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
    <template slot="footer">
      <div
        class="d-flex justify-content-between align-items-center"
        style="width: 100%;"
      >
        <div style="min-width: 160px;">
          <div class="d-flex">
            <div style="width: 50%;">Giảm giá:</div>
            <div style="width: 50%;" class="text-right">
              {{ getDiscount }}
            </div>
          </div>
          <div class="d-flex">
            <div style="width: 50%;">Tổng cước:</div>
            <div class="text-right" style="width: 50%;">
              {{ total | formatPrice }}
            </div>
          </div>
        </div>

        <div class="group-button">
          <p-button type="default" @click="handleClose" :disabled="loading">
            Bỏ qua
          </p-button>
          <p-button type="primary" @click="handleApply" :loading="loading">
            Áp dụng
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
  },
  computed: {
    getDiscount() {
      const coupon = this.coupons.find(({ id }) => {
        return id === this.selected
      })
      return coupon
        ? coupon.type === COUPON_TYPE_DISCOUNT_PERCENT
          ? (coupon.value * this.total) / 100 > coupon.max_apply
            ? `${formatPrice(coupon.max_apply)}`
            : `${formatPrice(((coupon.value * this.total) / 100).toFixed(2))}`
          : `${formatPrice(coupon.value)}`
        : '-'
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
.modal_coupon .modal-header{
  border-bottom: none;
}
</style>
