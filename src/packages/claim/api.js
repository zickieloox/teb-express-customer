import http from '@core/services/http'
import { buildQueryString } from '@core/utils/url'
export default {
  /**
   * upload file claim
   * @param payload
   * @return {*}
   */
  uploadFileTicket(payload) {
    const formData = new FormData()
    formData.append('file', payload.file)
    return http.post(`/tickets/file`, formData)
  },

  /**
   * get list claim
   * @param payload
   * @return {*}
   */
  fetchClaim(payload) {
    return http.get(`/tickets?${buildQueryString(payload)}`)
  },

  /**
   * count list claim
   * @param payload
   * @return {*}
   */
  countClaim(payload) {
    return http.get(`/tickets/count?${buildQueryString(payload)}`)
  },

  /**
   * count list claim by status
   * @param payload
   * @return {*}
   */
  countClaimByStatus(payload) {
    return http.get(`/tickets/count-by-status?${buildQueryString(payload)}`)
  },
  /**
   * count list claim
   * @param payload
   * @return {*}
   */
  createClaim(payload) {
    return http.post(`/tickets`, payload)
  },
}
