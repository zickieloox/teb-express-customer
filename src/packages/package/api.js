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
}
