import http from '@core/services/http'

export default {
  /**
   * Sign up
   * @param payload
   * @return {*}
   */
  signIn(payload) {
    return http.post('/auth/sign-in', payload)
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
  forgot(payload) {
    return http.post('/fulfill/auth/forgot-password/seller', payload)
  },
  resetPass(payload) {
    return http.post('/fulfill/auth/reset-password/seller', payload)
  },
  verifyEmail(payload) {
    return http.post('/fulfill/auth/verify-email/seller', payload)
  },
  resendEmail(payload) {
    return http.post('/fulfill/auth/resend-email/seller', payload)
  },
  accessShop(payload) {
    return http.post(
      '/fulfill/auth/sign-in-by-token/seller',
      {},
      { token: `Bearer ${payload.token}` }
    )
  },
}
