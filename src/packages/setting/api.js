import http from '@core/services/http'

export default {
  /**
   * update user
   * @param payload
   * @return {*}
   */
  updateUser(payload) {
    return http.put('/users/update', payload)
  },
}
