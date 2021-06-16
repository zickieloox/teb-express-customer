import api from '../api'

/**
 * Type
 */
export const FETCH_PACKAGE_DETAIL = 'fetchPackage'

export const FETCH_LIST_PACKAGES = 'fetchListPackages'
export const COUNT_LIST_PACKAGES = 'countListPackages'
/**
 * State
 */
export const state = {
  package_detail: {
    package: {},
    deliver_logs: {},
    price: 0.0,
    extra_fee: {},
  },
  packages: [],
  countPackages: 0,
  count_status: [],
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
}
