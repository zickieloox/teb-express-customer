import http from '@core/services/http'
import { buildQueryString } from '@core/utils/url'

export default {
  /**
   * get detail bill
   * @param payload
   * @return {*}
   */
  fetchBillDetail(payload) {
    return http.get(`/bills?${buildQueryString(payload)}`)
  },

  /**
   * get list bill
   * @param payload
   * @return {*}
   */
  fetchBillList(payload) {
    return http.get(`/bills/list?${buildQueryString(payload)}`)
  },
  /**
   * get detail bill
   * @param payload
   * @return {*}
   */
  fetchBillCount(payload) {
    return http.get(`/bills/count?${buildQueryString(payload)}`)
  },

  /**
   * get extra fee
   * @param payload
   * @return {*}
   */
  fetchExtraFee(payload) {
    return http.get(`/bills/fee/${payload.code}?${buildQueryString(payload)}`)
  },
  fetchTransactions(payload) {
    return http.get(`/transactions?${buildQueryString(payload)}`)
  },
  countTransactions(payload) {
    return http.get(`/transactions/count?${buildQueryString(payload)}`)
  },
  createTopup() {
    return http.post('/transactions/top-up')
  },
  updateTopup(payload) {
    return http.post(`/transactions/top-up/update/${payload.id}`, payload.body)
  },
  createTransaction(payload) {
    return http.post(`/transactions`, payload)
  },
  /**
   * get rate exchange
   * @return {*}
   */
  fetchRateExchange() {
    return http.get(`/transactions/rate-exchange`)
  },
}
