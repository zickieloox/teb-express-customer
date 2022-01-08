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
export const GET_COUNT = 'getCount'
export const GET_NOTIFICATION = 'getNotification'
import addresses from '../../../assets/json/address.json'
import union from 'lodash/union'
import { NotificationRead } from '../constants'
export const state = {
  user: {},
  addresses: [],
  isDebt: false,
  notifications: [],
  notificationAll: [],
  countNoti: 0,
  countNotiAll: 0,
}

export const getters = {
  [GET_COUNT](state) {
    return state.countNoti
  },
  [GET_NOTIFICATION](state) {
    return state.notifications
  },
  getListIDNotificationUnread: (state) => {
    return state.notifications.reduce((ids, item) => {
      if (item.readed === 0) {
        ids.push(item.id)
      }
      return ids
    }, [])
  },
}

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
  [READ_NOTIFICATION]: (state, ids) => {
    if (state.countNoti > 0) {
      state.countNoti = state.countNoti - parseInt(ids.length)
    } else {
      state.countNoti = 0
    }

    state.notifications = state.notifications.map((item) => {
      if (ids.indexOf(item.id) !== -1) {
        item.readed = NotificationRead
      }

      return item
    })
    state.notificationAll = state.notificationAll.map((item) => {
      if (ids.indexOf(item.id) !== -1) {
        item.readed = NotificationRead
      }

      return item
    })
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
    let notiIds = union(getters.getListIDNotificationUnread, payload)
    if (notiIds.length === 0) {
      return result
    }
    let read = await api.readNotification(payload)
    if (!read.success) {
      result = {
        success: false,
        message: read.errorMessage || '',
      }
    }
    commit(READ_NOTIFICATION, notiIds)
    return result
  },
  async fetchNotifications({ commit }, payload) {
    let result = { success: true }
    let [list, count] = await Promise.all([
      api.fetchNotifications({ page: payload.page, limit: payload.limit }),
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
