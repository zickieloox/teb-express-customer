import api from '../api'
/**
 * Type
 */
export const UPDATE_USER = 'updateUser'
/**
 * State
 */
export const state = {
  user: {},
}

/**
 * Mutation
 */
export const mutations = {
  [UPDATE_USER]: (state, payload) => {
    state.user = payload
  },
}

/**
 * Actions
 */
export const actions = {
  // eslint-disable-next-line no-unused-vars
  async updateUser({ commit }, payload) {
    const res = await api.updateUser(payload)
    if (!res || res.error) {
      return { error: true, message: res.errorMessage || '' }
    }

    return { error: false }
  },
}
