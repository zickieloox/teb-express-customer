import http from '@core/services/http'
import { buildQueryString } from '@core/utils/url'

export default {
  getUser() {
    return http.get(`/users`)
  },
  fetchNotifications(payload) {
    return http.get(`/users/notifications?${buildQueryString(payload)}`)
  },
  countNotifications(payload) {
    return http.get(`/users/notifications/count?${buildQueryString(payload)}`)
  },
  readNotifications() {
    return http.put(`/users/notifications/read/all`)
  },
  readNotification(payload) {
    return http.get(`/users/notifications/read/${payload}`)
  },
  fetchWarehouses(payload) {
    return http.get(`/packages/warehouses?${buildQueryString(payload)}`)
  },
  getConfigs() {
    return http.get(`/configs`)
  },
}
