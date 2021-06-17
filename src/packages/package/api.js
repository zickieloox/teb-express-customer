import http from '@core/services/http'
import { buildQueryString } from '@core/utils/url'
export default {
  /**
   * fetch package
   * @param payload
   * @return {*}
   */
  fetchPackage(payload) {
    return http.get(`/packages/${payload}`)
  },

  /**
   * fetch package
   * @param payload
   * @return {*}
   */
  fetchListProduct() {
    return http.get(`/products`)
  },
  fetchListPackages(payload) {
    return http.get(`/packages?${buildQueryString(payload)}`)
  },
  countListPackages(payload) {
    return http.get(`/packages/count?${buildQueryString(payload)}`)
  },
}
