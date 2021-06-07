import http from '@core/services/http'
import { buildQueryString } from '@core/utils/url'

export default {
  fetchStatisticTotalSales(payload = {}) {
    return http.get(
      `/statistics/referred-users?${buildQueryString(
        payload
      )}&start_date=1970-01-01&end_date=2025-01-01`,
      payload
    )
  },
  fetchStatisticTotalUsers(payload = {}) {
    return http.get(
      `/statistics/ref-total-sale?${buildQueryString(
        payload
      )}&start_date=1970-01-01&end_date=2025-01-01`
    )
  },
  fetchUsersByRole(payload) {
    return http.get(`admin/fulfillshop/roles?${buildQueryString(payload)}`)
  },
  countUsersByRole(payload) {
    return http.get(`/fulfill/users/roles/count?${buildQueryString(payload)}`)
  },
  fetchUsersByRef(payload) {
    return http.get(
      `/admin/fulfill/users/referred-users?${buildQueryString(payload)}`
    )
  },
  fetchProductTypes(payload = {}) {
    return http.get(
      `/admin/fulfill/products/bases?${buildQueryString(payload)}`
    )
  },
  fetchAllProductBases(payload = {}) {
    return http.get(`/fulfill/orders/bases/all?${buildQueryString(payload)}`)
  },
  fetchShops(payload = {}) {
    return http.get(`/admin/fulfill/shops?${buildQueryString(payload)}`)
  },
  fetchShopCount(payload = {}) {
    return http.get(`/admin/fulfill/shops/count?${buildQueryString(payload)}`)
  },
  fetchProviders(payload = {}) {
    return http.get(`/v2/products/providers?${buildQueryString(payload)}`)
  },
  fetchNotifications(payload = {}) {
    return http.get(
      `/fulfill/users/notifications/es?${buildQueryString(payload)}`
    )
  },
  fetchAllNotifications() {
    return http.get(`/fulfill/users/notifications/es`)
  },
  fetchAllNotification(payload = {}) {
    return http.get(
      `/fulfill/users/notifications/es?${buildQueryString(payload)}`
    )
  },
  countNotifications(payload = {}) {
    return http.get(
      `/fulfill/users/notifications/count/es?${buildQueryString(payload)}`
    )
  },
  readNotifications(payload = {}) {
    return http.put(`/fulfill/users/notifications/read/es`, { ids: payload })
  },
  fetchLineships(payload = {}) {
    return http.get(
      `/admin/fulfill/products/lineships?${buildQueryString(payload)}`
    )
  },
}
