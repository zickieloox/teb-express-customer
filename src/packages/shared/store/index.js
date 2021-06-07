import api from '../api'
import countries from '../data/countries'
import shippings from '../data/shippings'
import union from 'lodash/union'

export const FETCH_STATISTIC_TOTAL_SALES = 'fetchStatisticTotalSales'
export const FETCH_STATISTIC_TOTAL_USERS = 'fetchStatisticTotalUsers'
export const FETCH_USERS_BY_ROLE = 'fetchUsersByRole'
export const COUNT_USERS_BY_ROLE = 'countUsersByRole'
export const FETCH_USERS_BY_REF = 'fetchUsersByRef'
export const FETCH_PRODUCT_TYPES = 'fetchProductTypes'
export const FETCH_ALL_PRODUCT_BASES = 'fetchAllProductBases'
export const FETCH_COUNTRIES = 'fetchCountries'
export const FETCH_SHOPS = 'fetchShops'
export const FETCH_COUNT_SHOP = 'fetchCountShop'
export const FETCH_PROVIDERS = 'fetchProviders'
export const FETCH_SHIPPING_METHOS = 'fetchShippingMethos'
export const FETCH_NOTIFICATIONS = 'fetchNotifications'
export const PUSH_NOTIFICATION = 'pushNotification'
export const COUNT_NOTIFICATIONS = 'countNotifications'
export const COUNT_NOTIFICATIONS_UNREAD = 'countNotificationsUnread'
export const READ_NOTIFICATIONS = 'readNotifications'
export const SHOW_NOTIFICATION_MESSAGE = 'showNotificationMessage'
export const READ_ONE_NOTIFICATIONS = 'readOneNotifications'
export const FETCH_All_NOTIFICATIONS = 'fetchAllNotifications'
export const FETCH_All_NOTIFICATION_CLEAR = 'fetchAllNotificationClear'
export const SET_LOADING = 'setLoading'
export const FETCH_LINESHIPS = 'fetchLineships'

export const state = {
  shippings: {},
  statisticTotalSales: 0,
  statisticTotalUsers: 0,
  users: [],
  countUsers: 0,
  usersRef: [],
  productTypes: [],
  productBases: [],
  countries: [],
  shops: [],
  countShop: 0,
  providers: [],
  notifications: [],
  notificationsAll: [],
  notificationsAllClear: [],
  countNoti: 0,
  countNotiUnread: 0,
  notificationMessage: '',
  notificationLabel: '',
  isLoading: false,
  lineships: [],
}

export const getters = {
  getShippingMethodTitle: (state) => (code) => {
    return state.shippings[code] | ''
  },
  getListIDNotificationUnread: (state) => {
    return state.notificationsAllClear.reduce((ids, item) => {
      if (item.status === 'unread') {
        ids.push(item.id)
      }
      return ids
    }, [])
  },
}

