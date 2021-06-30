import api from '../api'

/**
 * Type
 */
export const CREATE_TOPUP = 'createTopup'
export const UPDATE_TOPUP = 'updateTopup'
export const FETCH_TRANSACTION = 'fetchTransaction'
export const COUNT_TRANSACTION = 'countTransaction'

/**
 * State
 */
export const state = {
  topup: {},
  balance: 0.0,
  unpaid_money: 0.0,
  process_money: 0.0,
  transaction_logs: [],
  count: 0,
}

export const mutations = {
  [CREATE_TOPUP]: (state, payload) => {
    state.topup = payload
  },
  [FETCH_TRANSACTION]: (state, payload) => {
    state.balance = payload.balance
    state.unpaid_money = payload.unpaid_money
    state.process_money = payload.process_money
    state.transaction_logs = payload.transaction_log
  },
  [COUNT_TRANSACTION]: (state, payload) => {
    state.count = payload
  },
}

export const actions = {
  async [FETCH_TRANSACTION]({ commit }, payload) {
    const [res, count] = await Promise.all([
      api.fetchTransactionLogs(payload),
      api.countTransactionLogs(payload),
    ])
    if (!res || res.error || count.error) {
      return { error: true, message: res.errorMessage || '' }
    }
    commit(FETCH_TRANSACTION, res)
    commit(COUNT_TRANSACTION, count.count)
    return { error: false }
  },

  // eslint-disable-next-line no-unused-vars
  async createTopup({ commit }, payload) {
    const res = await api.createTopup(payload)
    if (!res || res.error) {
      return { success: false, message: res.errorMessage || '' }
    }

    commit(CREATE_TOPUP, res.topup)

    return { success: true }
  },

  // eslint-disable-next-line
  async updateTopup({ commit }, payload) {
    const response = await api.updateTopup(payload)

    if (response && response.success) {
      return { success: true }
    }

    return {
      success: false,
      message: response.errorMessage || '',
    }
  },
}
