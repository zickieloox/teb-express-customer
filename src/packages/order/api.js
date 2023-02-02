import http from '@core/services/http'
import { buildQueryString } from '@core/utils/url'

export default {
  create(payload) {
    return http.post(`/orders`, payload)
  },

  fetchDetail(id) {
    return http.get(`/packages/${id}`)
  },

  fetchList(payload) {
    return http.get(`/orders?${buildQueryString(payload)}`)
  },

  fetchCount(payload) {
    return http.get(`/orders/count?${buildQueryString(payload)}`)
  },
}