export const mutations = {
  [FETCH_STATISTIC_TOTAL_SALES]: (state, payload) => {
    state.statisticTotalSales = payload
  },
  [FETCH_STATISTIC_TOTAL_USERS]: (state, payload) => {
    state.statisticTotalUsers = payload
  },
  [FETCH_USERS_BY_ROLE]: (state, payload) => {
    state.users = payload
  },
  [COUNT_USERS_BY_ROLE]: (state, payload) => {
    state.countUsers = payload
  },
  [FETCH_USERS_BY_REF]: (state, payload) => {
    state.usersRef = payload
  },
  [FETCH_PRODUCT_TYPES]: (state, payload) => {
    state.productTypes = payload
  },
  [FETCH_ALL_PRODUCT_BASES]: (state, payload) => {
    state.productBases = payload
  },
  [FETCH_COUNTRIES]: (state, payload) => {
    state.countries = payload
  },
  [FETCH_SHOPS]: (state, payload) => {
    state.shops = payload
  },
  [FETCH_COUNT_SHOP]: (state, payload) => {
    state.countShop = payload
  },
  [FETCH_PROVIDERS]: (state, payload) => {
    state.providers = payload
  },
  [FETCH_SHIPPING_METHOS]: (state, payload) => {
    state.shippings = payload
  },
  [PUSH_NOTIFICATION]: (state, payload) => {
    state.countNotiUnread++
    state.notifications.unshift(payload)
    state.notificationsAll.unshift(payload)
    state.notificationsAllClear.unshift(payload)
  },
  [FETCH_NOTIFICATIONS]: (state, payload) => {
    state.notifications = state.notifications.concat(payload)
  },
  [FETCH_All_NOTIFICATIONS]: (state, payload) => {
    state.notificationsAll = payload
  },
  [FETCH_All_NOTIFICATION_CLEAR]: (state, payload) => {
    state.notificationsAllClear = payload
  },
  [COUNT_NOTIFICATIONS]: (state, payload) => {
    state.countNoti = payload
  },
  [COUNT_NOTIFICATIONS_UNREAD]: (state, payload) => {
    state.countNotiUnread = parseInt(payload)
  },
  [READ_NOTIFICATIONS]: (state, ids) => {
    if (state.countNotiUnread > 0) {
      state.countNotiUnread = state.countNotiUnread - parseInt(ids.length)
    } else {
      state.countNotiUnread = 0
    }
    state.notifications = state.notifications.map((item) => {
      if (ids.indexOf(item.id) !== -1) {
        item.status = 'readed'
      }

      return item
    })
    state.notificationsAll = state.notificationsAll.map((item) => {
      if (ids.indexOf(item.id) !== -1) {
        item.status = 'readed'
      }

      return item
    })
    state.notificationsAllClear = state.notificationsAllClear.map((item) => {
      if (ids.indexOf(item.id) !== -1) {
        item.status = 'readed'
      }

      return item
    })
  },
  [SHOW_NOTIFICATION_MESSAGE]: (state, payload) => {
    state.notificationMessage = payload.message || ''
    state.notificationLabel = payload.label || ''
  },
  [READ_ONE_NOTIFICATIONS]: (state, ids) => {
    if (state.countNotiUnread > 0) {
      state.countNotiUnread = state.countNotiUnread - parseInt(ids.length)
    } else {
      state.countNotiUnread = 0
    }
    state.notifications = state.notifications.map((item) => {
      if (ids.indexOf(item.id) !== -1) {
        item.status = 'readed'
      }

      return item
    })
    state.notificationsAll = state.notificationsAll.map((item) => {
      if (ids.indexOf(item.id) !== -1) {
        item.status = 'readed'
      }

      return item
    })
    state.notificationsAllClear = state.notificationsAllClear.map((item) => {
      if (ids.indexOf(item.id) !== -1) {
        item.status = 'readed'
      }

      return item
    })
  },
  [SET_LOADING]: (state, payload) => {
    state.isLoading = payload
  },

  [FETCH_LINESHIPS]: (state, payload) => {
    state.lineships = payload
  },
}

