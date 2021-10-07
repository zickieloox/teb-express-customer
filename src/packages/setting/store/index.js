import api from '../api'

/**
 * Type
 */
export const UPDATE_USER = 'updateUser'
export const LIST_SENDER = 'listSender'
export const COUNT_SENDER = 'countSender'
export const CREATE_SENDER = 'createSender'
export const UPDATE_SENDER = 'updateSender'
export const GET_SENDER = 'getSender'
export const GET_USER_TOKEN = 'getUserToken'
export const RESET_USER_TOKEN = 'resetUserToken'

export const UPLOAD_TEMPLATE_FILE = 'uploadTemplateFile'
export const CREATE_TEMPLATE_IMPORT_ORDER = 'createTempateImportOrder'
export const FETCH_IMPORT_ORDER_TEMPLATES = 'fetchImportOrderTemplates'
export const FETCH_TEMPLATES = 'fetchTemplates'
export const COUNT_TEMPLATES = 'countTemplates'
export const DELETE_TEMPLATES = 'deleteTemplates'
export const UPDATE_IMPORT_ORDER_TEMPLATE = 'updateImportOrderTemplate'
export const DOWNLOAD_TEMPLATE_FILE = 'downloadTemplateFile'
/**
 * State
 */
export const state = {
  user: {},
  senders: [],
  count_sender: 0,
  user_token: '',
  templates: [],
  count: 0,
}

/**
 * Getters
 */
export const getters = {
  [GET_SENDER](state) {
    let senders = state.senders.map((item) => {
      return { sender_id: item.id, name: item.name }
    })
    return senders
  },
}
/**
 * Mutation
 */
export const mutations = {
  [UPDATE_USER]: (state, payload) => {
    state.user = payload
  },
  [LIST_SENDER]: (state, payload) => {
    state.senders = payload
  },
  [COUNT_SENDER]: (state, payload) => {
    state.count_sender = payload
  },
  [GET_USER_TOKEN]: (state, payload) => {
    state.user_token = payload
  },
  [FETCH_TEMPLATES]: (state, payload) => {
    state.templates = payload
  },
  [COUNT_TEMPLATES]: (state, payload) => {
    state.count = payload
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

  async listSender({ commit }, payload) {
    let success = true
    let message = ''

    let [list, count] = await Promise.all([
      api.listSender(payload),
      api.countSenders(payload),
    ])
    if (!list || list.error || !count) {
      list = []
      count = 0
      success = false
      message = list.errorMessage || ''
    }

    commit(LIST_SENDER, list.senders)
    commit(COUNT_SENDER, count.count)
    return { success, message, items: list.designs }
  },

  /**
   * Create sender
   * @param commit
   * @param payload
   */
  // eslint-disable-next-line
  async createSender({ commit }, payload) {
    const response = await api.createSender(payload.body)

    if (response && response.success) {
      return { success: true }
    }

    return {
      success: false,
      message: response.errorMessage || '',
    }
  },

  /**
   * Update sender
   * @param commit
   * @param payload
   */
  // eslint-disable-next-line
  async updateSender({ commit }, payload) {
    const response = await api.updateSender(payload)

    if (response && response.success) {
      return { success: true }
    }

    return {
      success: false,
      message: response.errorMessage || '',
    }
  },

  /**
   * Get user token
   * @param commit
   * @param payload
   */
  // eslint-disable-next-line
  async getUserToken({ commit }, payload) {
    const response = await api.getUserToken(payload)
    if (response && response.token) {
      commit(GET_USER_TOKEN, response.token)
      return { success: true }
    }

    return {
      success: false,
      message: response.errorMessage || '',
    }
  },

  /**
   * Get user token
   * @param commit
   * @param payload
   */
  // eslint-disable-next-line
  async resetUserToken({ commit }, payload) {
    const response = await api.resetUserToken(payload)

    if (response && response.success) {
      return { success: true }
    }

    return {
      success: false,
      message: response.errorMessage || '',
    }
  },

  /**
   * Fetch design list
   * @param commit
   * @param payload
   * @return {Promise<{success: boolean, message: string, items: (Array)}>}
   */
  // eslint-disable-next-line no-unused-vars
  async uploadTemplateFile({ commit }, payload) {
    let result = { success: true }
    let response = await api.uploadTemplateFile(payload)

    if (!response || response.error) {
      result = {
        success: false,
        message: response.errorMessage || '',
      }
    }
    result = { ...result, ...response }
    return result
  },

  // eslint-disable-next-line no-unused-vars
  async createTempateImportOrder({ commit }, payload) {
    let result = { success: true }
    let response = await api.createTemplateImportOrder(payload)

    if (!response || response.error) {
      result = {
        success: false,
        message: response.errorMessage || '',
      }
    }
    return result
  },

  async [FETCH_IMPORT_ORDER_TEMPLATES]({ commit }, payload) {
    let result = { success: true }
    let [list, count] = await Promise.all([
      api.fetchListTemplates(payload),
      api.countListTemplates(payload),
    ])

    if (!list.templates || !count) {
      list.templates = []
      count = { count: 0 }
      result = {
        success: false,
        message: list.errorMessage || '',
      }
    }

    commit(FETCH_TEMPLATES, list.templates)
    commit(COUNT_TEMPLATES, count.count)
    return result
  },

  // eslint-disable-next-line no-unused-vars
  async [DELETE_TEMPLATES]({ commit }, payload) {
    let result = { success: true }
    let response = await api.deleteTemplates(payload)

    if (!response || response.error) {
      result = {
        success: false,
        message: response.errorMessage || '',
      }
    }
    return result
  },
  // eslint-disable-next-line no-unused-vars
  async [UPDATE_IMPORT_ORDER_TEMPLATE]({ commit }, payload) {
    const id = payload.id
    delete payload.id
    const res = await api.updateTemplate(id, payload)
    if (!res || res.error) {
      return { success: false, message: res.errorMessage || '' }
    }
    return { success: true }
  },

  // eslint-disable-next-line no-unused-vars
  async [DOWNLOAD_TEMPLATE_FILE]({ commit }, payload) {
    let result = { success: true }
    let response = await api.downloadTemplateFile(payload)
    if (!response || response.error) {
      return {
        success: false,
        message: response.errorMessage || '',
      }
    }
    result.blob = response
    return result
  },
}
