import http from '@core/services/http'
import { buildQueryString } from '@core/utils/url'

export default {
  fetchStatisticOrders(payload = {}) {
    const date = {
      start_date: '2018-01-01',
      end_date: '2025-01-01',
    }

    return http.get(
      `/v2/statistics/order?${buildQueryString(
        Object.assign({}, date, payload)
      )}`
    )
  },
  fetchStatisticTopSalesCountries(payload = {}) {
    const date = {
      start_date: '2018-01-01',
      end_date: '2025-01-01',
    }

    return http.get(
      `/v2/statistics/top-selling-countries?${buildQueryString(
        Object.assign({}, date, payload)
      )}`
    )
  },

  fetchOrders(payload) {
    return http.get(`/fulfill/orders/seller?${buildQueryString(payload)}`)
  },

  /**
   * Fetch order count
   * @param payload
   * @return {*}
   */
  fetchOrderCount(payload) {
    return http.get(`/fulfill/orders/count/seller?${buildQueryString(payload)}`)
  },

  fetchPoint() {
    return http.get(`/fulfill/contest/user-point`)
  },

  fetchProductBases(payload) {
    return http.get(
      `/admin/fulfill/products/public/bases?${buildQueryString(payload)}`
    )
  },

  transferBalance(coin) {
    return http.post('/fulfill/contest/transfer-balance', {
      poin_transfer: coin,
    })
  },
}
