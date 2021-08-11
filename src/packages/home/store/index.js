import api from '../api'
import AuthService from '@core/services/auth'
import { formatNumber } from '@core/utils/formatter'

export const FETCH_ANALYTICS = 'fetchAnalytics'

export const state = {
  analytics: [],
  messages: [],
}

export const getters = {
  messages(state) {
    return state.messages.map((item) => {
      let message = ''
      let name = AuthService.getId() == item.updated_user_id ? 'Bạn' : 'CSKH'
      let ordername = item.code || `#${item.package_id}`

      const fee = item.fee > 0 ? item.fee : -item.fee

      switch (item.type) {
        case 1:
          message = `<b>${ordername}</b>: ${name} đã thay đổi người nhận từ <b>${
            item.old_value
          }</b> sang <b>${item.value}</b>`
          break
        case 2:
          message = `<b>${ordername}</b>: ${name} đã thay đổi số điện thoại từ <b>${
            item.old_value
          }</b> sang <b>${item.value}</b>`
          break
        case 3:
          message = `<b>${ordername}</b>: ${name} đã thay đổi địa chỉ người nhận từ <b>${
            item.old_value
          }</b> sang <b>${item.value}</b>`
          break
        case 4:
          message = `<b>${ordername}</b>: ${name} đã thay đổi thành phố từ <b>${
            item.old_value
          }</b> sang <b>${item.value}</b>`
          break
        case 5:
          message = `<b>${ordername}</b>: ${name} đã thay đổi mã vùng từ <b>${
            item.old_value
          }</b> sang <b>${item.value}</b>`
          break
        case 6:
          message = `<b>${ordername}</b>: ${name} đã thay đổi mã bưu điện từ <b>${
            item.old_value
          }</b> sang <b>${item.value}</b>`
          break
        case 7:
          message = `<b>${ordername}</b>: ${name} đã thay đổi mã quốc gia từ <b>${
            item.old_value
          }</b> sang <b>${item.value}</b>`
          break
        case 8:
          message = `<b>${ordername}</b>: ${name} đã thay đổi trọng lượng từ <b>${formatNumber(
            +item.old_value
          )}</b> sang <b>${formatNumber(+item.value)}</b>`
          break
        case 9:
          message = `<b>${ordername}</b>: ${name} đã thay đổi kích thước (DxRxC) từ <b>${formatNumber(
            +item.old_value
          )}</b> sang <b>${formatNumber(+item.value)}</b>`
          break
        case 10:
          message = `<b>${ordername}</b>: ${name} đã thay đổi yêu cầu khi giao`
          break
        case 11:
          message = `<b>${ordername}</b>: ${name} đã thay đổi dịch vụ từ <b>${
            item.old_value
          }</b> sang <b>${item.value}</b>`
          break
        case 12:
          message = `<b>${ordername}</b>: ${name} đã thay đổi chi tiết hàng hóa từ <b>${
            item.old_value
          }</b> sang <b>${item.value}</b>`
          break
        case 13:
          message = `<b>${ordername}</b>: ${name} đã thay đổi địa chỉ phụ người nhận từ <b>${
            item.old_value
          }</b> sang <b>${item.value}</b>`
          break
        case 14:
          message = `<b>${ordername}</b> thêm phí covid <b>$${formatNumber(
            +item.fee
          )}</b>`
          break
        case 15:
          message = `<b>${ordername}</b> thêm phí quá cỡ <b>$${formatNumber(
            +item.fee
          )}</b>`
          break
        case 16:
          message = `<b>${ordername}</b> thêm phí sửa kích thước <b>$${formatNumber(
            +item.fee
          )}</b>`
          break
        case 17:
          message = `<b>${ordername}</b> thêm phí sửa trọng lượng <b>$${formatNumber(
            +item.fee
          )}</b>`
          break
        case 18:
          message = `<b>${ordername}</b> thêm phí thay đổi dịch vụ <b>$${formatNumber(
            +item.fee
          )}</b>`
          break
        case 19:
          message = `<b>${ordername}</b> thêm phí sửa đơn <b>$${formatNumber(
            +item.fee
          )}</b>`
          break
        case 20:
          message = `<b>${ordername}</b> đã hoàn tiền cho bạn <b>$${formatNumber(
            +fee
          )}</>`
          break
        case 21:
          message = `<b>${ordername}</b> thêm phí phát sinh khác <b>$${formatNumber(
            +item.fee
          )}</b>`
          break
      }

      return {
        package_id: item.package_id,
        message,
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
    return { error: false }
  },
}
