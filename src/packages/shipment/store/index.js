import api from '../api'

export const FETCH_LIST_SHIPMENTS = 'fetchListShipments'
export const FETCH_COUNT_SHIPMENTS = 'fetchCountShipments'
export const FETCH_DETAIL_SHIPMENTS = 'fetchDetailShipments'
export const IMPORT_PACKAGE_FBA = 'importPackageFba'

export const state = {
  shipment: {},
  shipments: [],
  count: 0,
}

export const mutations = {
  [FETCH_LIST_SHIPMENTS]: (state, payload) => {
    state.shipments = payload || []
  },
  [FETCH_COUNT_SHIPMENTS]: (state, payload) => {
    state.count = payload || 0
  },
  [FETCH_DETAIL_SHIPMENTS]: (state, payload) => {
    state.shipment = payload || {}
  },
}

export const actions = {
  async [FETCH_LIST_SHIPMENTS]({ commit }, payload) {
    const res = api.fetchListShipment(payload)
    if (!res || res.error) {
      commit(FETCH_LIST_SHIPMENTS, [])
      return { error: true, message: res.errorMessage }
    }

    commit(FETCH_LIST_SHIPMENTS, res.shipments)
    return { error: false }
  },
  async [FETCH_COUNT_SHIPMENTS]({ commit }, payload) {
    const res = api.fetchCountShipment(payload)
    if (!res || res.error) {
      commit(FETCH_COUNT_SHIPMENTS, 0)
      return { error: true, message: res.errorMessage }
    }

    commit(FETCH_COUNT_SHIPMENTS, res.count)
    return { error: false }
  },
  async [FETCH_DETAIL_SHIPMENTS]({ commit }, payload) {
    const res = api.fetchDetailShipment(payload)
    if (!res || res.error) {
      commit(FETCH_DETAIL_SHIPMENTS, {})
      return { error: true, message: res.errorMessage }
    }

    commit(FETCH_DETAIL_SHIPMENTS, res.shipment)
    return { error: false }
  },
  // eslint-disable-next-line no-unused-vars
  async [IMPORT_PACKAGE_FBA]({ commit }, payload) {
    const response = await api.importFbaPackage(payload)

    if (
      response &&
      typeof response.errors !== 'undefined' &&
      typeof response.total !== 'undefined' &&
      (response.errors.length || response.total > 0)
    ) {
      return {
        success: true,
        ...response,
      }
    }

    return {
      success: false,
      message: response.errorMessage || '',
    }
  },
}
