import api from '../api'

export const SET_LOG = 'setLog'
export const SET_PACKAGE = 'setPackage'
export const SET_CODE = 'setCode'
export const GET_LOGS = 'getLogs'
export const COUNT_LOG = 'countLogs'
export const SET_CODES = 'setCodes'

export const state = {
  services: [],
  price: 0.0,
  logs: [],
  packages: [],
  code: '',
  countPackages: 0,
  count_status: [],
  codes: [],
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
  [COUNT_LOG]: (state, payload) => {
    state.countPackages = payload.count
    state.count_status = payload.status_count
  },
  [SET_CODES]: (state, payload) => {
    state.codes = payload
  },
}

export const actions = {
  async getLogs({ commit }, payload) {
    let result = { error: false }
    let [list, count] = await Promise.all([
      api.getLogs(payload),
      api.countLogs(payload),
    ])
    if (!list.logs || !list.packages || !count) {
      result = { error: true, message: list.errorMessage || '' }
    }
    commit(SET_LOG, list.logs)
    commit(SET_PACKAGE, list.packages)
    commit(COUNT_LOG, count)

    return result
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
