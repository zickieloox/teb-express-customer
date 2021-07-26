export const USD_TO_VND = 23022
export const BANK = 'Ngân hàng TMCP Hàng Hải Việt Nam - MSB'
export const BRANCH = 'Nam Thăng Long'
export const NAME = 'DO HAI HUNG'
export const ACCOUNT_NUMBER = '123 4566 8888'

export const TransactionLogTypeTopup = 1
export const TransactionLogTypePay = 2
export const TransactionLogTypeRefund = 4

export const TransactionStatusProcess = 1
export const TransactionStatusSuccess = 2
export const TransactionStatusFailure = 3

export const MAP_NAME_STATUS_TRANSACTION = {
  [TransactionStatusProcess]: {
    value: 'Chờ xác nhận',
  },
  [TransactionStatusSuccess]: {
    value: 'Thành công',
  },
  [TransactionStatusFailure]: {
    value: 'Thất bại',
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
