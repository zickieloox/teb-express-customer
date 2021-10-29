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

export const PackageStatusCreatedText = 'created'
export const PackageStatusPendingPickupText = 'pending-pickup'
export const PackageStatusProcessingText = 'processing'
export const PackageStatusInTransitText = 'in-transit'
export const PackageStatusDeliveredText = 'delivered'
export const PackageStatusReturnText = 'return'
export const PackageStatusCancelledText = 'cancelled'

export const PACKAGE_STATUS_TAB = [
  {
    value: '',
    text: 'Tất cả',
  },
  {
    value: PackageStatusCreatedText,
    text: 'Tạo mới',
  },
  {
    value: PackageStatusPendingPickupText,
    text: 'Chờ lấy',
  },
  {
    value: PackageStatusProcessingText,
    text: 'Đang xử lý',
  },
  {
    value: PackageStatusInTransitText,
    text: 'Đang giao',
  },
  {
    value: PackageStatusDeliveredText,
    text: 'Giao thành công',
  },
  {
    value: PackageStatusReturnText,
    text: 'Trả hàng',
  },
  {
    value: PackageStatusCancelledText,
    text: 'Đã huỷ',
  },
]

export const MAP_NAME_STATUS_PACKAGE = {
  ['']: {
    value: '-',
    class: '',
  },
  [PackageStatusCreatedText]: {
    value: 'Tạo mới',
    class: 'badge-default',
  },
  [PackageStatusPendingPickupText]: {
    value: 'Chờ lấy',
    class: 'badge-await',
  },
  [PackageStatusProcessingText]: {
    value: 'Đang xử lý',
    class: 'badge-pending',
  },
  [PackageStatusInTransitText]: {
    value: 'Đang giao',
    class: 'badge-primary',
  },
  [PackageStatusDeliveredText]: {
    value: 'Giao thành công',
    class: 'badge-success',
  },
  [PackageStatusReturnText]: {
    value: 'Trả hàng',
    class: 'badge-returned',
  },
  [PackageStatusCancelledText]: {
    value: 'Đã hủy',
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
]

export const DELIVER_LOG_PACKAGE = {
  [PackageStatusInTransit]: 'In transit',
  [PackageStatusCreated]: ' Label created',
  [PackageStatusPendingPickup]: 'Label confirmed',
  [PackageStatusRePendingPickup]: 'Label confirmed',
  [PackageStatusPicked]: 'Your package has been received by LionBay',
  [PackageStatusCancelled]: 'Label canceled',
  [PackageStatusReturned]: ' Package returned',
  [PackageStatusDelivered]: 'Delivered',
  [PackageStatusWareHouseExport]:
    'Your package is on the way to international airport',
}

export const ROLE_ADMIN = 'admin'
export const ROLE_SUPPORT = 'support'
export const ROLE_ACCOUNTANT = 'accountant'