export const actions = {
  /**
   *
   * @param commit
   * @param payload
   * @return {Promise<{success: boolean}>}
   */
  async fetchStatisticTotalSales({ commit }, payload) {
    let result = { success: true }
    let response = await api.fetchStatisticTotalSales(payload)

    if (response && response.errorMessage) {
      result = { success: false, message: response.errorMessage }
      response = {
        user_active: 0,
      }
    }

    commit(FETCH_STATISTIC_TOTAL_SALES, response.user_active)
    return result
  },

  /**
   *
   * @param commit
   * @param payload
   * @return {Promise<{success: boolean}>}
   */
  async fetchStatisticTotalUsers({ commit }, payload) {
    let result = { success: true }
    let response = await api.fetchStatisticTotalUsers(payload)

    if (response && response.errorMessage) {
      result = { success: false, message: response.errorMessage }
      response = {
        total: 0,
      }
    }

    commit(FETCH_STATISTIC_TOTAL_USERS, response.total)
    return result
  },

  /**
   * Fetch users by role
   * @param commit
   * @param payload
   * @return {Promise<{success: boolean}>}
   */
  async fetchUsersByRole({ commit }, payload) {
    let result = { success: true }
    let response = await api.fetchUsersByRole(payload)

    if (response && response.errorMessage) {
      response.users = []
      result = { success: false, message: response.errorMessage }
    }

    commit(FETCH_USERS_BY_ROLE, response.users)

    return result
  },
  async countUsersByRole({ commit }, payload) {
    let result = { success: true }
    let response = await api.countUsersByRole(payload)

    if (response && response.errorMessage) {
      response.count = 0
      result = { success: false, message: response.errorMessage }
    }

    commit(COUNT_USERS_BY_ROLE, response.count)

    return result
  },
  /**
   * Fetch users by ref
   * @param commit
   * @param payload
   * @return {Promise<{success: boolean}>}
   */
  async fetchUsersByRef({ commit }, payload) {
    let result = { success: true }
    let response = await api.fetchUsersByRef(payload)
    if (response && response.errorMessage) {
      response.users = []
      result = { success: false, message: response.errorMessage }
    }

    commit(FETCH_USERS_BY_REF, response.users)

    return result
  },

  /**
   * Fetch product types
   * @param commit
   * @param payload
   * @return {Promise<{success: boolean}>}
   */
  async fetchProductTypes({ commit }, payload = {}) {
    let result = { success: true }
    let response = await api.fetchProductTypes(payload)

    if (response && response.errorMessage) {
      response.product_types = []
      result = { success: false, message: response.errorMessage }
    }

    commit(FETCH_PRODUCT_TYPES, response.product_types)

    return result
  },

  /**
   * Fetch all product bases
   * @param commit
   * @param payload
   * @return {Promise<{success: boolean}>}
   */
  async fetchAllProductBases({ commit }, payload = {}) {
    let result = { success: true }
    let response = await api.fetchAllProductBases(payload)

    if (response && response.errorMessage) {
      response.product_bases = []
      result = { success: false, message: response.errorMessage }
    }

    commit(FETCH_ALL_PRODUCT_BASES, response.product_bases)

    return result
  },

  /**
   * Fetch countries
   * @param commit
   */
  fetchCountries({ commit }) {
    commit(FETCH_COUNTRIES, countries)
  },

  fetchShippingMethos({ commit }) {
    commit(FETCH_SHIPPING_METHOS, shippings)
  },

  /**
   * Fetch shops
   * @param commit
   * @param payload
   * @return {Promise<{success: boolean}>}
   */
  async fetchShops({ commit }, payload) {
    let result = { success: true }
    let [list, count] = await Promise.all([
      api.fetchShops(payload),
      api.fetchShopCount(payload),
    ])

    if (!list || list.errorMessage || !count) {
      result = {
        success: false,
        message: list.errorMessage,
      }

      list = {
        shops: [],
      }
      count = { count: 0 }
    }

    commit(FETCH_SHOPS, list.shops)
    commit(FETCH_COUNT_SHOP, count.count)

    return result
  },

  async fetchProviders({ commit }, payload) {
    let result = { success: true }
    let response = await api.fetchProviders(payload)

    if (response && response.errorMessage) {
      response.product_types = []
      result = { success: false, message: response.errorMessage }
    }

    commit(FETCH_PROVIDERS, response.providers)

    return result
  },

  async countNotifications({ commit }, playload) {
    let result = { success: true }
    let res = await api.countNotifications(playload)

    if (res && res.errorMessage) {
      res.count = 0
      result = { success: false, message: res.errorMessage }
    }

    commit(COUNT_NOTIFICATIONS, res.count)
    return result
  },

  async countNotificationsUnread({ commit }, playload) {
    let result = { success: true }
    let res = await api.countNotifications(playload)

    if (res && res.errorMessage) {
      res.count = 0
      result = { success: false, message: res.errorMessage }
    }

    commit(COUNT_NOTIFICATIONS_UNREAD, res.count)
    return result
  },

  async fetchNotifications({ commit }, playload) {
    let result = { success: true }
    let response = await api.fetchNotifications(playload)

    if (response && response.errorMessage) {
      response.notifications = []
      result = { success: false, message: response.errorMessage }
      return
    }

    commit(FETCH_NOTIFICATIONS, response.notifications || [])
    return result
  },
  async fetchAllNotifications({ commit }, payload) {
    let result = { success: true }
    let response = await api.fetchAllNotification(payload)

    if (response && response.errorMessage) {
      response.notifications = []
      result = { success: false, message: response.errorMessage }
    }
    commit(FETCH_All_NOTIFICATIONS, response.notifications || [])
    return result
  },
  async fetchAllNotificationClear({ commit }) {
    let result = { success: true }
    let response = await api.fetchAllNotifications()

    if (response && response.errorMessage) {
      response.notifications = []
      result = { success: false, message: response.errorMessage }
    }

    commit(FETCH_All_NOTIFICATION_CLEAR, response.notifications || [])
    return result
  },

  async readNotifications({ commit, getters }, ids = []) {
    let result = { success: true }

    let notiIds = union(getters.getListIDNotificationUnread, ids)
    if (notiIds.length === 0) {
      return result
    }

    let response = await api.readNotifications(notiIds)
    if (response && response.errorMessage) {
      result = { success: false, message: response.errorMessage }
    } else {
      commit(READ_NOTIFICATIONS, notiIds)
    }

    return result
  },

  showNotificationMessage({ commit }, payload) {
    commit(SHOW_NOTIFICATION_MESSAGE, payload)
  },

  async readOneNotifications({ commit }, payload) {
    let result = { success: true }
    let notiIds = union(getters.getListIDNotificationUnread, payload)
    if (notiIds.length === 0) {
      return result
    }

    let response = await api.readNotifications(notiIds)
    if (response && response.errorMessage) {
      result = { success: false, message: response.errorMessage }
    } else {
      commit(READ_ONE_NOTIFICATIONS, notiIds)
    }

    return result
  },
  [SET_LOADING]({ commit }, payload) {
    commit(SET_LOADING, payload)
  },

  async fetchLineships({ commit }, payload) {
    let result = { success: true }
    let response = await api.fetchLineships(payload)

    if (response && response.errorMessage) {
      response.lineships = []
      result = { success: false, message: response.errorMessage }
    }

    commit(FETCH_LINESHIPS, response.lineships)

    return result
  },
}
