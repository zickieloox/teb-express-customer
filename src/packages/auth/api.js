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
    return http.post('/auth/forgot-password', payload)
  },
  resetPass(payload) {
    return http.post('/auth/reset-password', payload)
  },
  verifyEmail(payload) {
    return http.post('/auth/verify-email', payload)
  },
  resendEmail(payload) {
    return http.post('/auth/resend-email', payload)
  },
  getInfoInvite(code) {
    return http.get(`/auth/invite?code=${code}`)
  },
  getRefInfo(code) {
    return http.get(`/auth/ref/info?refer_code=${code}`)
  },
}
