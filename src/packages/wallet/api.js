import http from '@core/services/http'
import { buildQueryString } from '@core/utils/url'

export default {
  createTopup() {
    return http.post('/transactions/top-up')
  },
  updateTopup(payload) {
    return http.post(`/transactions/top-up/update/${payload.id}`, payload.body)
  },
  fetchTransactions(payload) {
    return http.get(`/transactions?${buildQueryString(payload)}`)
  },
  countTransactions(payload) {
    return http.get(`/transactions/count?${buildQueryString(payload)}`)
  },
}
