import api from '../api'

export const SET_LOG = 'setLog'
export const SET_PACKAGE = 'setPackage'
export const SET_CODE = 'setCode'
export const GET_LOGS = 'getLogs'

export const state = {
  services: [],
  price: 0.0,
  logs: [],
  packages: [],
  code: '',
}

export const mutations = {
  [SET_LOG]: (state, payload) => {
    state.logs = payload
  },
  [SET_PACKAGE]: (state, payload) => {
    state.packages = payload
  },
  [SET_CODE]: (state, payload) => {
    state.code = payload
  },
}

export const actions = {
  async getLogs({ commit }, payload) {
    const res = await api.getLogs(payload)

    if (!res.logs || !res.packages) {
      return { error: true, message: res.errorMessage || '' }
    }
    commit(SET_LOG, res.logs)
    commit(SET_PACKAGE, res.packages)

    return { error: false }
  },
}

export const getters = {
  services(state) {
    let sv = state.services.map((item) => {
      return { code: item.code, label: item.name }
    })
    return sv
  },
}
