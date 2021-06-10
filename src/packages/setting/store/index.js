import { ROLE_CUSTOMER } from '@core/constants'
import api from '../api'
import AuthService from '@core/services/auth'
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

    const data = Object.assign({}, res.user, {
      access_token: res.access_token,
    })
    if (data.role !== ROLE_CUSTOMER) {
      return
    }

    AuthService.set(data)
    commit(UPDATE_USER, data)
    return { error: false }
  },
}
