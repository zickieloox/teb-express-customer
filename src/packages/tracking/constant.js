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
    class: '  ',
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

export const DELIVER_LOG_PACKAGE = {
  [PackageStatusInTransit]: 'Đơn hàng đang giao',
  [PackageStatusCreated]: 'Đơn hàng được tạo mới',
  [PackageStatusPendingPickup]: 'Đơn hàng đang chờ lấy',
  [PackageStatusRePendingPickup]: 'Đơn hàng đã được chuyển lại',
  [PackageStatusPicked]: 'Đơn hàng được xác nhận đã giao cho nhân viên kho',
  [PackageStatusCancelled]: 'Đơn hàng đã bị hủy',
  [PackageStatusReturned]: 'Đơn hàng bị trả trong quá trình vận chuyển',
  [PackageStatusDelivered]: 'Đơn hàng đã được giao',
  [PackageStatusWareHouseExport]: 'Đơn hàng đã xuất kho',
}

export const ROLE_ADMIN = 'admin'
export const ROLE_SUPPORT = 'support'
export const ROLE_ACCOUNTANT = 'accountant'
