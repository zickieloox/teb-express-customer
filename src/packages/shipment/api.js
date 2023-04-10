import http from '../../core/services/http'
import { buildQueryString } from '../../core/utils/url'

export default {
  fetchListShipment(payload) {
    return http.get(`/shipments?${buildQueryString(payload)}`)
  },
  fetchCountShipment(payload) {
    return http.get(`/shipments/count?${buildQueryString(payload)}`)
  },
  fetchDetailShipment(id) {
    return http.get(`/shipments/${id}`)
  },
}
