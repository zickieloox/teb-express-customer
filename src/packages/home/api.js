import http from '@core/services/http'
import { buildQueryString } from '@core/utils/url'

export default {
  fetchAnalytics(payload) {
    return http.get(`/analytics?${buildQueryString(payload)}`)
  },
}
