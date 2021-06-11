import api from '../api'

export const GET_USER = 'getUser'

export const state = {
  user: {},
}

export const getters = {}

export const mutations = {
  [GET_USER]: (state, payload) => {
    state.user = payload
  },
}

export const actions = {
  /**
   *
   * @param commit
   * @param payload
   * @return {Promise<{success: boolean}>}
   */
  async getUser({ commit }) {
    let result = { success: true }
    let response = await api.getUser()

    if (response && response.errorMessage) {
      result = { success: false, message: response.errorMessage }
      response.user = {}
    }

    commit(GET_USER, response.user)
    return result
  },
}
