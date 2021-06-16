import api from '../api'
export const UPLOAD_FILE_CLAIM = 'uploadFileClaim'
export const COUNT_CLAIMS = 'countClaims'
export const FETCH_CLAIMS = 'fetchClaims'
export const CREATE_CLAIM = 'createClaim'
export const state = {
  claims: [],
  count: 0,
  ticket: {},
  message: [],
}
export const mutations = {
  [FETCH_CLAIMS]: (state, payload) => {
    state.claims = payload
  },
  [COUNT_CLAIMS]: (state, payload) => {
    state.count = payload
  },
}

export const actions = {
  // eslint-disable-next-line
  async uploadFileClaim({ commit }, payload) {
    let res = await api.uploadFileTicket(payload)

    if (!res || res.error) {
      return { error: true, message: res.errorMessage || '' }
    }
    return { error: false, urls: res.url }
  },

  async [FETCH_CLAIMS]({ commit }, payload) {
    const [res, count] = await Promise.all([
      api.fetchClaim(payload),
      api.countClaim(payload),
    ])
    if (!res || res.error || count.error) {
      return { error: true, message: res.errorMessage || '' }
    }

    commit(FETCH_CLAIMS, res.tickets)
    commit(COUNT_CLAIMS, count.count)

    return { error: false }
  },

  /**
   * Creat Claim
   * @param commit
   * @param payload
   * @returns {Promise<{success: boolean}>}
   */
  // eslint-disable-next-line
  async createClaim({ commit }, payload) {
    let response

    response = await api.createClaim(payload)
    if (!response || response.error) {
      return { error: true, message: response.errorMessage || '' }
    }
    return { error: false }
  },
}
