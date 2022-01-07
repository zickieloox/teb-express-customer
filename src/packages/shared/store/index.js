import api from '../api'

export const GET_USER = 'getUser'
export const CHECKDEBT = 'checkDebt'
export const FETCH_ADDRESSES = 'fetchAddresses'
export const FETCH_NOTIFICATIONS = 'fetchNotifications'
export const FETCH_NOTIFICATIONS_ALL = 'fetchNotificationsAll'
export const COUNT_NOTIFICATIONS = 'countNotifications'
export const COUNT_NOTIFICATIONS_ALL = 'countNotificationsAll'
export const READ_NOTIFICATIONS = 'readNotifications'
export const READ_NOTIFICATION = 'readNotification'
import addresses from '../../../assets/json/address.json'
export const state = {
  user: {},
  addresses: [],
  isDebt: false,
  notifications: [],
  notificationAll: [],
  countNoti: 0,
  countNotiAll: 0,
}

export const getters = {}

export const mutations = {
  [GET_USER]: (state, payload) => {
    state.user = payload
  },
  [CHECKDEBT]: (state, payload) => {
    state.isDebt = payload
  },
  [FETCH_ADDRESSES]: (state, payload) => {
    state.addresses = payload
  },
  [FETCH_NOTIFICATIONS]: (state, payload) => {
    state.notifications = payload
  },
  [FETCH_NOTIFICATIONS_ALL]: (state, payload) => {
    state.notificationAll = payload
  },
  [COUNT_NOTIFICATIONS]: (state, payload) => {
    state.countNoti = payload
  },
  [COUNT_NOTIFICATIONS_ALL]: (state, payload) => {
    state.countNotiAll = payload
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

  /**
   * Fetch addresses
   * @param commit
   */
  fetchAddresses({ commit }) {
    commit(FETCH_ADDRESSES, addresses)
  },

  async readNotifications() {
    let result = { success: true }
    let read = await api.readNotifications()

    if (!read.success) {
      result = {
        success: false,
        message: read.errorMessage || '',
      }
    }
    return result
  },

  // eslint-disable-next-line no-unused-vars
  async readNotification({ commit }, payload) {
    let result = { success: true }
    let read = await api.readNotification(payload)

    if (!read.success) {
      result = {
        success: false,
        message: read.errorMessage || '',
      }
    }
    return result
  },
  async fetchNotifications({ commit }, payload) {
    let result = { success: true }
    let [list, count] = await Promise.all([
      api.fetchNotifications(payload),
      api.countNotifications(payload.count),
    ])
    if (!list.notifications || !count) {
      count = { count: 0 }
      result = {
        success: false,
        message: list.errorMessage || '',
      }
    }
    commit(FETCH_NOTIFICATIONS, list.notifications)
    commit(COUNT_NOTIFICATIONS, count.count)
    return result
  },
  async fetchNotificationsAll({ commit }, payload) {
    let result = { success: true }
    let [list, count] = await Promise.all([
      api.fetchNotifications(payload),
      api.countNotifications(),
    ])
    if (!list.notifications || !count) {
      count = { count: 0 }
      result = {
        success: false,
        message: list.errorMessage || '',
      }
    }
    commit(FETCH_NOTIFICATIONS_ALL, list.notifications)
    commit(COUNT_NOTIFICATIONS_ALL, count.count)
    return result
  },
}
