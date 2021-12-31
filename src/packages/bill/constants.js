export const EditFeeBill = 8
export const ExtraFeeBill = 7

export const BillCreate = 0
export const BillRefund = 1
export const BillPay = 2

export const BANK = 'Ngân hàng TMCP Hàng Hải Việt Nam - MSB'
export const BRANCH = 'Nam Thăng Long'
export const NAME = 'PHAM QUANG TRUNG'
export const ACCOUNT_NUMBER = '03268 01545 9999'

export const TransactionLogTypeTopup = 1
export const TransactionLogTypePay = 2
export const TransactionLogTypeRefund = 4
export const TransactionLogTypePayoneer = 5
export const TransactionLogTypePingPong = 6

export const TransactionStatusProcess = 1
export const TransactionStatusSuccess = 2
export const TransactionStatusFailure = 3
export const TransactionStatusWaiting = 5

export const MAP_NAME_STATUS_TRANSACTION = {
  [TransactionStatusProcess]: {
    value: 'Chờ xác nhận',
  },
  [TransactionStatusSuccess]: {
    value: 'Thành công',
  },
  [TransactionStatusFailure]: {
    value: 'Từ chối',
  },
}

export const TRANSACTION_STATUS = [
  {
    key: '1',
    name: 'Nạp tiền',
  },
  {
    key: '2',
    name: 'Thanh toán',
  },
  {
    key: '4',
    name: 'Hoàn tiền',
  },
]
