export const CLAIM_STATUS_PENDING = 1
export const CLAIM_STATUS_PROCESSED = 2

export const CLAIM_STATUS = {
  'Đang xử lý': CLAIM_STATUS_PENDING,
  'Đã xử lý': CLAIM_STATUS_PROCESSED,
}

export const CLAIM_STATUS_TEXT = {
  [CLAIM_STATUS_PENDING]: 'Đang xử lý',
  [CLAIM_STATUS_PROCESSED]: 'Đã xử lý',
}

export const CLAIMCLAIM_CUSTOMER_REPLY_INIT = 0
export const CLAIM_ADMIN_REPLY = 1

export const MAXIMUM_SIZE = 5

export const MAP_CLAIM_STATUS = {
  [CLAIM_STATUS_PENDING]: {
    text: 'Đang xử lý',
    className: 'pending',
  },
  [CLAIM_STATUS_PROCESSED]: {
    text: 'Đã xử lý',
    className: 'done',
  },
}
