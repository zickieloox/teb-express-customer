export const PackageStatusDeactive = 0
export const PackageStatusCreated = 1
export const PackageStatusPendingPickup = 2
export const PackageStatusRePendingPickup = 3
export const PackageStatusPicked = 10
export const PackageStatusWareHouseLabeled = 11
export const PackageStatusWareHouseInContainer = 12
export const PackageStatusWareHouseInShipment = 13
export const PackageStatusWareHouseExport = 14
export const PackageStatusInTransit = 30
export const PackageStatusDelivered = 60
export const PackageStatusReturned = 40
export const PackageStatusCancelled = 50
export const PackageStatusExpired = 70

export const PackageStatusCreatedText = 'pending'
export const PackageStatusPendingPickupText = 'pre-transit'
export const PackageStatusProcessingText = 'processing'
export const PackageStatusInTransitText = 'in-transit'
export const PackageStatusDeliveredText = 'delivered'
export const PackageStatusAlertText = 'alert'
export const PackageStatusCancelledText = 'canceled'
export const PackageStatusExpiredText = 'expired'
export const PackageStatusUndelivered = 'undelivered'
export const PackageStatusReturnText = 'return'

export const PACKAGE_STATUS_TAB = [
  {
    value: '',
    text: 'All',
  },
  {
    value: PackageStatusCreatedText,
    text: 'Pending',
  },
  {
    value: PackageStatusPendingPickupText,
    text: 'Pre-Transit',
  },
  {
    value: PackageStatusProcessingText,
    text: 'Processing',
  },
  {
    value: PackageStatusInTransitText,
    text: 'In-Transit',
  },
  {
    value: PackageStatusDeliveredText,
    text: 'Delivered',
  },
  {
    value: PackageStatusCancelledText,
    text: 'Canceled',
  },
  {
    value: PackageStatusExpiredText,
    text: 'Expired',
  },
]

export const MAP_NAME_STATUS_PACKAGE = {
  ['']: {
    value: '-',
    class: '',
  },
  [PackageStatusCreatedText]: {
    value: 'pending',
    class: 'badge-default',
  },
  [PackageStatusPendingPickupText]: {
    value: 'Pre-Transit',
    class: 'badge-await',
  },
  [PackageStatusProcessingText]: {
    value: 'processing',
    class: 'badge-pending',
  },
  [PackageStatusInTransitText]: {
    value: 'in-Transit',
    class: 'badge-primary',
  },
  [PackageStatusDeliveredText]: {
    value: 'delivered',
    class: 'badge-success',
  },
  [PackageStatusAlertText]: {
    value: 'alert',
    class: 'badge-alert',
  },
  [PackageStatusCancelledText]: {
    value: 'canceled',
    class: 'badge-cancel',
  },
  [PackageStatusExpiredText]: {
    value: 'expired',
    class: 'badge-cancel',
  },
}

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
  'Mã đơn hàng',
]

export const DELIVER_LOG_PACKAGE = {
  [PackageStatusInTransit]: 'Arriving at international airport to go abroad',
  [PackageStatusPendingPickup]: 'Shipping label created, LionBay awaiting item',
  [PackageStatusRePendingPickup]:
    'Shipping label created, LionBay awaiting item',
  [PackageStatusPicked]: 'Accepted at LionBay Processing	Center',
  [PackageStatusCancelled]: 'Label canceled',
  [PackageStatusDelivered]: 'Delivered',
  [PackageStatusWareHouseExport]: 'Departed from LionBay Processing Center',
}

export const ROLE_ADMIN = 'admin'
export const ROLE_SUPPORT = 'support'
export const ROLE_ACCOUNTANT = 'accountant'
