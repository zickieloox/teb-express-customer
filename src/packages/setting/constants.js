export const COUPON_TYPE_MONEY = 1
export const COUPON_TYPE_DISCOUNT_MONEY = 2
export const COUPON_TYPE_DISCOUNT_PERCENT = 3
export const COUPON_NO_USED = 0
export const COUPON_USED = 1
export const COUPON_KEY_STATUS_ALL = 'all'
export const COUPON_KEY_STATUS_CURRENT = 'current'
export const COUPON_KEY_STATUS_USED = 'used'

export const MAP_COUPON_TEXT = {
  [COUPON_TYPE_MONEY]: 'Tặng tiền',
  [COUPON_TYPE_DISCOUNT_MONEY]: 'Giảm giá',
  [COUPON_TYPE_DISCOUNT_PERCENT]: 'Giảm giá',
}

export const LIST_DEFAULT_FIELD = [
  {
    key: 0,
    name: 'Tên người nhận',
    require: true,
  },
  {
    key: 1,
    name: 'Số điện thoại người nhận',
    require: false,
  },
  {
    key: 2,
    name: 'Địa chỉ nhận',
    require: true,
  },
  {
    key: 3,
    name: 'Địa chỉ nhận phụ',
    require: false,
  },
  {
    key: 4,
    name: 'Thành phố',
    require: true,
  },
  {
    key: 5,
    name: 'Mã vùng',
    require: true,
  },
  {
    key: 6,
    name: 'Mã bưu điện',
    require: true,
  },
  {
    key: 7,
    name: 'Mã quốc gia',
    require: true,
  },
  {
    key: 8,
    name: 'Mã đơn hàng',
    require: true,
  },
  {
    key: 9,
    name: 'Chi tiết sản phẩm',
    require: true,
  },
  {
    key: 10,
    name: 'Trọng lượng (gram)',
    require: true,
  },
  {
    key: 11,
    name: 'Dài (cm)',
    require: true,
  },
  {
    key: 12,
    name: 'Rộng (cm)',
    require: true,
  },
  {
    key: 13,
    name: 'Cao (cm)',
    require: true,
  },
  {
    key: 14,
    name: 'Dịch vụ',
    require: true,
  },
  {
    key: 15,
    name: 'SKU',
    require: false,
  },
  {
    key: 16,
    name: 'Inclue Battery',
    require: false,
  },
]

export const COUPON_STATUS_TAB = [
  {
    value: COUPON_KEY_STATUS_ALL,
    text: 'Tất cả',
  },
  {
    value: COUPON_KEY_STATUS_CURRENT,
    text: 'Hiện có',
  },
  {
    value: COUPON_KEY_STATUS_USED,
    text: 'Đã sử dụng',
  },
]
