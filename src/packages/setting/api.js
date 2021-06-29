import http from '@core/services/http'
import { buildQueryString } from '@core/utils/url'
export default {
  /**
   * update user
   * @param payload
   * @return {*}
   */
  updateUser(payload) {
    return http.put('/users/update', payload)
  },

  /**
   * list senders
   * @param payload
   * @return {*}
   */
  listSender(payload) {
    return http.get(`/users/list-sender?${buildQueryString(payload)}`)
  },

  /**
   * count senders
   * @param payload
   * @return {*}
   */
  countSenders(payload) {
    return http.get(`/users/list-sender/count?${buildQueryString(payload)}`)
  },

  /**
   * Create sender
   * @param payload
   * @return {*}
   */
  createSender(payload) {
    return http.post(`/users/create-sender`, payload)
  },

  /**
   * Update sender
   * @param payload
   * @return {*}
   */
  updateSender(payload) {
    return http.post(`/users/update-sender/${payload.id}`, payload.body)
  },

  /**
   * Get user token
   * @return {*}
   */
  getUserToken() {
    return http.get(`/users/token`)
  },

  /**
   * Reset user token
   * @return {*}
   */
  resetUserToken() {
    return http.put(`/users/token`)
  },
}
