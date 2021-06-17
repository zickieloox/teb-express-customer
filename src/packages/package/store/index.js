import api from '../api'

/**
 * Type
 */
export const FETCH_PACKAGE_DETAIL = 'fetchPackage'

export const FETCH_LIST_PACKAGES = 'fetchListPackages'
export const COUNT_LIST_PACKAGES = 'countListPackages'
export const FETCH_LIST_PRODUCTS = 'fetchListProducts'
export const IMPORT_PACKAGE = 'importPackage'

export const EXPORT_PACKAGE = 'exportPackage'
/**
 * State
 */
export const state = {
  package_detail: {
    package: {},
    deliver_logs: [],
    price: 0.0,
    extra_fee: {},
  },
  packages: [],
  countPackages: 0,
  count_status: [],
  products: [],
}

/**
 * Mutation
 */
export const mutations = {
  [FETCH_PACKAGE_DETAIL]: (state, payload) => {
    state.package_detail = payload
  },
  [FETCH_LIST_PACKAGES]: (state, payload) => {
    state.packages = payload
  },
  [FETCH_LIST_PRODUCTS]: (state, payload) => {
    state.products = payload
  },
  [COUNT_LIST_PACKAGES]: (state, payload) => {
    state.countPackages = payload.count
    state.count_status = payload.status_count
  },
}

/**
 * Action
 */

export const actions = {
  async fetchPackage({ commit }, payload) {
    const res = await api.fetchPackage(payload)

    if (!res || res.error) {
      return { error: true, message: res.errorMessage || '' }
    }

    commit(FETCH_PACKAGE_DETAIL, res)
  },
  // eslint-disable-next-line no-unused-vars
  async fetchListPackages({ commit }, payload) {
    let result = { success: true }
    let [list, count] = await Promise.all([
      api.fetchListPackages(payload),
      api.countListPackages(payload),
    ])
    if (!list.packages || !count) {
      count = { count: 0 }
      result = {
        success: false,
        message: list.errorMessage || '',
      }
    }
    commit(FETCH_LIST_PACKAGES, list.packages)
    commit(COUNT_LIST_PACKAGES, count)
    return result
  },
  // eslint-disable-next-line no-unused-vars
  async fetchListProducts({ commit }, payload) {
    const res = await api.fetchListProduct()
    if (!res.products) {
      return { error: true, message: res.errorMessage || '' }
    }
    commit(FETCH_LIST_PRODUCTS, res.products)
    return { error: false }
  },
  // eslint-disable-next-line no-unused-vars
  async [IMPORT_PACKAGE]({ commit }, payload) {
    const response = await api.importPackage(payload)

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
  // eslint-disable-next-line no-unused-vars
  async [EXPORT_PACKAGE]({ commit }, payload) {
    let result = { success: true }
    const response = await api.exportPackage(payload)

    if (response.error || response.message) {
      result = {
        success: false,
        message: response.errorMessage || response.error || response.message,
      }
    } else {
      result.url = response.download
    }

    return result
  },
}