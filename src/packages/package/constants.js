export const PACKAGE_STATUS_DEACTIVATE = 0
export const PACKAGE_STATUS_CREATED = 1
export const PACKAGE_STATUS_PENDING_PICKUP = 2
export const PACKAGE_STATUS_RE_PENDING_PICKUP = 3
export const PACKAGE_STATUS_PICKED = 10
export const PACKAGE_STATUS_WAREHOUSE_LABELED = 11
export const PACKAGE_STATUS_WAREHOUSE_IN_CONTAINER = 12
export const PACKAGE_STATUS_WAREHOUSE_IN_SHIPMENT = 13
export const PACKAGE_STATUS_WAREHOUSE_EXPORT = 14
export const PACKAGE_STATUS_IN_TRANSIT = 30
export const PACKAGE_STATUS_DELIVERED = 60
export const PACKAGE_STATUS_RETURNED = 40
export const PACKAGE_STATUS_CANCELLED = 50
export const PACKAGE_STATUS_EXPIRED = 70
export const PACKAGE_STATUS_RESHIP = 80
export const PACKAGE_STATUS_UNDELIVERED = 90

export const PACKAGE_DELIVERY_LOG_TYPE_RESHIP = 80

export const PACKAGE_STATUS_CREATED_TEXT = 'pending'
export const PACKAGE_STATUS_PENDING_PICKUP_TEXT = 'pre-transit'
export const PACKAGE_STATUS_PROCESSING_TEXT = 'processing'
export const PACKAGE_STATUS_IN_TRANSIT_TEXT = 'in-transit'
export const PACKAGE_STATUS_DELIVERED_TEXT = 'delivered'
export const PACKAGE_STATUS_ALERT_TEXT = 'alert'
export const PACKAGE_STATUS_CANCELLED_TEXT = 'canceled'
export const PACKAGE_STATUS_EXPIRED_TEXT = 'expired'
export const PACKAGE_STATUS_UNDELIVERED_TEXT = 'undelivered'
export const PACKAGE_STATUS_RETURN_TEXT = 'return'

export const PACKAGE_ALERT_TYPE_OVER_PRE_TRANSIT = 1
export const PACKAGE_ALERT_TYPE_WAREHOUSE_RETURN = 2
export const PACKAGE_ALERT_TYPE_HUB_RETURN = 3

export const PACKAGE_STATUS_TAB = [
  {
    value: '',
    text: 'All',
  },
  {
    value: PACKAGE_STATUS_CREATED_TEXT,
    text: 'Pending',
  },
  {
    value: PACKAGE_STATUS_PENDING_PICKUP_TEXT,
    text: 'Pre-Transit',
  },
  {
    value: PACKAGE_STATUS_PROCESSING_TEXT,
    text: 'Processing',
  },
  {
    value: PACKAGE_STATUS_IN_TRANSIT_TEXT,
    text: 'In-Transit',
  },
  {
    value: PACKAGE_STATUS_DELIVERED_TEXT,
    text: 'Delivered',
  },
  {
    value: PACKAGE_STATUS_ALERT_TEXT,
    text: 'Alert',
  },
  {
    value: PACKAGE_STATUS_CANCELLED_TEXT,
    text: 'Canceled',
  },
  {
    value: PACKAGE_STATUS_EXPIRED_TEXT,
    text: 'Expired',
  },
  {
    value: PACKAGE_STATUS_UNDELIVERED_TEXT,
    text: 'Undelivered',
  },
]

export const MAP_STATUS_CLASS_NAME = {
  [PACKAGE_STATUS_CREATED_TEXT]: 'await',
  [PACKAGE_STATUS_PENDING_PICKUP_TEXT]: 'pending',
  [PACKAGE_STATUS_PROCESSING_TEXT]: 'primary',
  [PACKAGE_STATUS_IN_TRANSIT_TEXT]: 'default',
  [PACKAGE_STATUS_DELIVERED_TEXT]: 'success',
  [PACKAGE_STATUS_ALERT_TEXT]: 'alert',
  [PACKAGE_STATUS_CANCELLED_TEXT]: 'danger',
  [PACKAGE_STATUS_EXPIRED_TEXT]: 'expired',
  [PACKAGE_STATUS_UNDELIVERED_TEXT]: 'danger',
}

// cSpell:disable
export const CHANGE_PACKAGE_TYPE = [
  '',
  'Người nhận',
  'Số điện thoại người nhận',
  'Địa chỉ người nhận',
  'Thành phố',
  'Mã vùng',
  'Mã bưu điện',
  'Mã quốc gia',
  'Trọng lượng',
  'Kích thước (DxRxC)',
  'Yêu cầu khi giao',
  'Dịch vụ',
  'Chi tiết hàng hóa',
  'Địa chỉ phụ người nhận',
  'Covid',
  'Quá cỡ',
  'Sửa kích thước',
  'Sửa trọng lượng',
  'Dịch vụ',
  'Sửa đơn',
  'Hoàn tiền',
  'Phí phát sinh khác',
  'Xác nhận xóa cảnh báo địa chỉ không hợp lệ',
  'Bỏ qua kiểm tra địa chỉ bằng API',
  'Reship',
  'Mã đơn hàng',
]
// cSpell:enable

export const DELIVER_LOG_PACKAGE = {
  [PACKAGE_STATUS_IN_TRANSIT]: 'Arriving at international airport to go abroad',
  [PACKAGE_STATUS_PENDING_PICKUP]:
    'Shipping label created, LionBay awaiting item',
  [PACKAGE_STATUS_RE_PENDING_PICKUP]:
    'Shipping label created, LionBay awaiting item',
  [PACKAGE_STATUS_PICKED]: 'Accepted at LionBay Processing	Center',
  [PACKAGE_STATUS_CANCELLED]: 'Label canceled',
  [PACKAGE_STATUS_DELIVERED]: 'Delivered',
  [PACKAGE_STATUS_WAREHOUSE_EXPORT]: 'Departed from LionBay Processing Center',
  [PACKAGE_DELIVERY_LOG_TYPE_RESHIP]: 'Reship package',
}

export const ROLE_ADMIN = 'admin'
export const ROLE_SUPPORT = 'support'
export const ROLE_ACCOUNTANT = 'accountant'
