import http from '@core/services/http'

export default {
  getPrice(payload) {
    return http.post(`/prices`, payload)
  },
  getLogs(payload) {
    return http.post(`/packages/logs`, {
      codes: payload,
    })
  },
}
