import http from '@core/services/http'
import { buildQueryString } from '@core/utils/url'
export default {
  /**
   * fetch package
   * @param payload
   * @return {*}
   */
  fetchPackage(payload) {
    return http.get(`/packages/${payload.id}?${buildQueryString(payload.body)}`)
  },
  fetchListPackages(payload) {
    return http.get(`/packages?${buildQueryString(payload.body)}`)
  },
  countListPackages(payload) {
    return http.get(`/packages/count?${buildQueryString(payload.body)}`)
  },
}
