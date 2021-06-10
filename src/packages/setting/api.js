import http from '@core/services/http'

export default {
  /**
   * Sign up
   * @param payload
   * @return {*}
   */
  signIn(payload) {
    return http.post('/fulfill/auth/sign-in/seller', payload)
  },

  /**
   * Sign up
   * @param payload
   * @return {*}
   */
  signUp(payload) {
    return http.post('/auth/sign-up', {
      user: payload.user,
    })
  },
}
