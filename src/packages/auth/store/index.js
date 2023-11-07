import { ROLE_CUSTOMER } from '@core/constants'
import { UserStatusActive } from '../constants'
import api from '../api'
import AuthService from '@core/services/auth'
import { HTTP_STATUS_FORBIDDEN } from '@core/constants/http'
/**
 * Type
 */
export const AUTHENTICATE = 'authenticate'
export const GET_USER = 'getUser'
export const VERIFY_EMAIL = 'verifyEmail'
export const RESEND_EMAIL = 'resendEmail'
export const CURRENT_USER = 'currentUser'
export const GET_INFO_INVITE = 'getInfoInvite'
export const FETCH_REF_INFO = 'fetchRefInfo'
/**
 * State
 */
export const state = {
  user: {},
}

/**
 * Actions
 */
export const actions = {
  /**
   * Init
   * @param commit
   */
  init({ commit }) {
    AuthService.init()

    if (AuthService.isAuthenticated()) {
      handleAuthenticated(commit, Object.assign({}, AuthService.user))
    }
  },

  /**
   * Sign in
   * @param commit
   * @param payload
   * @returns {Promise<{success: boolean}>}
   */
  async signIn({ commit }, payload) {
    let response

    response = await api.signIn(payload)
    if (response && response.access_token) {
      const data = Object.assign({}, response.user, {
        access_token: response.access_token,
      })
      handleAuthenticated(commit, transformerAuthenticate(data))

      return {
        success: true,
        permission: data.role === ROLE_CUSTOMER,
        user: data,
      }
    }

    if (
      response &&
      response.user &&
      response.statusCode == HTTP_STATUS_FORBIDDEN
    ) {
      commit(CURRENT_USER, response.user)
      return {
        success: false,
        message: response.errorMessage || '',
        userInActive: true,
      }
    }

    return {
      success: false,
      message: response.errorMessage || '',
      number_incorrect: response.number_incorrect_password || 0,
    }
  },

  /**
   * Sign up
   * @param commit
   * @param payload
   * @returns {Promise<{success: boolean}>}
   */
  // eslint-disable-next-line
  async signUp({ commit }, payload) {
    const response = await api.signUp(payload)

    if (response && response.user && response.user.id) {
      commit(CURRENT_USER, response.user)
      return { success: true }
    }

    return { ...response, success: false, message: response.errorMessage }
  },

  /**
   * Sign out
   * @param commit
   */
  signOut({ commit }) {
    AuthService.set({})
    commit(AUTHENTICATE, {})
    AuthService.clear()
  },

  // eslint-disable-next-line
  async forgotPassword({ commit }, payload) {
    const response = await api.forgot(payload)
    if (response.success) {
      return {
        success: true,
        message:
          'Instructions to reset your password have been sent to you. Please check your email.',
      }
    }

    return response
  },
  // eslint-disable-next-line
  async resetPassword({ commit }, payload) {
    const response = await api.resetPass(payload)
    if (response.success) {
      return {
        success: true,
      }
    }

    return response
  },

  async verifyEmail({ commit }, payload) {
    let response
    response = await api.verifyEmail(payload)
    if (response && response.user) {
      const data = Object.assign({}, response.user, {
        access_token: response.access_token,
      })

      if (response.user.status === UserStatusActive) {
        handleAuthenticated(commit, transformerAuthenticate(data))
      }

      return {
        success: true,
        permission: data.role === ROLE_CUSTOMER,
      }
    }
    return {
      success: false,
      message: response.errorMessage || '',
    }
  },
  // eslint-disable-next-line
  async resendEmail({ commit }, payload) {
    const response = await api.resendEmail(payload)

    if (response.success) {
      return { success: true }
    }

    return { success: false }
  },

  // eslint-disable-next-line
  async [GET_INFO_INVITE]({ commit }, code) {
    const res = await api.getInfoInvite(code)
    if (!res || res.error) {
      return { ...res, error: true, message: res.errorMessage }
    }

    return { error: false, ...res }
  },
  // eslint-disable-next-line
  async [FETCH_REF_INFO]({ commit }, code) {
    const res = await api.getRefInfo(code)
    if (!res || res.error) {
      return { ...res, error: true, message: res.errorMessage }
    }

    return { error: false, ...res }
  },
}

/**
 * Mutations
 */
export const mutations = {
  [AUTHENTICATE](state, payload) {
    state.user = payload
  },
  [VERIFY_EMAIL](state, payload) {
    state.user_signUp = payload
    state.token = payload
  },
  [CURRENT_USER](state, payload) {
    state.user = payload
  },
}

/**
 * Getters
 */
export const getters = {
  [GET_USER](state) {
    if (state.user && state.user.id) {
      return Object.assign({}, state.user)
    }

    return { id: 0 }
  },
  currentRole(state) {
    return state.user.role
  },
  isCutomer(state) {
    return state.user.role === ROLE_CUSTOMER
  },
}

/**
 * Handle after authenticated
 * @param commit
 * @param payload
 */
const handleAuthenticated = (commit, payload) => {
  if (payload.role !== ROLE_CUSTOMER) {
    return
  }

  AuthService.set(payload)
  commit(AUTHENTICATE, payload)
}

/**
 * transformer authenticate data to storage
 * @param response
 * @return {{name: *, id: *, avatar: *, accessToken: *, email: *}}
 */
const transformerAuthenticate = (response) => {
  return {
    id: response.id,
    accessToken: response.access_token,
    email: response.email,
    username: response.username,
    full_name: response.full_name,
    birthday: response.birthday,
    role: response.role,
  }
}
