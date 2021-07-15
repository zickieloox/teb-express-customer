export const PackageStatusCreated = 1
export const PackageStatusPendingPickup = 2
export const PackageStatusPickedUp = 3
export const PackageStatusProcessing = 4
export const PackageStatusInTransit = 5
export const PackageStatusDelivered = 6
export const PackageStatusReturn = 7
export const PackageStatusCancelled = 8

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
    class: 'badge-primary',
  },
  [PackageStatusPendingPickupText]: {
    value: 'Chờ lấy',
    class: 'badge-success',
  },
  [PackageStatusProcessingText]: {
    value: 'Đang xử lý',
    class: 'badge-success',
  },
  [PackageStatusInTransitText]: {
    value: 'Đang giao',
    class: 'badge-success',
  },
  [PackageStatusDeliveredText]: {
    value: 'Giao thành công',
    class: 'badge-success',
  },
  [PackageStatusReturnText]: {
    value: 'Trả hàng',
    class: 'badge-success',
  },
  [PackageStatusCancelledText]: {
    value: 'Đã hủy',
    class: 'badge-success',
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
]

export const DELIVER_LOG_PACKAGE = {
  // [PackageStatusInit]: 'Đơn hàng được tạo mới',
  // [PackageStatusWattingTransport]: 'Đơn hàng đang chờ lấy',
  // [PackageStatusCancel]: 'Đơn hàng đã bị hủy',
}

export const ROLE_ADMIN = 'admin'
export const ROLE_SUPPORT = 'support'
