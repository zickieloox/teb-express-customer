import http from '@core/services/http'
export default {
  /**
   * fetch package
   * @param payload
   * @return {*}
   */
  fetchPackage(payload) {
    return http.get(`/packages/${payload}`)
  },
  fetchListPackages(payload) {
    return http.get(`/packages?${buildQueryString(payload.body)}`)
  },
  countListPackages(payload) {
    return http.get(`/packages/count?${buildQueryString(payload.body)}`)
  },
}
