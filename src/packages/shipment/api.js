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
  importFbaPackage(payload) {
    let formData = new FormData()
    formData.append('file', payload.file)
    formData.append('template_id', payload.template_id)
    return http.post(`/packages/import/fba`, formData)
  },
}
