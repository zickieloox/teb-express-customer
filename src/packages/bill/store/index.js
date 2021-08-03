import api from '../api'
export const FETCH_BILL_DETAIL = 'fetchBillDetail'
export const FETCH_BILL_EXTRA = 'fetchBillExtra'
export const COUNT_FEE_CREATE = 'countFeeCreate'
export const FETCH_FEE_CREATE = 'fetchFeeCreate'
export const COUNT_FEE_EXTRA = 'countFeeExtra'
export const FETCH_FEE_EXTRA = 'fetchFeeExtra'
export const FETCH_TRANSACTION = 'fetchTransaction'
export const COUNT_TRANSACTION = 'countTransaction'
export const COUNT_BILLS = 'countBills'
export const FETCH_BILL_LIST = 'fetchBillList'

export const state = {
  bill: {},
  feeEdit: [],
  feeCreate: [],
  feeExtra: [],
  countEdit: 0,
  countCreate: 0,
  countExtra: 0,
  transactions: [],
  count: 0,
  countBills: 0,
  bills: [],
}

export const mutations = {
  [FETCH_BILL_DETAIL]: (state, payload) => {
    state.bill = payload
  },
  [COUNT_FEE_CREATE]: (state, payload) => {
    state.countCreate = payload
  },
  [FETCH_FEE_CREATE]: (state, payload) => {
    state.feeCreate = payload
  },
  [COUNT_FEE_EXTRA]: (state, payload) => {
    state.countExtra = payload
  },
  [FETCH_FEE_EXTRA]: (state, payload) => {
    state.feeExtra = payload
  },
  [FETCH_TRANSACTION]: (state, payload) => {
    state.balance = payload.balance
    state.process_money = payload.process_money
    state.transactions = payload.transactions
  },
  [COUNT_TRANSACTION]: (state, payload) => {
    state.count = payload
  },
  [FETCH_BILL_LIST]: (state, payload) => {
    state.bills = payload
  },
  [COUNT_BILLS]: (state, payload) => {
    state.countBills = payload
  },
}

export const actions = {
  // eslint-disable-next-line no-unused-vars
  async fetchBillList({ commit }, payload) {
    let result = { success: true }
    let [list, count] = await Promise.all([
      api.fetchBillList(payload),
      api.fetchBillCount(payload),
    ])
    if (!list.bills || !count) {
      count = { count: 0 }
      result = {
        success: false,
        message: list.errorMessage || '',
      }
    }
    commit(FETCH_BILL_LIST, list.bills)
    commit(COUNT_BILLS, count.count)
    return result
  },

  async fetchBillDetail({ commit }, payload) {
    const res = await api.fetchBillDetail(payload)
    if (!res || res.error) {
      return { success: false, message: res.errorMessage || '' }
    }
    commit(FETCH_FEE_CREATE, res.bill.package)
    commit(COUNT_FEE_CREATE, res.count_package)

    return { success: true, bill: res.bill, total: res.total_fee }
  },
  async fetchBillExtra({ commit }, payload) {
    const res = await api.fetchExtraFee(payload)
    if (!res || res.error) {
      return { success: false, message: res.errorMessage || '' }
    }
    commit(FETCH_FEE_EXTRA, res.fees)
    commit(COUNT_FEE_EXTRA, res.count)

    return { success: true }
  },
  async [FETCH_TRANSACTION]({ commit }, payload) {
    const [res, count] = await Promise.all([
      api.fetchTransactions(payload),
      api.countTransactions(payload),
    ])
    if (!res || res.error || count.error) {
      return { error: true, message: res.errorMessage || '' }
    }
    commit(FETCH_TRANSACTION, res)
    commit(COUNT_TRANSACTION, count.count)
    return { error: false }
  },
}
