import api from '../api'

/**
 * Type
 */
export const FETCH_PACKAGE_DETAIL = 'fetchPackges'

/**
 * State
 */
export const state = {
  package: [],
}

/**
 * Mutation
 */
export const mutations = {
  [FETCH_PACKAGE_DETAIL]: (state, payload) => {
    state.package = payload
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

    commit(FETCH_PACKAGE_DETAIL, res.package)
  },
}
