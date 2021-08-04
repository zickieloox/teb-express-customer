import api from '../api'
import AuthService from '@core/services/auth'

const CHANGE_PACKAGE_TYPE = [
  '',
  'thay đổi người nhận',
  'thay đổi số điện thoại',
  'thay đổi địa chỉ người nhận',
  'thay đổi thành phố',
  'thay đổi mã vùng',
  'thay đổi mã bưu điện',
  'thay đổi mã quốc gia',
  'thay đổi trọng lượng',
  'thay đổi kích thước (DxRxC)',
  'thay đổi yêu cầu khi giao',
  'thay đổi dịch vụ',
  'thay đổi chi tiết hàng hóa',
  'thay đổi địa chỉ phụ người nhận',
  'thêm phí covid',
  'thêm phí quá cỡ',
  'sửa kích thước',
  'sửa trọng lượng',
  'dịch vụ',
  'sửa đơn',
  'đã hoàn tiền cho bạn',
  'thêm phí phát sinh khác',
]

export const FETCH_ANALYTICS = 'fetchAnalytics'

export const state = {
  analytics: [],
  messages: [],
}

export const getters = {
  messages(state) {
    return state.messages.map((item) => {
      return {
        user_id: AuthService.getId(),
        package_id: item.package_id,
        message: `${item.updated_user_name} ${CHANGE_PACKAGE_TYPE[item.type]}`,
      }
    })
  },
}

export const mutations = {
  [FETCH_ANALYTICS]: (state, payload) => {
    state.messages = payload.logs || []
    state.analytics = payload.package_analytics || []
  },
}

export const actions = {
  async [FETCH_ANALYTICS]({ commit }, payload) {
    const res = await api.fetchAnalytics(payload)

    if (!res || res.error) {
      return { error: true, message: res.errorMessage }
    }

    commit(FETCH_ANALYTICS, res)
  },
}
