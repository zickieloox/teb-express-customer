export const PackageStatusInit = 1
export const PackageStatusWaitingPaid = 2
export const PackageStatusWattingTransport = 3
export const PackageStatusTransporting = 4
export const PackageStatusTransported = 5
export const PackageStatusWatingProcess = 6
export const PackageStatusShipping = 7
export const PackageStatusShipSuccess = 8
export const PackageStatusReturn = 9
export const PackageStatusCancel = 10
export const PACKAGE_STATUS_TAB = [
  {
    value: PackageStatusInit,
    text: 'Tạo mới',
  },
  {
    value: PackageStatusWaitingPaid,
    text: 'Chờ thanh toán',
  },
  {
    value: PackageStatusWattingTransport,
    text: 'Chờ lấy',
  },
  {
    value: PackageStatusTransporting,
    text: 'Đang vận chuyển',
  },
  {
    value: PackageStatusTransported,
    text: 'Đã lấy',
  },
  {
    value: PackageStatusWatingProcess,
    text: 'Chờ xử lý',
  },
  {
    value: PackageStatusShipping,
    text: 'Đang giao',
  },
  {
    value: PackageStatusShipSuccess,
    text: 'Giao thành công',
  },
  {
    value: PackageStatusReturn,
    text: 'Trả hàng',
  },
  {
    value: PackageStatusCancel,
    text: 'Đã huỷ',
  },
]
