import Vue from 'vue'
import { domOn } from '../utils/dom'
import { capitalize } from '@core/utils/string'
import { MAP_STATUS_CLASS_NAME } from '../../packages/package/constants'

const nodeList = []
const ctx = '@@clickoutsideContext'

let startClick
let seed = 0

!Vue.prototype.$isServer &&
  domOn(document, 'mousedown', (e) => (startClick = e))

!Vue.prototype.$isServer &&
  domOn(document, 'mouseup', (e) => {
    nodeList.forEach((node) => node[ctx].documentHandler(e, startClick))
  })

function createDocumentHandler(el, binding, vnode) {
  return function(mouseup = {}, mousedown = {}) {
    if (
      !vnode ||
      !vnode.context ||
      !mouseup.target ||
      !mousedown.target ||
      el.contains(mouseup.target) ||
      el.contains(mousedown.target) ||
      el === mouseup.target ||
      (vnode.context.popperElm &&
        (vnode.context.popperElm.contains(mouseup.target) ||
          vnode.context.popperElm.contains(mousedown.target)))
    )
      return

    if (
      binding.expression &&
      el[ctx].methodName &&
      vnode.context[el[ctx].methodName]
    ) {
      vnode.context[el[ctx].methodName]()
    } else {
      el[ctx].bindingFn && el[ctx].bindingFn()
    }
  }
}

/**
 * v-clickoutside
 */
export const clickoutside = {
  bind(el, binding, vnode) {
    nodeList.push(el)
    const id = seed++
    el[ctx] = {
      id,
      documentHandler: createDocumentHandler(el, binding, vnode),
      methodName: binding.expression,
      bindingFn: binding.value,
    }
  },

  update(el, binding, vnode) {
    el[ctx].documentHandler = createDocumentHandler(el, binding, vnode)
    el[ctx].methodName = binding.expression
    el[ctx].bindingFn = binding.value
  },

  unbind(el) {
    let len = nodeList.length

    for (let i = 0; i < len; i++) {
      if (nodeList[i][ctx].id === el[ctx].id) {
        nodeList.splice(i, 1)
        break
      }
    }
    delete el[ctx]
  },
}

const getFormatStatus = (status) => {
  // cSpell:disable
  const defaultClassLists = {
    'tạo mới': 'default',
    'in-transit': 'default',
    'chờ lấy': 'await',
    pending: 'await',
    'đã lấy': 'primary',
    'đang giao': 'primary',
    processing: 'primary',
    'giao thành công': 'success',
    'thành công': 'success',
    delivered: 'success',
    'trả hàng': 'info',
    'hoàn trả': 'info',
    returned: 'info',
    'đã hủy': 'danger',
    'thất bại': 'danger',
    'từ chối': 'danger',
    canceled: 'danger',
    'không thành công': 'danger',
    'giao không thành công': 'danger',
    undelivered: 'danger',
    'đang xử lý': 'pending',
    'chờ xác nhận': 'pending',
    'pre-transit': 'pending',
    'đã xử lý': 'done',
    'thanh toán': 'done',
    'chưa thanh toán': 'unpaid',
    alert: 'alert',
    expired: 'expired',
  }
  // cSpell:enable

  const classLists = Object.assign(defaultClassLists, MAP_STATUS_CLASS_NAME)

  status = status.toLowerCase()
  const className = classLists[status] || 'unknown'

  return {
    text: capitalize(status),
    classList: `badge badge-round badge-${className}`,
  }
}

export const labelStatus = {
  update(el, binding) {
    const { text, classList } = getFormatStatus(binding.value)
    el.classList = classList
    el.innerText = text
  },
  inserted(el, binding) {
    const { text, classList } = getFormatStatus(binding.value)
    el.classList = classList
    el.innerText = text
  },
}

const initGlobalDirectives = () => {
  Vue.directive('status', labelStatus)
}

export default initGlobalDirectives
