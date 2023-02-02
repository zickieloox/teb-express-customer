import api from '../api'

export const CREATE_ORDER = 'createOrder'
export const FETCH_LIST_ORDERS = 'fetchListOrders'
export const FETCH_COUNT_ORDERS = 'fetchCountOrders'
export const FETCH_DETAIL_ORDER = 'fetchDetailOrder'

/**
 * State
 */
export const state = {
  order: {},
  orders: [],
  count: 0,
}

/**
 * Mutation
 */
export const mutations = {
  [FETCH_LIST_ORDERS]: (state, payload) => {
    state.orders = payload
  },
  [FETCH_COUNT_ORDERS]: (state, payload) => {
    state.count = payload
  },
  [FETCH_DETAIL_ORDER]: (state, payload) => {
    state.order = payload
  },
}

export const actions = {
  async [FETCH_DETAIL_ORDER]({ commit }, payload) {
    const res = await api.fetchDetail(payload)
    if (!res || res.error) {
      commit(FETCH_DETAIL_ORDER, {})
      return { success: false, message: res.errorMessage || '' }
    }

    commit(FETCH_DETAIL_ORDER, res)
    return { success: true }
  },

  async [FETCH_LIST_ORDERS]({ commit }, payload) {
    const res = await api.fetchList(payload)
    if (!res || res.error) {
      commit(FETCH_LIST_ORDERS, [])
      return { success: false, message: res.errorMessage || '' }
    }

    commit(FETCH_LIST_ORDERS, res.orders)
    return { success: true }
  },

  async [FETCH_COUNT_ORDERS]({ commit }, payload) {
    const res = await api.fetchCount(payload)
    if (!res || res.error) {
      commit(FETCH_COUNT_ORDERS, 0)
      return { success: false, message: res.errorMessage || '' }
    }

    commit(FETCH_COUNT_ORDERS, res.count)
    return { success: true }
  },
}
